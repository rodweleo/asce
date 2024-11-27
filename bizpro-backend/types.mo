import List "mo:base/List";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Nat64 "mo:base/Nat64";
import Bool "mo:base/Bool";
import Blob "mo:base/Blob";

module Types {

    public type Key = Text;

    public type Product = {
        id : Text;
        name : Text;
        description : Text;
        price : Nat;
        quantity : Nat;
        category : Text;
        image : Text;
        seller : Principal;
    };

    public type GetProductByIdResult = {
        #ok : Product;
        #err : Text;
    };

    type Bio = {
        name : ?Text;
        displayName : ?Text;
        location : ?Text;
        about : ?Text;
    };

    public type Profile = {
        bio : Bio;
        id : Principal;
        image : ?Image;
    };

    public type ProfileUpdate = {
        bio : Bio;
        image : ?Image;
    };

    type Image = {
        fileName : Text;
        data : Blob;
        filetype : Text;
    };

    public type Error = {
        #NotFound;
        #AlreadyExists;
        #NotAuthorized;
    };

    public type DeleteAssetArguments = {
        key : Text;
    };

    public type User = {
        id : Text;
        name : Text;
        email : Text;
        password : Text;
    };

    public type Supplier = {
        id : Text;
        name : Text;
        location : Text;
        products : [Text];
        email : Text;
        phone : Text;
        merchants : [Principal];
    };

    public type Merchant = {
        id: Principal;
        name : Text;
        businessName: Text;
        email_notifications : Bool;
        email_address : Text;
        phone_notifications : Bool;
        phone_number : Text;
    };

    public type Business = {
        id : Text;
        ownerId : Text;
        name : Text;
        logo : Text;
        contact : Text;
        location : Text;
        socialLinks : [Text];
    };

    public type Payment = {
        orderId : Text;
        paymentType : Text;
        dateOfPayment : Text;
        amount : Float;
        paidBy : Text;
        monthInstallment : Nat;
    };

    public type Timestamp = Nat64;

    public type Sale = {
        id : Text;
        merchant : Principal;
        customer : Text;
        products : [Text];
        totalAmount : Nat;
        paymentMethod : Text;
        timestamp : Text;
    };

    public type GetSaleByIdResult = {
        #ok : Sale;
        #err : Text;
    };

    // First, define the Type that describes the Request arguments for an HTTPS outcall.

    public type HttpRequestArgs = {
        url : Text;
        max_response_bytes : ?Nat64;
        headers : [HttpHeader];
        body : ?[Nat8];
        method : HttpMethod;
        transform : ?TransformRawResponseFunction;
    };

    public type HttpHeader = {
        name : Text;
        value : Text;
    };

    public type HttpMethod = {
        #get;
        #post;
        #head;
    };

    public type HttpResponsePayload = {
        status : Nat;
        headers : [HttpHeader];
        body : [Nat8];
    };

    // HTTPS outcalls have an optional "transform" key. These two types help describe it.
    // The transform function can transform the body in any way, add or remove headers, or modify headers.
    // This Type defines a function called 'TransformRawResponse', which is used above.

    public type TransformRawResponseFunction = {
        function : shared query TransformArgs -> async HttpResponsePayload;
        context : Blob;
    };

    // This Type defines the arguments the transform function needs.
    public type TransformArgs = {
        response : HttpResponsePayload;
        context : Blob;
    };

    public type CanisterHttpResponsePayload = {
        status : Nat;
        headers : [HttpHeader];
        body : [Nat8];
    };

    public type TransformContext = {
        function : shared query TransformArgs -> async HttpResponsePayload;
        context : Blob;
    };

    // Lastly, declare the management canister which you use to make the HTTPS outcall.
    public type IC = actor {
        http_request : HttpRequestArgs -> async HttpResponsePayload;
    };

};
