import Property from "../models/property.model.js";
import Wishlist from "../models/wishlistModel.js";

export const addWishlist = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const wishlist = await Wishlist.findOne({
      user: req.user._id,
      property: propertyId,
    });

    if (wishlist) {
      return res.status(200).json({
        success: true,
        message: "Already in wishlist!",
      });
    }

    await Wishlist.create({
      user: req.user._id,
      property: propertyId,
    });

    res.json({
      success: true,
      message: "Added to wishlist successfully!.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const data = await Wishlist.find({
      user: req.user._id,
    })
      .populate("property")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeWishlist = async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const result = await Wishlist.findOneAndDelete({
      user: req.user._id,
      property: propertyId,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item removed from wishlist.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
