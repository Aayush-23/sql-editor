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

const getColumns = (data) => {
  const columns = data.reduce((prevVal, row) => {
    const rowHeaders = Object.entries(row).reduce((temp, [header, value]) => {
      const currentTextSize = toString(value).length;
      const previousMaxWidth = temp[header]?.maxWidth || 0;
      const maxWidth = Math.max(currentTextSize, previousMaxWidth);

      return {
        ...temp,
        [header]: {
          visible: true,
          maxWidth: maxWidth,
        },
      };
    }, {});
    return { ...prevVal, ...rowHeaders };
  }, {});
  return columns;
};

export const getResults = (fileName, limit) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const name = fileName.toLowerCase();
      let rows = [];
      if (fileData.hasOwnProperty(name)) {
        rows = fileData[name];
      } else {
        const count = Math.min(limit, 250000);
        rows = getData(count);
      }
      const headers = getColumns(rows);
      resolve({ rows, headers });
    }, 100);
  });
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
  {
    query: "Select * from users",
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
  {
    query: "Select * from products",
    id: crypto.randomUUID(),
    title: "Users",
    date: Date.now(),
  },
  {
    query: "Select * from order_details",
    id: crypto.randomUUID(),
    title: "Order Details",
    date: Date.now(),
  },
  {
    query: "Select * from something limit 250000",
    id: crypto.randomUUID(),
    title: "Stress Test",
    date: Date.now(),
  },
];
