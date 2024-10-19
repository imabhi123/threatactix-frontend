import React, { useState, useContext } from "react";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (token) {
    navigate("/");
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      if (user?.uid) {
        setToken(user?.accessToken);
        navigate("/");
      }
      console.log(user?.accessToken);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { firstName, lastName, email, password } = formData;

    try {
      console.log(process.env.BASE_URL)
      const response = await fetch("http://localhost:5000/api/v1" + "/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to register");
      }


      // Assuming the API retu
        navigate("/login");
    } catch (error) {
      setError(error.message);
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <div className="flex-1 flex flex-col justify-center px-4 lg:px-12 py-8 lg:py-0">
        <div className="flex items-center mb-8">
          <Shield className="w-6 h-6 lg:w-8 lg:h-8 text-red-500 mr-2" />
          <h1 className="text-3xl lg:text-5xl font-bold">THREATACTIX</h1>
        </div>
        <h2 className="text-3xl lg:text-6xl font-bold mb-8">
          Hunt, Identify and <span className="text-green-500">Act</span> on{" "}
          <span className="text-red-500">threats</span>
          <br />
          before they can harm you<span className="text-red-500">.</span>
        </h2>
        <ul className="space-y-3">
          {[
            "Comprehensive threat actor directory",
            "Constantly updated threat feeds",
            "Safe source for tracking threat actors and campaigns",
            "Data funnelled from all parts of the internet",
          ].map((feature, index) => (
            <li key={index} className="flex text-base lg:text-xl items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-xs text-gray-500 dark:text-gray-400">
          Powered by
          <img
            src="/api/placeholder/100/20"
            alt="Technisanct logo"
            className="inline-block ml-2"
          />
        </div>
      </div>
      <div className="w-full lg:w-[40%] bg-gray-200 dark:bg-gray-900 p-4 lg:p-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-[400px] flex flex-col justify-center">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-2">Sign Up</h2>
          <p className="text-sm lg:text-[16px] font-bold text-gray-700 dark:text-gray-400 mb-6">
            View latest updates and developments in CTI
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-4 lg:space-y-0 lg:flex lg:space-x-4">
              <div className="lg:w-1/2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full outline-none px-3 py-2 bg-gray-100 dark:bg-black rounded-md border border-gray-300 dark:border-gray-700"
                />
              </div>
              <div className="lg:w-1/2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full outline-none px-3 py-2 bg-gray-100 dark:bg-black rounded-md border border-gray-300 dark:border-gray-700"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full outline-none px-3 py-2 bg-gray-100 dark:bg-black rounded-md border border-gray-300 dark:border-gray-700"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none px-3 py-2 bg-gray-100 dark:bg-black rounded-md border border-gray-300 dark:border-gray-700"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <a href="#" className="text-green-500 text-sm">
              Forgot password?
            </a>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-md font-medium"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <div className="mt-4 text-center flex flex-col items-center">
            <p className="text-sm text-gray-700 dark:text-gray-400 mb-4">or</p>
            <button
              onClick={handleGoogleSignIn}
              className="w-full max-w-[300px] bg-white dark:bg-black text-black dark:text-white py-2 rounded-md font-medium flex items-center justify-center"
            >
              <img
                src="https://w7.pngwing.com/pngs/249/19/png-transparent-google-logo-g-suite-google-guava-google-plus-company-text-logo.png"
                alt="Google logo"
                className="mr-2 w-[20px] lg:w-[30px]"
              />
              Continue with Google
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
            By registering, you agree to the{" "}
            <a href="#" className="text-green-500 underline">
              Terms and Conditions
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
