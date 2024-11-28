/*****************************************************
                    Hotel Api
/****************************************************/
const { Schema, model } = require("mongoose");

const roomSchema = new Schema(
  {
    roomNumber: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    bedType: {
      type: String,
      enum: ["single", "double", "queen", "king"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "rooms",
    timestamps: true,
  }
);

module.exports = model("Room", roomSchema);
