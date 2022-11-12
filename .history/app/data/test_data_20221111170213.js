const user = [
  {
    _id: "1234567890",
    apiKey: "abc123",
    email: "user@example.com",
    host: "http://localhost:3000",
    customers: [customer],
    appointments: [],
    dateTimeRange: [
      {
        date: "23-01-1999",
        startTime: "9:00 am",
        endTime: "5:00 pm",
      },
    ],
    slotSize: 25,
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
    date: "01-23-1999",
    time: "9:00 am",
    data: null,
  },

  {
    _id: "1234567891",
    customerId: "2398405388",
    location: "Chicago,IL",
    date: "01-23-1999",
    time: "9:30 am",
    data: null,
  },
];
