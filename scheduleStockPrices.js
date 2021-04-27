const schedule = require("node-schedule");
const StockPricePerDay = require("./models/stockPricePerDay");
const promiseRetry = require("promise-retry");
const getStockPriceData = require("./getStockPriceData");
const transformData = require("./helpers/transformData");
const today = new Date("2021-04-01");
// reduce   "2021-04-01"
const bse_code_list = ["531925", "540776"];

module.exports = () => {
  schedule.scheduleJob("*/10 * * * * 1-5", async () => {
    await bse_code_list.reduce(async (prevPromise, current_bse_code) => {
      try {
        await prevPromise;
        const response = await promiseRetry(async (retry, number) => {
          console.log(`Attempt number ${number} of ${current_bse_code}.`);
          return getStockPriceData(current_bse_code, today, today).catch(
            function (err) {
              if (
                err.status === 404 ||
                err.status === 422 ||
                err.status === 403 ||
                err.status === 429
              ) {
                retry(err);
              } else {
                retry;
              }

              throw err;
            },
            { minTimeout: 1000, retries: 3 }
          );
        });
        const data = transformData(response.data, current_bse_code);
        console.log(data);
        await StockPricePerDay.insertMany(data);
      } catch (e) {
        console.log(e);
      }
    }, Promise.resolve());
    today.setDate(today.getDate() + 1);
  });
};
