import bcrypt from "bcryptjs";

const enteredPassword = "123456"; // Enter the password you are testing
const storedHashedPassword = "2a$10$QHcUeCbqh/vzYCDM08hLK.zaP6sdvNcwRRIa/UA7yxHNg/te/YPi2"; // Your hashed password from MongoDB

const isMatch = bcrypt.compareSync(enteredPassword, storedHashedPassword);

console.log("✅ Manual Password Match Result:", isMatch);
