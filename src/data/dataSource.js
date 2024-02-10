import {
  uniqueNamesGenerator,
  names,
  animals,
  colors,
} from "unique-names-generator";
import customers from "./customers.json";
import orders from "./orders.json";
import orderDetails from "./order_details.json";
import products from "./products.json";
import users from "./users.json";

const fileData = {
  customers: customers,
  orders: orders,
  order_details: orderDetails,
  products: products,
  users: users,
};

const getData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    const grade = Math.floor(Math.random() * 11) + 1;
    data[i] = {
      key: i,
      name: uniqueNamesGenerator({
        dictionaries: [names],
      }),
      age: grade + 5,
      gender: Math.random() > 0.5 ? "F" : "M",
      grade,
      animal: uniqueNamesGenerator({
        dictionaries: [animals],
      }),
      color: uniqueNamesGenerator({
        dictionaries: [colors],
      }),
    };
  }
  return data;
};

export const getResults = (fileName) => {
  const name = fileName.toLowerCase();

  if (fileData.hasOwnProperty(name)) {
    return fileData[name];
  }

  return getData(250000);
};

export const HISTORY = [
  {
    query: "Select * from customers",
    id: crypto.randomUUID(),
    date: Date.now(),
  },
  { query: "Select * from orders", id: crypto.randomUUID(), date: Date.now() },
  {
    query: "Select * from products",
    id: crypto.randomUUID(),
    date: Date.now(),
  },
];

export const COLLECTIONS = [
  {
    query: "Select * from customers",
    id: crypto.randomUUID(),
    title: "Customers",
    date: Date.now(),
  },
  {
    query: "Select * from orders",
    id: crypto.randomUUID(),
    title: "Orders",
    date: Date.now(),
  },
  {
    query: "Select * from products",
    id: crypto.randomUUID(),
    title: "Products",
    date: Date.now(),
  },
];
