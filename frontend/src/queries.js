export const GET_ITEM_DETAILS = `query getProductInfo($_id: ID) {
    getProductInfo(_id: $_id) {
        _id,
        productname,
        description,
        price,
        category,
        stock,
        image_URL,
        shopname,
        currency,
        salescount
    }
  }`;

export const FETCH_PRODUCTS = `query findProducts($keyword: String,$min_price:Int,$max_price:Int,$sortType:String,$outOfStock:Int){
    findProducts(keyword: $keyword,min_price:$min_price,max_price:$max_price,sortType:$sortType,outOfStock:$outOfStock) {
        _id,
    productname,
    description,
    price,
    category,
    stock,
    image_URL,
    shopname,
    currency,
    salescount,
  }
  }`;

export const GET_CART_INFO = `query getcartInfo($email: String){
    getcartInfo(email: $email) {
      email,
      quantity,
      shopname,
      price,
      productname,
      image_URL,
      giftoption,
      giftdescription,
      product
      {
      _id,
      stock,
        currency
    }
    }
}`;

export const GET_ORDER_INFO = `query getorderInfo($email:String,$resultsperpage:String,$currentPage:Int){
    getorderInfo(email: $email,resultsperpage:$resultsperpage,currentPage:$currentPage) {
    results{
      _id,
      email,
      orderdate,
      totalprice,
      orderdetails{
        product {
          _id
        },
        quantity,
          shopname,
          price,
          productname,
          image_URL,
          giftoption,
          giftdescription,
      }
      
    }
    ordersCount
  }
}`;

export const GET_SHOP_DETAILS = `query getshopdetails($shopname:String){
  getshopdetails(shopname: $shopname) {
    success
    shopdetails{
      _id,
      productname,
      description,
      price,
      category,
      stock,
      image_URL,
      shopname,
      currency,
      salescount,
    }
    results{
      _id,
      name,
      email,
      password,
      dateofbirth,
      picture,
      mobile,
      city,
      country,
      address,
      shopname,
      shopimage
    }
    totalsalesrevenue
    
  }
}`;

export const SHOP_UNIQUE_CHECK = `query shopuniquecheck($shopname:String){
    shopuniquecheck(shopname: $shopname) {
    success
  }
}`;

export const USER_LOGIN_DETAILS = `query userLogin($email: String,$password:String) {
    userLogin(email: $email,password:$password) {
        token,
        message,
        user{
            _id,
            name,
            email,
            password,
            dateofbirth,
            picture,
            mobile,
            city,
            country,
            address,
            shopname,
            shopimage,
        }
    }
  }`;
