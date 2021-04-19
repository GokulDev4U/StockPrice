const array = [1, 2, 3, 4];

function api(number) {
  return new Promise((resolve, reject) => {
    console.log("API call began with number", number);
    setTimeout(() => {
      console.log("API call end with number", number);
      resolve(number);
    }, Math.floor(number * Math.random() * 1000));
  });
}

// const arrayOfPromises = array.map(async (number) => {
//   console.log("awaiting");
//   await api(number);
//   console.log("await ended");
// });

(async ()=>{const response = await array.reduce(async (previousPromise, currentNumber)=>{
    await previousPromise
    return api(currentNumber)
}, Promise.resolve())

console.log({response})})()