const UserResolver = require("./resolvers/UserResolver.js");
const ItemResolver = require("./resolvers/ItemResolver.js");
const CartResolver = require("./resolvers/CartResolver.js");
const PurchasesResolver = require("./resolvers/PurchasesResolver.js");
const resolvers = {
  ...UserResolver.Query,
  ...ItemResolver.Query,
  ...UserResolver.Mutation,
  ...ItemResolver.Mutation,
  ...CartResolver.Mutation,
  ...CartResolver.Query,
  ...PurchasesResolver.Mutation,
  ...PurchasesResolver.Query,
};
module.exports = resolvers;
