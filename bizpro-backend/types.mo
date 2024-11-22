module Types {

    public type Product = {
        id : Nat;
        title : Text;
        description : Text;
        category : Text;
        price : Float;
        discountPercentage : Float;
        rating : Float;
        stock : Nat;
        tags : [Text];
        sku : Text;
        weight : Float;
        dimensions : Dimensions;
        warrantyInformation : Text;
        shippingInformation : Text;
        availabilityStatus : Text;
        reviews : [Review];
        returnPolicy : Text;
        minimumOrderQuantity : Nat;
        meta : Meta;
        images : [Text];
        thumbnail : Text;
    };

    type Dimensions = {
        width : Float;
        height : Float;
        depth : Float;
    };

    type Review = {
        rating : Float;
        comment : Text;
        date : Text;
        reviewerName : Text;
        reviewerEmail : Text;
    };

    type Meta = {
        createdAt : Text;
        updatedAt : Text;
        barcode : Text;
        qrCode : Text;
    };

    public type CartItem = {
        id : Nat;
        title : Text;
        price : Float;
        quantity : Nat;
        imageUrl : Text;
    };

    public type Cart = [CartItem];

    public type UserCart = {
        identity : Text;
        cart : Cart;
    };

    public type Order = {
        id : Text;
        items : [CartItem];
        totalAmount : Float;
        orderDate : Text;
        orderedBy : Text;
        paymentStatus : Text;
        monthlyInstallments : Nat;
        monthlyInstallmentPayment : Float;
        modeOfPayment : Text;
        remainingMonthlyInstallments : Nat;
    };

    public type GetProductByIdResult = {
        #ok : Product;
        #err : Text;
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