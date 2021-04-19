const axios = require("axios").default;

const api_key = process.env.quandlApiKey;

/**
 * 
 * @param {*} bse_code BSE Code
 * @param {*} start_date starting date
 * @param {*} end_date ending date
 * 
 */

module.exports = (bse_code, start_date, end_date) =>
  axios.get(
    `https://www.quandl.com/api/v3/datasets/BSE/BOM${bse_code}/data.json`,
    {
      params: {
        start_date,
        end_date,
        api_key,
      },
    }
  );
