const all = [];

const a = [
  {
    item_name: 'chicken',
    item_quantuity: 5,
    item_price: 50,
    item_total: 250,
  },
  {
    item_name: 'chicken',
    item_quantuity: 5,
    item_price: 50,
    item_total: 250,
  },
  {
    item_name: 'chicken',
    item_quantuity: 5,
    item_price: 50,
    item_total: 250,
  },
];

const b = [
  {
    item_name: 'chicken',
    item_quantuity: 5,
    item_price: 50,
    item_total: 250,
  },
];

all.push(a, b);

// console.log(all);

console.log(all.flat());
