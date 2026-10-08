import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            // sessionId
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        alert("Registration successful. Please login.");
        window.location.href = "/login";
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-150 ">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Create an Account</h1>
          <p className="text-gray-500">Register to start learning on CareerCourse</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8">
          Already have an account? {" "}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
