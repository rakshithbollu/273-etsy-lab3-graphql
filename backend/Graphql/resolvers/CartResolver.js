const Cart = require("../../models/Cart");
const config = require("config");
const connectDB = require("../../config/db");

const CartResolver = {
  Query: {
    async getcartInfo({ email }) {
      try {
        let results = await Cart.find({ email: email }).populate(
          "product",
          "stock currency"
        );
        console.log(results);
        return results;
      } catch (err) {
        return err;
      }
    },
  },
  Mutation: {
    async addproductstocart({
      email,
      product,
      quantity,
      price,
      shopname,
      productname,
      image_URL,
    }) {
      try {
        let cart = await Cart.findOne({ email: email, product: product });
        if (cart) {
          try {
            await Cart.findOneAndUpdate(
              { email: email, product: product },
              { email, product, quantity },
              { upsert: true, new: true }
            );

            return "success";
          } catch (err) {
            return err;
          }
        } else {
          const data = {
            giftoption: false,
            giftdescription: null,
          };
          const { giftoption, giftdescription } = data;
          cart = new Cart({
            email,
            product,
            productname,
            image_URL,
            quantity,
            price,
            shopname,
            giftoption,
            giftdescription,
          });
          await cart.save();
          return "success";
        }
      } catch (err) {
        return err;
      }
    },
    async deletecartitems({ email, product }) {
      try {
        let results = await Cart.deleteOne({ email: email, product: product });
        if (results.deletedCount === 0) {
          return "cart item doesnot exist";
        } else {
          return "true";
        }
      } catch (err) {
        return err;
      }
    },
    async addgift({ email, product, giftoption }) {
      try {
        let result = await Cart.findOneAndUpdate(
          { email: email, product: product },
          { email, product, giftoption },
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
    async addgiftdesc({ email, product, giftdescription }) {
      try {
        let result = await Cart.findOneAndUpdate(
          { email: email, product: product },
          { email, product, giftdescription },
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
module.exports = CartResolver;
