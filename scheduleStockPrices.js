const schedule = require("node-schedule");
const StockPricePerDay = require("./models/stockPricePerDay");
const getStockPriceData = require("./getStockPriceData");
const transformData = require("./helpers/transformData");
const today = new Date("2021-04-01");
// reduce   "2021-04-01"
const bse_code_list = ["500087", "500325"];

module.exports = () => {
  schedule.scheduleJob("*/10 * * * * 1-5", async () => {
    await bse_code_list.reduce(async (prevPromise, current_bse_code) => {
      try {
        await prevPromise;
        const response = await getStockPriceData(
          current_bse_code,
          today,
          today
        );
        const data = transformData(response.data, current_bse_code);
        console.log(data)
        await StockPricePerDay.insertMany(data);
      } catch (e) {
        console.log(e.response);
      }
    }, Promise.resolve());
    today.setDate(today.getDate() + 1);
  });
};