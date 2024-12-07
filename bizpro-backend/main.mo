import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Cycles "mo:base/ExperimentalCycles";
import Types "types";
import Array "mo:base/Array";
import Blob "mo:base/Blob";

actor class () {

  stable var suppliers : [Types.Supplier] = [];

  private stable var business_entries : [(Principal, Types.Business)] = [];
  private var businesses = HashMap.HashMap<Principal, Types.Business>(
    10,
    Principal.equal,
    Principal.hash,
  );

  private stable var product_entries : [(Text, Types.Product)] = [];
  private var products = HashMap.HashMap<Text, Types.Product>(10, Text.equal, Text.hash);

  private stable var sales_entries : [(Text, Types.Sale)] = [];
  private var sales = HashMap.HashMap<Text, Types.Sale>(10, Text.equal, Text.hash);

  //adding or updating a business
  public shared (msg) func addorUpdateBusiness(business : Types.Business) : async Text {
    let caller = msg.caller;
    businesses.put(caller, business);

    "Business successfully registered";
  };

  //retrieving the details of a given business
  public query func getBusiness(id : Principal) : async ?Types.Business {
    businesses.get(id);
  };

  public shared (msg) func addOrUpdateProduct(product : Types.Product) : async Text {

    products.put(product.id, product);

    "Product registered to inventory successfully.";
  };

  public query func getProductById(id : Text) : async ?Types.Product {
    products.get(id);
  };

  public query func getBusinessProducts(businessId : Principal) : async [Types.Product] {
    Iter.toArray(Iter.filter(products.vals(), func(p : Types.Product) : Bool { p.businessId == businessId }));
  };

  public shared (msg) func addOrUpdateSale(sale : Types.Sale) : async Text {

    sales.put(sale.id, sale);

    "Sale has been registered successfully!.";
  };

  public func getSaleById(saleId : Text) : async ?Types.Sale {
    // Check if the product ID is valid
    if (Text.size(saleId) < 0) {
      return null;
    };

    sales.get(saleId);

  };

  public query func getSalesByBusiness(businessId : Principal) : async [Types.Sale] {
    Iter.toArray(Iter.filter(sales.vals(), func(s : Types.Sale) : Bool { s.businessId == businessId }));
  };

  public shared (msg) func addSupplier(supplier : Types.Supplier) : async Text {
    let callerPrincipal = msg.caller;

    // Validate and add supplier data to storage
    let newSupplier : Types.Supplier = {
      id = supplier.id;
      name = supplier.name;
      location = supplier.location;
      products = supplier.products;
      email = supplier.email;
      phone = supplier.phone;
      merchants = supplier.merchants;
    };

    //find the sale using the sale id
    let matchedSupplier = Array.find<Types.Supplier>(suppliers, func(item : Types.Supplier) { item.phone == newSupplier.phone });

    switch (matchedSupplier) {
      case (?matchedSupplier) {

        //since the supplier the user is trying to add is already in the database, we just need to add the principal of the caller to the list of the merchant that given supplier is serving
        let updatedSuppliers = Array.map<Types.Supplier, Types.Supplier>(
          suppliers,
          func(supplier) {
            if (supplier.id == newSupplier.id) {
              let merchantExists = Array.find<Principal>(supplier.merchants, func(p) { p == callerPrincipal }) != null;
              if (merchantExists) {
                return supplier; // Merchant already exists, no change
              };
              {
                supplier with
                merchants = Array.append<Principal>(supplier.merchants, [callerPrincipal])
              };
            } else {
              supplier;
            };
          },
        );

        suppliers := updatedSuppliers;

        "Supplier added successfully";
      };
      case null {

        //add the supplier afresh
        suppliers := Array.append(suppliers, [newSupplier]);

        return "Supplier information saved successfully!";
      };
    };

  };

  public query func getSuppliersByMerchant(merchant : Principal) : async [Types.Supplier] {
    // Return the list of suppliers

    let matchingSuppliers = Array.filter<Types.Supplier>(
      suppliers,
      func(supplier) {
        Array.find<Principal>(
          supplier.merchants,
          func(item) {
            item == merchant;
          },
        ) != null;
      },
    );

    if (Array.size(matchingSuppliers) > 0) {
      return [];
    } else {
      return suppliers;
    }

  };

  public query func transform(raw : Types.TransformArgs) : async Types.CanisterHttpResponsePayload {
    let transformed : Types.CanisterHttpResponsePayload = {
      status = raw.response.status;
      body = raw.response.body;
      headers = [
        {
          name = "Content-Security-Policy";
          value = "default-src 'self'";
        },
        { name = "Referrer-Policy"; value = "strict-origin" },
        { name = "Permissions-Policy"; value = "geolocation=(self)" },
        {
          name = "Strict-Transport-Security";
          value = "max-age=63072000";
        },
        { name = "X-Frame-Options"; value = "DENY" },
        { name = "X-Content-Type-Options"; value = "nosniff" },
      ];
    };
    transformed;
  };

  public func getAiResponse(prompt : Text) : async Text {

    let ic : Types.IC = actor ("aaaaa-aa");

    let host : Text = "asceflow-worker.securemart.workers.dev";
    let url = "https://" # host # "/api/generateResponse";

    let request_headers = [
      { name = "Host"; value = host # ":443" },
      { name = "User-Agent"; value = "google_gemini_api_canister" },
      { name = "Content-Type"; value = "application/json" },
    ];

    // Create JSON payload
    let request_body_json : Text = "{\"prompt\": \"" # prompt # "\"}";
    let request_body_as_Blob : Blob = Text.encodeUtf8(request_body_json);
    let request_body_as_nat8 : [Nat8] = Blob.toArray(request_body_as_Blob);

    let transform_context : Types.TransformContext = {
      function = transform;
      context = Blob.fromArray([]);
    };

    let http_request : Types.HttpRequestArgs = {
      url = url;
      max_response_bytes = null; //optional for request
      headers = request_headers;
      body = ?request_body_as_nat8;
      method = #post;
      transform = ?transform_context;
    };

    Cycles.add<system>(20_949_972_000);

    let http_response : Types.HttpResponsePayload = await ic.http_request(http_request);

    // Directly convert the response body to Text
    let decoded_text : Text = switch (Text.decodeUtf8(Blob.fromArray(http_response.body))) {
      case (null) { "Error: Unable to decode response" };
      case (?text) { text };
    };

    decoded_text;
  };

  public func sendMailNotification(
    recipient_name : Text,
    recipient_email : Text,
    recipient_principal : Text,
    token_amount : Nat,
    sender_principal : Text,
    sender_name : Text,
    date_of_transaction : Text,
  ) : async Text {

    let ic : Types.IC = actor ("aaaaa-aa");

    let host : Text = "asceflow-worker.securemart.workers.dev";
    let url = "https://" # host # "/api/sendMail";

    let request_headers = [
      { name = "Host"; value = host # ":443" },
      { name = "User-Agent"; value = "send_mail_notification_canister" },
      { name = "Content-Type"; value = "application/json" },
    ];

    // Create JSON payload
    let request_body_json : Text = "{\n" #
    "  \"recipient_name\": \"" # recipient_name # "\",\n" #
    "  \"recipient_email\": \"" # recipient_email # "\",\n" #
    "  \"recipient_principal\": \"" # recipient_principal # "\",\n" #
    "  \"token_amount\": " # Nat.toText(token_amount) # ",\n" #
    "  \"sender_principal\": \"" # sender_principal # "\",\n" #
    "  \"sender_name\": \"" # sender_name # "\",\n" #
    "  \"date_of_transaction\": \"" # date_of_transaction # "\"\n" #
    "}";
    let request_body_as_Blob : Blob = Text.encodeUtf8(request_body_json);
    let request_body_as_nat8 : [Nat8] = Blob.toArray(request_body_as_Blob);

    let transform_context : Types.TransformContext = {
      function = transform;
      context = Blob.fromArray([]);
    };

    let http_request : Types.HttpRequestArgs = {
      url = url;
      max_response_bytes = null; //optional for request
      headers = request_headers;
      body = ?request_body_as_nat8;
      method = #post;
      transform = ?transform_context;
    };

    Cycles.add<system>(20_949_972_000);

    let http_response : Types.HttpResponsePayload = await ic.http_request(http_request);

    // Directly convert the response body to Text
    let decoded_text : Text = switch (Text.decodeUtf8(Blob.fromArray(http_response.body))) {
      case (null) { "Error: Unable to decode response" };
      case (?text) { text };
    };

    decoded_text;
  };

  public query func remaining_cycles() : async Nat {
    return Cycles.balance();
  };

  public shared query ({ caller = id }) func isAnonymous() : async Bool {
    let anon = Principal.fromText("2vxsx-fae");

    if (id == anon) true else false;
  };

  public query (msg) func whoami() : async Text {
    Principal.toText(msg.caller);
  };

  system func preupgrade() {
    business_entries := Iter.toArray(businesses.entries());

    product_entries := Iter.toArray(products.entries());

    sales_entries := Iter.toArray(sales.entries());
  };

  system func postupgrade() {
    businesses := HashMap.fromIter<Principal, Types.Business>(
      business_entries.vals(),
      10,
      Principal.equal,
      Principal.hash,
    );
    business_entries := [];

    products := HashMap.fromIter<Text, Types.Product>(
      product_entries.vals(),
      10,
      Text.equal,
      Text.hash,
    );
    product_entries := [];

    sales := HashMap.fromIter<Text, Types.Sale>(
      sales_entries.vals(),
      10,
      Text.equal,
      Text.hash,
    );
    sales_entries := [];
  };

};
