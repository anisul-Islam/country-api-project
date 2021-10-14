// Your code here

const doPrinting = (x) => {
  setTimeout(() => {
    console.log(x);
  }, 0);
};

(function numberCounter() {
  let x = 1;
  while (x <= 1000000) {
    doPrinting(x++);
  }
})();
