const arr = [];

const move = (i) => {
  arr.push(i);
};

const mine = () => {
  let i = 0;
  try {
    while (i < 10) {
      if (i === 5) {
        throw new Error("ERROR");
      }
      move(i);
      i++;
    }
  } catch (error) {
    console.log("Was error but code is working");
  }
  finally {
    console.log('Приблизно так )))')
  }
};
mine()
console.log(arr);
