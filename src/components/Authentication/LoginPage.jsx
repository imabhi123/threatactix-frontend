import React, { useState, useContext, useEffect } from "react";
import { Eye, EyeOff, Shield } from "lucide-react";
import { signInWithGoogle } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../apis/api";
import AdaptivePulsatingSpinner from "../Loading";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { token, setToken } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const credentials = { email, password };
      const response = await loginUser(credentials);

      if (response?.statusCode === 200) {
        localStorage.setItem("token", response?.data?.accessToken);
        localStorage.setItem('userId',response?.data?.user?._id);
        setToken(response?.data?.accessToken);
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      if (user?.uid) {
        localStorage.setItem("token", user?.accessToken);
        setToken(user?.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      setLoading(false);
      console.error("Google sign-in error:", error);
    }
  };

  if (loading) {
    return <AdaptivePulsatingSpinner />;
  }

  return (
    <div className="flex max-w-full flex-wrap min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <div className="flex-1 max-w-[100%] flex py-12 flex-col justify-center px-12">
        <div className="flex relative items-center mb-8">
          <Shield className="w-8 h-8 text-blue-500 dark:text-red-500 mr-2" />
          <h1 className="text-3xl md:text-5xl font-bold">
            Threatactix-The C&C Blacklist
          </h1>
        </div>
        <h2 className="text-2xl md:text-3xl  font-bold mb-8">
          "Shifting from shadows to the spotlight:{" "}
          <span className="text-red-500 dark:text-red-500">
            we uncover, unveil, and blacklist malicious actors
          </span>{" "}
          to safeguard your business."
        </h2>
        <ul className="space-y-3 text-xl">
          {[
            "APT (Advanced Persistent Threat) vs. ABT (Adversary Behavior Tracker)",
            "Adversary Behavior Tracker: Monitoring key indicators of malicious intent.",
            "Behavioral Blueprint of Attackers: Spot tactics before they threaten your business.",
          ].map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg
                className="w-5 h-5 text-blue-500 dark:text-green-500 mr-2"
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
      </div>
      <div className="w-full lg:w-[40%] bg-gray-100 dark:bg-gray-900 p-8 flex flex-col justify-center items-center">
        <div className="w-[400px] max-w-full flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-2">Sign in</h2>
          <p className="text-[16px] font-bold text-gray-500 dark:text-gray-400 mb-6">
            View latest updates and developments in CTI
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-400"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full outline-none px-3 py-2 bg-gray-100 dark:bg-black rounded-md border border-gray-300 dark:border-gray-700"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full outline-none px-3 py-2 bg-gray-100 dark:bg-black rounded-md border border-gray-300 dark:border-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <a href="#" className="text-blue-500 dark:text-green-500 text-sm">
              Forgot password?
            </a>
            <button
              type="submit"
              className="w-full bg-blue-500 dark:bg-green-500 text-white py-2 rounded-md font-medium"
            >
              Sign in
            </button>
          </form>
          <div className="mt-4 text-center flex flex-col items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">or</p>
            <button
              onClick={handleGoogleSignIn}
              className="w-[300px] max-w-full bg-white dark:bg-gray-700 text-black dark:text-white py-2 rounded-md font-medium flex items-center justify-center"
            >
              <img
                src="https://w7.pngwing.com/pngs/249/19/png-transparent-google-logo-g-suite-google-guava-google-plus-company-text-logo.png"
                alt="Google logo"
                className="mr-2 w-[30px]"
              />
              Continue with Google
            </button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <a href="#" className="text-blue-500 dark:text-green-500">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
