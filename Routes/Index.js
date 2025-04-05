const CategoryRoute = require("./CategoryRoute");
const SubCategoryRoute = require("./SubCategoryRoute.js");
const BrandRoute = require("./BrandRoute.js");
const ProductRoute = require("./ProductRoute.js");
const UserRoute = require("./UserRoute.js");
const authRoute = require("./AuthRoute.js");
const ReviewRoute = require("./ReviewRoute.js");
const wishListRoute = require("./WishListRoute.js");
const addressRoute = require("./AddressesRoute.js");
const couponRoute = require("./CouponRoutes.js");
const CartRoute = require("./CartRoute.js");

const mountRoutes = (app) => {
  app.use("/categories", CategoryRoute);
  app.use("/subcategories", SubCategoryRoute);
  app.use("/brands", BrandRoute);
  app.use("/products", ProductRoute);
  app.use("/users", UserRoute);
  app.use("/auth", authRoute);
  app.use("/reviews", ReviewRoute);
  app.use("/wishlist", wishListRoute);
  app.use("/addresses", addressRoute);
  app.use("/coupons", couponRoute);
  app.use("/carts", CartRoute);
};

module.exports = mountRoutes;
