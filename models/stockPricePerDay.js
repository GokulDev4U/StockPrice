const mongoose = require("mongoose");
const { Schema } = mongoose;

const stockPricePerDaySchema = new Schema(
  {
    date: { type: Date, default: Date.now(), index: true },
    open: Number,
    high: Number,
    low: Number,
    close: Number,
    wap: Number,
    noOfShares: Number,
    noOfTrades: Number,
    totalTurnover: Number,
    deliverableQuantity: Number,
    bse_code: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

stockPricePerDaySchema.index({ bse_code: 1, date: 1 }, { unique: true });

const StockPricePerDay = mongoose.model(
  "StockPricePerDay",
  stockPricePerDaySchema,
  "stock_price_per_day"
);

module.exports = StockPricePerDay;
