"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/app/actions/register";

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Puducherry",
];

export default function Register() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(formRef.current!);

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await register({
      email: formData.get("email") as string,
      password: password,
      fullName: formData.get("fullName") as string,
      phone: formData.get("phone") as string,
      aadhar: formData.get("aadhar") as string,
      role: formData.get("role") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      pincode: formData.get("pincode") as string,
    });

    if (response?.error) {
      setError(response.error);
      setSuccess(null); // In case of error, reset success state
    } else {
      setError(null); // Reset error state
      setSuccess(true); // Set success state to true
      formRef.current?.reset();
      setTimeout(() => router.push("/login"), 2000); // Redirect after 2 seconds
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-blue-500 to-green-500">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-4 border-2 border-gray-300 bg-white rounded-lg shadow-lg sm:max-w-sm mt-[10px]"
      >
        {error && <div className="text-red-500 text-center">{error}</div>}
        {success && (
          <div className="text-green-500 text-center">Registration successful! Redirecting...</div>
        )}
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">Create Your Account</h1>
        <input
          name="fullName"
          placeholder="Full Name"
          required
          className="border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone"
          required
          className="border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="aadhar"
          placeholder="Aadhar Number"
          maxLength={12}
          required
          className="border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="role"
          placeholder="Role"
          required
          className="border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="city"
          placeholder="City"
          required
          className="border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          name="state"
          required
          className="border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <input
          name="pincode"
          placeholder="Pincode"
          required
          className="border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
          className="border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        >
          Register
        </button>
        <Link href="/login" className="text-center text-blue-500 hover:text-blue-700 mt-4">
          Already have an account? Login
        </Link>
      </form>
    </section>
  );
}
