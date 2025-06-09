import Cart from '../service/Cart';
import Buyable from '../domain/Buyable';

test('new card should be empty', () => {
  const cart = new Cart();

  expect(cart.items.length).toBe(0);
});

test('add item', () => {
  const cart = new Cart();
  const item : Buyable = {
    id: 101,
    name: 'book',
    price: 1000
  };
  cart.add(item)
  expect(cart.items.length).toBe(1);
});


test('total sum', () => {
  const cart = new Cart();
  const item : Buyable = {
    id: 101,
    name: 'book',
    price: 1000
  };

  const item2 : Buyable = {
    id: 102,
    name: 'book2',
    price: 3000
  };
  cart.add(item)
  cart.add(item2)
  expect(cart.totalCost()).toBe(4000);
});

test('total sum with discount', () => {
  const cart = new Cart();
  const item : Buyable = {
    id: 101,
    name: 'book',
    price: 1000
  };

  const item2 : Buyable = {
    id: 102,
    name: 'book2',
    price: 3000
  };
  cart.add(item)
  cart.add(item2)
  expect(cart.totalCostWithDiscount(10)).toBe(3600);
});

test('delete element from cart', () => {
  const cart = new Cart();
  const item : Buyable = {
    id: 101,
    name: 'book',
    price: 1000
  };

  const item2 : Buyable = {
    id: 102,
    name: 'book2',
    price: 3000
  };
  cart.add(item)
  cart.add(item2)
  cart.deleteItemCart(102)
  expect(cart.items.length).toBe(1);
});


test('add count item with incorrect count', () => {
  const cart = new Cart();

  const item2 : Buyable = {
    id: 102,
    name: 'book2',
    price: 3000,
    count: 0
  };
  
  expect(() => {
    cart.add(item2)
  }).toThrow('количество товара не может быть меньше одного');
});


test('add count item', () => {
  const cart = new Cart();
  const item : Buyable = {
    id: 101,
    name: 'book',
    price: 1000
  };

  const item2 : Buyable = {
    id: 102,
    name: 'book2',
    price: 3000,
    count: 1
  };

  const item3 : Buyable = {
    id: 102,
    name: 'book2',
    price: 3000,
    count: 1
  };
  
  cart.add(item)
  cart.add(item2)
  cart.add(item3)
  expect(cart.items[1].count).toBe(2);
});

test('add count item check price', () => {
  const cart = new Cart();
  const item : Buyable = {
    id: 101,
    name: 'book',
    price: 1000
  };

  const item2 : Buyable = {
    id: 102,
    name: 'book2',
    price: 3000,
    count: 1
  };

  const item3 : Buyable = {
    id: 102,
    name: 'book2',
    price: 3000,
    count: 1
  };
  
  cart.add(item)
  cart.add(item2)
  cart.add(item3)
  expect(cart.items[1].totalPrice).toBe(6000);
});

test('minus count item', () => {
  const cart = new Cart();
  const item : Buyable = {
    id: 101,
    name: 'book',
    price: 1000
  };

  const item2 : Buyable = {
    id: 102,
    name: 'book2',
    price: 3000,
    count: 1
  };

  const item3 : Buyable = {
    id: 102,
    name: 'book2',
    price: 3000,
    count: 2
  };
  
  cart.add(item)
  cart.add(item2)
  cart.add(item3)
  cart.minusCount(102)
  expect(cart.items[1].count).toBe(2);
});

test('error find id minus count item', () => {
  const cart = new Cart();
  const item : Buyable = {
    id: 101,
    name: 'book',
    price: 1000
  };

  const item2 : Buyable = {
    id: 102,
    name: 'book2',
    price: 3000,
    count: 1
  };

  const item3 : Buyable = {
    id: 102,
    name: 'book2',
    price: 3000,
    count: 2
  };
  
  cart.add(item)
  cart.add(item2)
  cart.add(item3)
  
  expect(() => {
    cart.minusCount(100)
  }).toThrow('Нет такого значения');
});


test('error if count < 1', () => {
  const cart = new Cart();

  const item2 : Buyable = {
    id: 102,
    name: 'book2',
    price: 3000,
    count: 1
  };
  
  cart.add(item2)
  expect(() => {
    cart.minusCount(102)
  }).toThrow('Количество товаров не может быть меньше одного');
});