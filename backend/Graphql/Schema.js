var { buildSchema } = require("graphql");
const Schema = buildSchema(`

type productdetails{
    _id :ID,
    productname : String,
    description :String,
    price : Float,
    category :String,
    stock :Int,
    image_URL:String,
    shopname :String,
    currency : String,
    salescount :Int,
}
type userdetails{
    _id: ID
    name:String
    email:String
    password:String
    dateofbirth:String
    picture:String
    mobile:String
    city:String
    country:String
    address:String
    shopname:String
    shopimage:String
}

type cartdetails{
    _id: ID
    email : String,
    product: product,
    quantity: Int,
    shopname :String,
    price :Float,
    productname: String,
    image_URL:String,
    giftoption:Boolean,
    giftdescription:String
}
type orderinfo{
    _id: ID,
    email:String,
    orderdate:String,
    orderdetails:[cartdetails],
    totalprice:Float
}
type getorderdetails{
    results:[orderinfo]
    ordersCount: Int
}
type Userlogin{
    message:String
    token:String
    user : [userdetails]
}
type shopdetails{
    success: Boolean,
    shopdetails:[productdetails],
    results :[userdetails],
    totalsalesrevenue:Float
}
type flag{
    success:Boolean
}


type Query{
    findProducts(keyword:String,min_price:Int,max_price:Int,sortType:String,outOfStock:Int):[productdetails]
    userLogin(email:String,password:String):Userlogin
    getProductInfo(_id:ID):productdetails
    shopuniquecheck(shopname:String):flag
    getshopdetails(shopname:String):shopdetails
    getcartInfo(email:String):[cartdetails]
    getorderInfo(email:String,resultsperpage:String,currentPage:Int):getorderdetails
}

type Mutation{
    registerUser(name:String,email:String, password:String):String
    editUser(name:String,email:String,city:String,dateofbirth:String,mobile:String,address:String,country:String,picture:String):flag
    createshop(shopname:String,email:String):flag
    uploadshopimage(email:String,shopimage:String):flag
    addproduct(productname:String,description:String,price:String,category:String,stock:String,image_URL:String,shopname:String,currency:String):flag
    editproduct(_id:ID,productname:String,description:String,price:String,category:String,stock:String,image_URL:String,shopname:String,currency:String):flag
    deleteproduct(_id:ID,product:ID):flag  
    addproductstocart(email:String,product:ID,quantity:Int,price:Float,shopname:String,productname:String,image_URL:String):String
    addgift(email:String,product:ID,giftoption:Boolean):flag
    addgiftdesc(email:String,product:ID,giftdescription:String):flag
    deletecartitems(email:String,product:ID):String
    createorder(email:String,totalprice:Float):flag
},
`);

module.exports = Schema;
