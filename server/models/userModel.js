const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      min: 3,
      max: 20,
      unique: true,
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "Email is already there"],
      max: 50,
    },
    password: {
      type: String,
      required: [true, "Please provide user password"],
      min: 6,
    },
    coverPhoto: {
      type: String,
      default: " ",
    },

    profilePhoto: {
      type: String,
      default: " ",
    },
    followers: {
      type: Array,
      default: [],
    },
    followingUsers: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      max: 50,
    },
    address: {
      type: String,
      max: 50,
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
    phone: {
      type: Number,
      max: 10,
    },
    isUserProvidedAllProfileData: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", UserSchema);
