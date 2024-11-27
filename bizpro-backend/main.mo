import CertifiedData "mo:base/CertifiedData";
import Char "mo:base/Char";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Trie "mo:base/Trie";
import Text "mo:base/Text";
import Option "mo:base/Option";
import Prim "mo:prim";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Cycles "mo:base/ExperimentalCycles";
import Types "types";
import HM "mo:base/HashMap";
import Array "mo:base/Array";

actor class () {

  stable var products : [Types.Product] = [];
  stable var sales : [Types.Sale] = [];
  stable var suppliers : [Types.Supplier] = [];

  // private stable var merchantStore : Trie.Trie<Text, Types.Merchant> = Trie.empty();

  //  public query (context) func getMerchant() : async Types.Response<Types.Merchant> {
  //     let caller : Principal = context.caller;

  //     switch (Trie.get(merchantStore, merchantKey(Principal.toText(caller)), Text.equal)) {
  //       case (?merchant) {
  //         {
  //           status = 200;
  //           status_text = "OK";
  //           data = ?merchant;
  //           error_text = null;
  //         };
  //       };
  //       case null {
  //         {
  //           status = 404;
  //           status_text = "Not Found";
  //           data = null;
  //           error_text = ?("Merchant with principal ID: " # Principal.toText(caller) # " not found.");
  //         };
  //       };
  //     };
  //   };

  public func addProduct(id : Text, name : Text, description : Text, price : Nat, quantity : Nat, category : Text, seller : Principal, image : Text) : async Text {
    let product : Types.Product = {
      id = id;
      name = name;
      description = description;
      price = price;
      quantity = quantity;
      category = category;
      image = image;
      seller = seller;
    };

    products := Array.append(products, [product]);

    "Product registered to inventory successfully.";
  };

  public func getProductById(productId : Text) : async Types.GetProductByIdResult {
    // Check if the product ID is valid
    if (Text.size(productId) < 0) {
      return #err("Invalid product ID.");
    };

    //find the product using the product id
    let product = Array.find<Types.Product>(products, func(item : Types.Product) { item.id == productId });

    switch (product) {
      case (?product) {
        return #ok(product);
      };
      case null {
        return #err("No matching product found.");
      };
    };

  };

  public query func getProductsBySeller(seller : Principal) : async [Types.Product] {
    let sellerProducts = Array.filter<Types.Product>(
      products,
      func(product) {
        product.seller == seller;
      },
    );
    sellerProducts;
  };

  public func addSale(id : Text, merchant : Principal, customer : Text, products : [Text], totalAmount : Nat, paymentMethod : Text, timestamp : Text) : async Text {
    let sale : Types.Sale = {
      id = id;
      merchant = merchant;
      customer = customer;
      products = products;
      totalAmount = totalAmount;
      paymentMethod = paymentMethod;
      timestamp = timestamp;
    };

    sales := Array.append(sales, [sale]);

    "Sale order registered successfully.";
  };

  public func getSaleById(saleId : Text) : async Types.GetSaleByIdResult {
    // Check if the product ID is valid
    if (Text.size(saleId) < 0) {
      return #err("Invalid saleId ID.");
    };

    //find the sale using the sale id
    let sale = Array.find<Types.Sale>(sales, func(item : Types.Sale) { item.id == saleId });

    switch (sale) {
      case (?sale) {
        return #ok(sale);
      };
      case null {
        return #err("No matching product found.");
      };
    };

  };

  public query func getSalesByMerchant(merchant : Principal) : async [Types.Sale] {
    let merchantSales = Array.filter<Types.Sale>(
      sales,
      func(sale) {
        sale.merchant == merchant;
      },
    );
    merchantSales;
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

  // Read profile
  // public shared query (msg) func readBusinessProfile() : async Result.Result<Types.Profile, Types.Error> {
  //   // Get caller principal
  //   let callerId = msg.caller;

  //   // Reject AnonymousIdentity
  //   if (Principal.toText(callerId) == "2vxsx-fae") {
  //     return #err(#NotAuthorized);
  //   };

  //   let result = Trie.find(
  //     profiles, //Target Trie
  //     key(callerId), // Key
  //     Principal.equal // Equality Checker
  //   );
  //   return Result.fromOption(result, #NotFound);
  // };

  // public shared (msg) func createBusinessProfile(profile : Types.ProfileUpdate) : async Result.Result<(), Types.Error> {
  //   // Get caller principal
  //   let callerId = msg.caller;

  //   // Reject AnonymousIdentity
  //   if (Principal.toText(callerId) == "2vxsx-fae") {
  //     return #err(#NotAuthorized);
  //   };

  //   // Associate user profile with their principal
  //   let userProfile : Types.Profile = {
  //     bio = profile.bio;
  //     image = profile.image;
  //     id = callerId;
  //   };

  //   let (newProfiles, existing) = Trie.put(
  //     profiles, // Target trie
  //     key(callerId), // Key
  //     Principal.equal, // Equality checker
  //     userProfile,
  //   );

  //   switch (profile.image) {
  //     case null {};
  //     case (?v) {
  //       var fileName = "/images/";
  //       fileName := Text.concat(fileName, Principal.toText(callerId));
  //       fileName := Text.concat(fileName, "/");
  //       fileName := Text.concat(fileName, v.fileName);
  //       let sha256 : ?Blob = null;

  //       // let storeResult = await AssetCanister.store({
  //       //     key = fileName;
  //       //     content_type = v.filetype;
  //       //     content_encoding = "identity";
  //       //     content = v.data;
  //       //     sha256 = sha256;
  //       // });
  //     };
  //   };

  //   // If there is an original value, do not update
  //   switch (existing) {
  //     // If there are no matches, update profiles
  //     case null {
  //       profiles := newProfiles;
  //       #ok(());
  //     };
  //     // Matches pattern of type - opt Profile
  //     case (?v) {
  //       #err(#AlreadyExists);
  //     };
  //   };
  // };

  private func key(x : Principal) : Trie.Key<Principal> {
    return { key = x; hash = Principal.hash(x) };
  };

  /**
    * Generate a Trie key based on a merchant's principal ID
    */
  private func merchantKey(x : Text) : Trie.Key<Text> {
    return { hash = Text.hash(x); key = x };
  };

  private func keyText(x : Text) : Trie.Key<Text> {
    return { key = x; hash = Text.hash(x) };
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

};
