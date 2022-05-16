const User = require("../../models/User");
const config = require("config");
const connectDB = require("../../config/db");
const Product = require("../../models/productModel");
const Favourite = require("../../models/Favourite");
const Cart = require("../../models/Cart");
const Order = require("../../models/Order");

const ProductResolver = {
  Query: {
    async searchProducts({
      keyword,
      min_price,
      max_price,
      sortType,
      outOfStock,
    }) {
      try {
        if (sortType) {
          var sort = {};

          sort[sortType] = 1;
        }

        let products = await Product.find({
          productname: new RegExp(keyword, "i"),
          price: { $gte: min_price, $lte: max_price },
          stock: { $gte: outOfStock },
        }).sort(sort);
        return products;
      } catch (err) {
        return err;
      }
    },

    async getProductDetails({ _id }) {
      try {
        let productdetail = await Product.findOne({ _id: _id });
        console.log(productdetail);
        return productdetail;
      } catch (err) {
        return err;
      }
    },
    async getshopdetails({ shopname }) {
      try {
        let shopname1 = await Product.find({ shopname });
        if (shopname1.length === 0) {
          let results = await User.find({ shopname });
          if (results.length !== 0) {
            return { success: true, results };
          } else {
            return { success: false };
          }
        } else {
          let shopdetails = await Product.find({ shopname });
          let results = await User.find({ shopname });
          let results1 = await Order.aggregate([
            {
              $match: { "orderdetails.shopname": shopname },
            },
            {
              $project: {
                orderdetails: {
                  $filter: {
                    input: "$orderdetails",
                    as: "orderdetail",
                    cond: { $eq: ["$$orderdetail.shopname", shopname] },
                  },
                },
              },
            },
          ]);
          let totalsalesrevenue = 0;
          await results1.forEach((order) => {
            order.orderdetails.forEach((orderdetail) => {
              totalsalesrevenue =
                totalsalesrevenue + orderdetail.price * orderdetail.quantity;
            });
          });
          if (results.length !== 0) {
            return { success: true, shopdetails, results, totalsalesrevenue };
          } else {
            return { success: false };
          }
        }
      } catch (err) {
        return err;
      }
    },
    async shopavailability({ shopname }) {
      try {
        let shopunique = await User.find({ shopname });
        if (shopunique.length !== 0) {
          return { success: false };
        } else {
          return {
            success: true,
          };
          //console.log("Restaurant already existed!");
        }
      } catch (err) {
        return err;
      }
    },
  },
  Mutation: {
    async createproduct({
      productname,
      description,
      price,
      category,
      stock,
      image_URL,
      shopname,
      currency,
    }) {
      try {
        let products = [];
        products = new Product({
          productname,
          description,
          price: parseFloat(price),
          category,
          stock: parseInt(stock),
          image_URL,
          shopname,
          currency,
        });
        await products.save();
        return { success: true };
      } catch (err) {
        return err;
      }
    },
    async updateproduct({
      _id,
      productname,
      description,
      price,
      category,
      stock,
      image_URL,
      shopname,
      currency,
    }) {
      try {
        let results = await Product.findByIdAndUpdate(
          _id,
          {
            productname,
            description,
            price: parseFloat(price),
            category,
            stock: parseInt(stock),
            image_URL,
            shopname,
            currency,
          },
          { new: true }
        );
        if (!results) {
          return { success: false };
        } else {
          //res.end(JSON.stringify(results));
          return { success: true };
        }
      } catch (err) {
        return err;
      }
    },

    async deleteproduct({ _id, product }) {
      try {
        await Product.deleteOne({ _id: _id });
        await Favourite.deleteOne({ product: product });
        await Cart.deleteOne({ product: product });
        return { success: true };
      } catch (err) {
        return err;
      }
    },

    async saveshopimage({ shopimage, email }) {
      try {
        let result = await User.findOneAndUpdate(
          { email: email },
          { shopimage, email },
          { upsert: true, new: true }
        );
        if (!result) {
          return { success: false };
        } else {
          return { success: true };
        }
      } catch (err) {
        return err;
      }
    },
    async createshop({ shopname, email }) {
      try {
        let result = await User.findOneAndUpdate(
          { email: email },
          { shopname, email },
          { upsert: true, new: true }
        );
        if (result) {
          return { success: true };
        } else {
          return { success: false };
        }
      } catch (err) {
        return err;
      }
    },
  },
};
module.exports = ProductResolver;
