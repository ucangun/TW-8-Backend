/*****************************************************
                    EXPRESS.JS 
#  npm i validator                     
#  npm i bcrypt
/****************************************************/
const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    arrivalDate: {
      type: Date,
      required: true,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    guestNumber: {
      type: Number,
      required: true,
    },
    night: {
      type: Number,
      default: 1,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: function () {
        return this.night * this.price;
      }, // Create
      transform: function () {
        return this.night * this.price;
      }, //Update
    },
  },
  {
    timestamps: true,
    collection: "reservations",
  }
);

module.exports = mongoose.model("Reservation", reservationSchema);
