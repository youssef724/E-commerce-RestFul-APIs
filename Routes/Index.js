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
  app.use("/api/v1/category", CategoryRoute);
  app.use("/api/v1/subcategory", SubCategoryRoute);
  app.use("/api/v1/brand", BrandRoute);
  app.use("/api/v1/product", ProductRoute);
  app.use("/api/v1/user", UserRoute);
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/reviews", ReviewRoute);
  app.use("/api/v1/wishlist", wishListRoute);
  app.use("/api/v1/addresses", addressRoute);
  app.use("/api/v1/coupons", couponRoute);
  app.use("/api/v1/cart", CartRoute);
};

module.exports = mountRoutes;
