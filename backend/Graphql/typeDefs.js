var { buildSchema } = require('graphql');
const typeDefs= buildSchema(`
type user{
    _id: ID
    uname:String
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
type product{
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
type cart{
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
type order{
    _id: ID,
    email:String,
    orderdate:String,
    orderdetails:[cart],
    totalprice:Float
}
type getorder{
    results:[order]
    ordersCount: Int
}
type UserLogins{
    message:String
    token:String
    user : [user]
}
type success{
    success:Boolean
}
type shopdetails{
    success: Boolean,
    shopdetails:[product],
    results :[user],
    totalsalesrevenue:Float
}

type Query{
    userLogin(email:String,password:String):UserLogins
    searchProducts(keyword:String,min_price:Int,max_price:Int,sortType:String,outOfStock:Int):[product]
    getProductDetails(_id:ID):product
    getcartdetails(email:String):[cart]
    getorderdetails(email:String,resultsperpage:String,currentPage:Int):getorder
    getshopdetails(shopname:String):shopdetails
    shopavailability(shopname:String):success
}

type Mutation{
    saveUser(uname:String,email:String, password:String):String
    updateUser(uname:String,email:String,city:String,dateofbirth:String,mobile:String,address:String,country:String,picture:String):success
    additemstocart(email:String,product:ID,quantity:Int,price:Float,shopname:String,productname:String,image_URL:String):String
    removecartitems(email:String,product:ID):String
    addgiftoption(email:String,product:ID,giftoption:Boolean):success
    addgiftdescription(email:String,product:ID,giftdescription:String):success
    addorder(email:String,totalprice:Float):success
    createproduct(productname:String,description:String,price:String,category:String,stock:String,image_URL:String,shopname:String,currency:String):success
    updateproduct(_id:ID,productname:String,description:String,price:String,category:String,stock:String,image_URL:String,shopname:String,currency:String):success
    deleteproduct(_id:ID,product:ID):success
    saveshopimage(email:String,shopimage:String):success
    createshop(shopname:String,email:String):success
},
`)

module.exports = typeDefs