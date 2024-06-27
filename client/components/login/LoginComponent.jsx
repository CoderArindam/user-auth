"use client";

import { IoIosArrowBack } from "react-icons/io";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
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
    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setError(null);
        router.push("/dashboard");
      } else {
        const result = await response.json();
        setError(result.message || "Something went wrong");
      }
    } catch (error) {
      setError("Failed to submit form");
    }
  };

  return (
    <div className="dark:bg-muted-800 flex min-h-screen bg-white">
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
            <h2 className="dark:text-white nui-heading nui-heading-3xl nui-weight-medium nui-lead-relaxed mt-6 text-muted-700">
              Welcome back.
            </h2>
            <p className="nui-paragraph nui-paragraph-sm nui-weight-normal nui-lead-normal text-muted-400 mb-6">
              Login with social media or your credentials
            </p>
          </div>
          {error && (
            <div className="nui-alert nui-alert-error mb-4">
              <span>{error}</span>
            </div>
          )}
          <form method="POST" action="" className="mt-6" noValidate="">
            <div className="mt-5">
              <div className="space-y-4">
                <div className="nui-input-wrapper nui-input-default nui-input-md nui-input-rounded">
                  <label
                    htmlFor="ninja-input-21786"
                    className="nui-input-label"
                  >
                    Email address
                  </label>
                  <div className="nui-input-outer">
                    <div>
                      <input
                        id="ninja-input-21786"
                        type="email"
                        autoComplete="email"
                        className="nui-input h-12"
                        placeholder="Email address"
                        name="email"
                        value={email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="nui-input-wrapper nui-input-default nui-input-md nui-input-rounded">
                  <label
                    htmlFor="ninja-input-21787"
                    className="nui-input-label"
                  >
                    Password
                  </label>
                  <div className="nui-input-outer">
                    <div>
                      <input
                        id="ninja-input-21787"
                        type="password"
                        autoComplete="current-password"
                        className="nui-input h-12"
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
                <div className="nui-checkbox nui-checkbox-rounded nui-checkbox-primary"></div>
              </div>
              <div className="mt-6">
                <div className="block w-full rounded-md shadow-sm">
                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="nui-button nui-button-primary nui-button-md nui-button-rounded w-full h-12"
                  >
                    <span className="nui-button-text">Sign in</span>
                  </button>
                </div>
              </div>
            </div>
            <p className="text-muted-400 mt-4 flex justify-between font-sans text-xs leading-5">
              <span>Don't have an account?</span>
              <a
                href="/signup"
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
