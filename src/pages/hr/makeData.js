import { v4 as uuidv4 } from 'uuid';

// Generate fake data
export const fakeData = Array.from({ length: 22 }).map((_, index) => ({
  id: uuidv4(),
  fullName: `User ${index + 1}`,
  department: 'Sales',
  jobRole: 'Sales Representative',
  status: index%2 === 0 ? 'active' : 'inactive',
  image: `../../assets/user.jpg`,
}));


export type Person = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  petName: string;
  age: number;
  salary: string;
  dateOfBirth: string;
  dateOfJoining: string;
  isActive: string;
};
