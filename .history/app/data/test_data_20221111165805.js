const user = [
  {
    _id: "1234567890",
    apiKey: "abc123",
    email: "user@example.com",
    host: "http://localhost:3000",
    customers: [customer],
    appointments: [],
  },
];

const customer = [
  {
    _id: "1234567890",
    name: "John",
    email: "customer@example.com",
    phone: 3123750716,
  },
  {
    _id: "2398405388",
    name: "Ben",
    email: "customer@example.com",
    phone: 3123750716,
  },
];

const appointments = [
  {
    _id: "1234567890",
    customerId: "1234567890",
    location: "Chicago,IL",
  },
];
