const Cart = require("../../models/Cart");
const config = require("config");
const connectDB = require("../../config/db");
const Order = require("../../models/Order");
const product = require("../../models/productModel");

const PurchasesResolver = {
  Query: {
    async getorderInfo({ email, resultsperpage, currentPage }) {
      try {
        const ordersCount = await Order.countDocuments();
        let results = await Order.find({ email: email })
          .limit(parseInt(resultsperpage) * 1)
          .skip(parseInt(resultsperpage) * (currentPage - 1));
        return { results, ordersCount };
      } catch (err) {
        return err;
      }
    },
  },
  Mutation: {
    async createorder({ email, totalprice }) {
      const orderdate1 = { orderdate: new Date().toISOString().slice(0, 10) };
      const { orderdate } = orderdate1;
      try {
        let order = [];

        let orderdetails = await Cart.find({ email: email });
        order = new Order({
          email,
          orderdate,
          orderdetails,
          totalprice,
        });
        await order.save();
        await orderdetails.forEach(async (order) => {
          try {
            let stock = 0;
            let salescount = 0;
            let products = await product.find({ _id: order.product });

            stock = products[0].stock - order.quantity;
            if (products[0].salescount) {
              salescount = products[0].salescount + order.quantity;
            } else {
              salescount = order.quantity;
            }
            let result = await product.findOneAndUpdate(
              { _id: order.product },
              { stock: stock, salescount: salescount },
              { upsert: true, new: true }
            );
          } catch (err) {
            return err;
          }
        });
        let results = await Cart.deleteMany({ email: email });
        if (results.deletedCount === 1) {
          return {
            success: false,
          };
        } else {
          return {
            success: true,
          };
        }
      } catch (err) {
        return err;
      }
    },
  },
};

module.exports = PurchasesResolver;
