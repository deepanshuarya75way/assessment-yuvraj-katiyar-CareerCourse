const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // role:{
    //   type:String,
    //   enum:["user","admin"],
    //   default: "user",
    // },
    activeSessionId:{
      type: String,
      default: null,
    },

    activeDeviceName:{
      type: String,
      default:null,
    },
    // activeSessionAt:{
    //   type: Date,
    //   default:null,
    // },

    
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
