import {faker} from '@faker-js/faker';

// Function to generate fake data
export function makeData(rows) {
  const data = [];
  for (let i = 0; i < rows; i++) {
    const client = clientsList[Math.floor(Math.random() * clientsList.length)];
    data.push({
      id: i + 1,
      name: client.name,
      location: faker.address.city(),
      description: faker.lorem.sentence(),
      status: getRandomStatus(),
    });
  }
  return data;
}

// Function to generate a random status
function getRandomStatus() {
  const statuses = [
    'pending client data',
    'pending qs',
    'qs in progress',
    'out of scope',
    'missing info',
    'pending drafting',
    'drafting in progress',
    'drafting recalculation',
    'pending admin approve',
    'admin approved',
    'pending client approve',
    'client recalculation',
    'pending contract',
    'pending variation',
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

// Fake client data
export const clientsList = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Sam Smith' },
  { id: 3, name: 'Jane Does' },
  // Add more clients as needed
];

// Fake data
export const fakeData = makeData(20); // Generate 20 rows of fake data
