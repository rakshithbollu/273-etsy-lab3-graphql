export const REGISTER_USER = `mutation registerUser($name: String,$email:String,$password:String) {
    registerUser(name: $name,email:$email,password:$password)
  }`;

export const EDIT_USER = `mutation editUser($name:String,$email:String,$city:String,$dateofbirth:String,$mobile:String,$address:String,$country:String,$picture:String) {
    editUser(name:$name,email:$email,city:$city,dateofbirth:$dateofbirth,mobile:$mobile,address:$address,country:$country,picture:$picture)
    {
      success
    }
  }`;

export const ADD_PRODUCTS_CART = `mutation addproductstocart($email:String,$product:ID,$quantity:Int,$price:Float,$shopname:String,$productname:String,$image_URL:String) {
    addproductstocart(email:$email,product:$product,quantity:$quantity,price:$price,shopname:$shopname,productname:$productname,image_URL:$image_URL)
  }`;

export const DELETE_CART_ITEMS = `mutation deletecartitems($email:String,$product:ID) {
    deletecartitems(email:$email,product:$product)
  }`;

export const ADD_GIFT = `mutation addgift($email:String,$product:ID,$giftoption:Boolean) {
    addgift(email:$email,product:$product,giftoption:$giftoption)
    {
      success
    }
  }`;

export const ADD_GIFT_DESC = `mutation addgiftdesc($email:String,$product:ID,$giftdescription:String) {
    addgiftdesc(email:$email,product:$product,giftdescription:$giftdescription)
    {
      success
    }
  }`;

export const CREATE_ORDER = `mutation createorder($email:String,$totalprice:Float) {
    createorder(email:$email,totalprice:$totalprice)
    {
      success
    }
  }`;

export const ADD_PRODUCT = `mutation addproduct($productname:String,$description:String,$price:String,$category:String,$stock:String,$image_URL:String,$shopname:String,$currency:String) {
    addproduct(productname:$productname,description:$description,price:$price,category:$category,stock:$stock,image_URL:$image_URL,shopname:$shopname,currency:$currency)
    {
      success
    }
  }`;

export const EDIT_PRODUCT = `mutation editproduct($_id:ID,$productname:String,$description:String,$price:String,$category:String,$stock:String,$image_URL:String,$shopname:String,$currency:String) {
    editproduct(_id:$_id,productname:$productname,description:$description,price:$price,category:$category,stock:$stock,image_URL:$image_URL,shopname:$shopname,currency:$currency)
    {
      success
    }
  }`;

export const DELETE_SHOP_PRODUCT = `mutation deleteproduct($_id:ID,$product:ID) {
    deleteproduct(_id:$_id,product:$product)
    {
      success
    }
  }`;

export const UPLOAD_SHOP_IMAGE = `mutation uploadshopimage($email:String,$shopimage:String) {
    uploadshopimage(email:$email,shopimage:$shopimage)
    {
      success
    }
  }`;

export const CREATE_SHOP = `mutation createshop($email:String,$shopname:String) {
    createshop(email:$email,shopname:$shopname)
    {
      success
    }
  }`;
