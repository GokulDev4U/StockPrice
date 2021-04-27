const dotenv = require("dotenv");
dotenv.config();

const { connect } = require("mongoose");
const StockPricePerDay = require("./models/stockPricePerDay");
const schedule = require("./scheduleStockPrices");

(async () => {
  const connection = await connect(process.env.database_host, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((e) => {
    console.log(e);
    process.exit(0);
  });
  start(connection);
})();

async function start(conn) {
  schedule();
}
