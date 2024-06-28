"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaSun,
  FaMoon,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaCheck,
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

const SignUpComponent = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const evaluatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 5) strength++;
    if (password.length > 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(evaluatePasswordStrength(newPassword));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const passwordsMatch = () => {
    return password === confirmPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordsMatch()) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: password,
      password_confirmation: confirmPassword,
    };

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setError(null);
        toast.success("Account created successfully!");
        router.push("/login");
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
    <div className="h-screen md:flex">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-color-primary group relative hidden w-1/2 items-center justify-around overflow-hidden bg-primary md:flex">
        <div className="mx-auto max-w-xs text-center">
          <h2 className="nui-heading nui-heading-3xl nui-weight-medium nui-lead-normal text-white mb-4">
            Have an Account?
          </h2>
          <p className="nui-paragraph nui-paragraph-sm nui-weight-normal nui-lead-normal text-muted-200 mb-8">
            No need to waste time on this page, let's take you back to your
            account
          </p>
          <a
            href="/login"
            className="bg-white text-black py-4 px-8"
            disabled="false"
          >
            Login to Account
          </a>
        </div>
      </div>
      <div className="dark:bg-muted-900 flex flex-col items-center justify-between bg-white py-10 md:w-1/2">
        <div className="mx-auto flex w-full max-w-xs items-center justify-between">
          <div>
            <label className="nui-theme-toggle" htmlFor="theme-toggle">
              <input
                type="checkbox"
                className="nui-theme-toggle-input"
                id="theme-toggle"
              />
              <span className="nui-theme-toggle-inner">
                <FaSun className="nui-sun" aria-hidden="true" />
                <FaMoon className="nui-moon" aria-hidden="true" />
              </span>
            </label>
          </div>
        </div>
        <form className="mx-auto w-full max-w-xs" onSubmit={handleSubmit}>
          <h2 className="nui-heading nui-heading-3xl nui-weight-medium nui-lead-normal">
            Welcome to Tairo
          </h2>
          <p className="nui-paragraph nui-paragraph-sm nui-weight-normal nui-lead-normal text-muted-400 mb-6">
            Let's start by creating your account
          </p>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4 space-y-3">
            <div className="nui-input-wrapper nui-input-default nui-input-md nui-input-rounded-lg nui-has-icon">
              <div className="nui-input-outer">
                <div>
                  <input
                    type="text"
                    name="name"
                    className="nui-input"
                    placeholder="Please Enter Your Name"
                    required
                  />
                  <div className="nui-input-icon">
                    <FaUser />
                  </div>
                </div>
              </div>
            </div>
            <div className="nui-input-wrapper nui-input-default nui-input-md nui-input-rounded-lg nui-has-icon">
              <div className="nui-input-outer">
                <div>
                  <input
                    type="email"
                    name="email"
                    className="nui-input"
                    placeholder="Email Address"
                    required
                  />
                  <div className="nui-input-icon">
                    <FaEnvelope />
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group/password-strength">
              <div className="nui-input-wrapper nui-input-default nui-input-md nui-input-rounded-lg nui-has-icon">
                <div className="nui-input-outer">
                  <div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="nui-input !pe-12"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                    <div className="nui-input-icon">
                      <FaLock />
                    </div>
                    <button
                      className="leading-0 text-muted-400 peer-focus-within:text-primary-500 nui-focus absolute right-0 top-0 flex size-10 items-center justify-center text-center text-xl disabled:cursor-not-allowed"
                      type="button"
                      onClick={togglePasswordVisibility}
                    >
                      <div className="relative flex size-full items-center justify-center">
                        <FaEye />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="-mx-1 mt-2 grid grid-cols-5">
                {Array(5)
                  .fill("")
                  .map((_, index) => (
                    <div key={index} className="px-1">
                      <div
                        className={`h-1.5 rounded-xl transition-colors ${
                          index < passwordStrength
                            ? passwordStrength < 3
                              ? "bg-red-500"
                              : passwordStrength < 5
                              ? "bg-yellow-500"
                              : "bg-green-500"
                            : "bg-muted-200 dark:bg-muted-700"
                        }`}
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="nui-input-wrapper nui-input-default nui-input-md nui-input-rounded-lg nui-has-icon">
              <div className="nui-input-outer">
                <div>
                  <input
                    type="password"
                    className="nui-input"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                  <div className="nui-input-icon">
                    <FaCheck />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="nui-button nui-button-md nui-button-rounded-lg nui-button-solid nui-button-primary !h-11 w-full"
          >
            <span className="nui-button-text">
              {isLoading ? "Creating account..." : "Create Account"}
            </span>
          </button>
          <p className="text-muted-400 mt-4 flex justify-between text-sm">
            <span>Have an account?</span>
            <a
              href="/login"
              className="text-primary-600 hover:text-primary-500 font-medium underline-offset-4 transition duration-150 ease-in-out hover:underline focus:underline focus:outline-none"
            >
              Login here
            </a>
          </p>
        </form>
        <div className="text-center">
          <span className="nui-text nui-content-sm nui-weight-normal nui-lead-normal text-muted-400">
            © 2024 Arindam Mukherjee. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
