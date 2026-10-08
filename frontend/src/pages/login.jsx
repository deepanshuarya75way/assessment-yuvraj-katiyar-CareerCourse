import { Link } from "react-router-dom";

import { useState } from "react";



export default function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

    // const[error, seterror] = useState("");
    // const[loading ,setloading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();
  




    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/login",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
            deviceName:
            navigator.userAgentData?.platform ||
            navigator.platform ||
            "Unknown Device"
          }),
        }
      );



      const data =
        await response.json();



      console.log(data);



      if (response.ok) {

  localStorage.setItem(
    "token",
    data.token
  );
  localStorage.setItem(
    "name",
    data.user.name
  );

  alert("Login Successful");

  window.location.href = "/";

} else {

  alert('Invalid Credentials');
}
      

    } catch (error) {

      console.log(error);
    }
  };



  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md">

        {/* TITLE */}

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold mb-3">
            Welcome Back
          </h1>

          <p className="text-gray-500">
            Login to your account
          </p>

        </div>



        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* EMAIL */}

          <div>

            <label className="block mb-2 font-medium">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-600"
            />

          </div>



          {/* PASSWORD */}

          <div>

            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-indigo-600"
            />

          </div>



          {/* BUTTON */}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >

            Login

          </button>

        </form>



        {/* REGISTER LINE */}

        <p className="text-center text-gray-500 mt-8">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >

            Register

          </Link>

        </p>

      </div>

    </div>
  );
}

