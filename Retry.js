const promiseRetry = require("promise-retry");
const schedule = require("./scheduleStockPrices");

promiseRetry({ minTimeout: 100, retries: 10 }, async (retry, number) => {
  console.log(`Attempt number ${number}.`);

  //   return schedule().catch(function (err) {
  //     if (err.code === "ETIMEDOUT") {
  //       retry(err);
  //     }

  //     throw err;
  const result = await schedule();
  if (result.length > 0) {
    return Promise.resolve();
  } else {
    return retry();
  }
})
  .then((res) => {
    console.log(`Success! ${res}`);
  })
  .catch((err) => {
    console.log(`Failure. ${err}`);
  });
