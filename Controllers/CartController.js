const ApiFeatures = require("../Utils/apiFeatures");
const asyncHandler = require("express-async-handler");
const Cart = require("../Models/CartModel");
const Product = require("../Models/ProductModel");
const ApiError = require("../Utils/ApiError");
const Coupon = require("../Models/CouponModel");

const calculateTotalCartPrice = (cart) => {
  let totalCartPrice = 0;
  cart.cartItems.forEach((product) => {
    totalCartPrice += product.price * product.quantity;
  });
  cart.totalPriceAfterDiscount = undefined;
  return totalCartPrice;
};
exports.addProductToCart = asyncHandler(async (req, res) => {
  // get cart for logged user
  let cart = await Cart.findOne({ user: req.user._id });
  const { productId, quantity, color } = req.body;
  const product = await Product.findById(productId);

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [
        {
          product: productId,
          quantity: quantity,
          color: color,
          price: product.price,
        },
      ],
    });
  } else {
    // update product quantity if already in cart
    const productIndex = cart.cartItems.findIndex(
      (item) =>
        item.product.toString() === productId.toString() && item.color === color
    );

    if (productIndex > -1) {
      const cartItem = cart.cartItems[productIndex];
      cartItem.quantity += 1;

      cart.cartItems[productIndex] = cartItem;
    }

    // product not in cart, add it
    else {
      cart.cartItems.push({
        product: productId,
        quantity: quantity,
        color: color,
        price: product.price,
      });
    }
  }
  // calculate total price
  let totalCartPrice = calculateTotalCartPrice(cart);

  cart.totalCartPrice = totalCartPrice;
  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Product added to cart successfully",
    data: cart,
  });
});

exports.getLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new ApiError("No cart found for this user", 404));
  }
  const totalCartPrice = calculateTotalCartPrice(cart);
  cart.totalCartPrice = totalCartPrice;
  cart.save();
  res.status(200).json({
    status: "success",
    numberOfItems: cart.cartItems.length,
    message: "Cart fetched successfully",
    data: cart,
  });
});

exports.removeSpecificCartItem = asyncHandler(async (req, res, next) => {
  const cart = await Cart.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: { cartItems: { _id: req.params.itemId } },
    },
    { new: true }
  );

  calculateTotalCartPrice(cart);
  cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

exports.clearCart = asyncHandler(async (req, res) => {
  await Cart.deleteOne({ user: req.user._id });
  res.status(200).json({
    status: "success",
    message: "Cart cleared successfully",
  });
});

exports.updateCartItemQuantity = asyncHandler(async (req, res, next) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new ApiError("No cart found for this user", 404));
  }
  const itemIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() === req.params.itemId
  );
  if (itemIndex > -1) {
    const cartItem = cart.cartItems[itemIndex];
    cartItem.quantity = quantity;
    cart.cartItems[itemIndex] = cartItem;
  } else {
    return next(new ApiError("No item found with this id", 404));
  }

  // calculate total price
  let totalCartPrice = calculateTotalCartPrice(cart);
  cart.totalCartPrice = totalCartPrice;
  await cart.save();
  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

exports.applyCoupon = asyncHandler(async (req, res, next) => {
  const coupon = await Coupon.findOne({
    name: req.body.coupon,
    expire: { $gt: Date.now() },
  });
  if (!coupon) {
    return next(new ApiError("Invalid or expired coupon", 404));
  }
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return next(new ApiError("No cart found for this user", 404));
  }
  const totalCartPrice = cart.totalCartPrice;

  const totalPriceAfterDiscount = (
    totalCartPrice -
    (totalCartPrice * coupon.discount) / 100
  ).toFixed(2);

  cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
  await cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    message: "Coupon applied successfully",
    data: cart,
  });
});
