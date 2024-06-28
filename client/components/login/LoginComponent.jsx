"use client";

import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setError(null);
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        const result = await response.json();
        setError(result.message || "Something went wrong");
        toast.error(result.message || "Something went wrong");
      }
    } catch (error) {
      setError("Failed to submit form");
      toast.error("Failed to submit form");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dark:bg-muted-800 flex min-h-screen bg-white">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="relative flex flex-1 flex-col justify-center px-6 py-12 lg:w-2/5 lg:flex-none">
        <div className="dark:bg-muted-800 relative mx-auto w-full max-w-sm bg-white">
          <div className="flex w-full items-center justify-between">
            <a
              href="/"
              className="text-muted-400 hover:text-primary-500 flex items-center gap-2 font-sans font-medium transition-colors duration-300"
            >
              <IoIosArrowBack className="icon size-5" />
              <span>Back to Home</span>
            </a>
          </div>
          <div>
            <h2 className="dark:text-white userauth-heading userauth-heading-3xl userauth-weight-medium userauth-lead-relaxed mt-6 text-muted-700">
              Welcome back.
            </h2>
            <p className="userauth-paragraph userauth-paragraph-sm userauth-weight-normal userauth-lead-normal text-muted-400 mb-6">
              Login with your credentials
            </p>
          </div>

          <form method="POST" action="" className="mt-6" noValidate="">
            <div className="mt-5">
              <div className="space-y-4">
                <div className="userauth-input-wrapper userauth-input-default userauth-input-md userauth-input-rounded">
                  <label
                    htmlFor="ninja-input-21786"
                    className="userauth-input-label"
                  >
                    Email address
                  </label>
                  <div className="userauth-input-outer">
                    <div>
                      <input
                        id="ninja-input-21786"
                        type="email"
                        autoComplete="email"
                        className="userauth-input h-12"
                        placeholder="Email address"
                        name="email"
                        value={email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="userauth-input-wrapper userauth-input-default userauth-input-md userauth-input-rounded">
                  <label
                    htmlFor="ninja-input-21787"
                    className="userauth-input-label"
                  >
                    Password
                  </label>
                  <div className="userauth-input-outer">
                    <div>
                      <input
                        id="ninja-input-21787"
                        type="password"
                        autoComplete="current-password"
                        className="userauth-input h-12"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="userauth-checkbox userauth-checkbox-rounded userauth-checkbox-primary"></div>
              </div>
              <div className="mt-6">
                <div className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="userauth-button userauth-button-primary userauth-button-md userauth-button-rounded w-full h-12"
                  >
                    <span className="userauth-button-text">
                      {isLoading ? "Logging in..." : "Sign in"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <p className="text-muted-400 mt-4 flex justify-between font-sans text-xs leading-5">
              <span>Don't have an account?</span>
              <a
                href="/"
                className="text-primary-600 hover:text-primary-500 font-medium underline-offset-4 transition duration-150 ease-in-out hover:underline"
              >
                Sign Up Now
              </a>
            </p>
          </form>
        </div>
      </div>
      <div className="bg-muted-100 dark:bg-muted-900 relative hidden w-0 flex-1 items-center justify-center lg:flex lg:w-3/5">
        <div className="mx-auto w-full max-w-4xl">
          <img
            className="mx-auto max-w-md"
            src="https://tairo.cssninja.io/img/illustrations/magician.svg"
            alt=""
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
