const column_names = [
  "date",
  "open",
  "high",
  "low",
  "close",
  "wap",
  "noOfShares",
  "noOfTrades",
  "totalTurnover",
  "deliverableQuantity",
];

function transformData({ dataset_data }, bse_code) {
  const { data } = dataset_data;
  return data.map((row) =>
    row.reduce(
      (obj, col, i) => {
        if (!column_names[i]) return obj;
        obj[column_names[i]] = col;
        return obj;
      },
      { bse_code }
    )
  );
}

module.exports = transformData;
