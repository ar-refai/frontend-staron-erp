import { v4 as uuidv4 } from 'uuid';
import UserImg from "../../assets/user.jpg";  // Correct path to the image file

export const fakeData = Array.from({ length: 22 }).map((_, index) => ({
    id: uuidv4(),
    fullName: `User ${index + 1}`,
    department: 'Sales',
    jobRole: 'Sales Representative',
    status: index % 2 === 0 ? 'active' : 'inactive',
    image: UserImg,
}));