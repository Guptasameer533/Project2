"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const register = async (values: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  aadhar: string;
  role: string;
  city: string;
  state: string;
  pincode: string;
}) => {
  const { fullName, email, phone, password, aadhar, role, city, state, pincode } = values;

  try {
    await connectDB();

    // Check if email already exists
    const userFound = await User.findOne({ email });
    if (userFound) {
      return { error: "Email already exists!" };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
      aadhar,
      role,
      city,
      state,
      pincode,
    });

    const savedUser = await newUser.save();

    // Convert to plain object and exclude sensitive data
    const userObject = savedUser.toObject();
    delete userObject.password; // Remove sensitive field
    delete userObject.__v; // Remove Mongoose internal field

    return { success: true, user: savedUser.toObject() };
  } catch (error: any) {
    // Log validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return { error: errors.join(", ") };
    }

    console.error(error);
    return { error: "Registration failed!" };
  }
};
