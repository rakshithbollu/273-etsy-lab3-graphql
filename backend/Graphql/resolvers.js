const UserResolvers = require("./resolvers/UserResolvers.js");
const ProductResolver = require("./resolvers/ProductResolver.js");
const CartResolvers = require("./resolvers/CartResolvers.js");
const OrderResolvers = require("./resolvers/OrderResolvers.js");
const resolvers = {
  ...UserResolvers.Query,
  ...ProductResolver.Query,
  ...UserResolvers.Mutation,
  ...ProductResolver.Mutation,
  ...CartResolvers.Mutation,
  ...CartResolvers.Query,
  ...OrderResolvers.Mutation,
  ...OrderResolvers.Query,
};
module.exports = resolvers;
