"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardSection = () => {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user/profile", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          if (response.status === 401) {
            console.log("Unauthorized access");
            setIsUnauthorized(true);
          } else {
            setError("Failed to fetch user profile");
          }
        }
      } catch (error) {
        setError("Failed to fetch user profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  if (isLoading) {
    return (
      <p className="text-center mt-20 text-lg text-gray-600">Loading...</p>
    );
  }

  if (isUnauthorized) {
    return (
      <p className="text-center mt-20 text-lg text-red-600">
        Unauthorized access, please log in to continue.
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-20 text-lg text-red-600">Error: {error}</p>
    );
  }

  const handleLogOut = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/user/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Logout successful");
        router.push("/login");
      } else {
        if (response.status === 401) {
          console.log("Failed to logout");
        }
      }
    } catch (error) {
      console.log("Unknown error occurred", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900">
      <div className="relative flex flex-1 flex-col justify-center px-6 py-12 lg:w-2/5 lg:flex-none">
        <div className="relative mx-auto w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="mt-6 text-2xl font-semibold text-gray-800 dark:text-white">
            Dashboard
          </h2>
          {profile && (
            <div className="mt-4">
              <p className="text-gray-800 dark:text-gray-200">
                Name: {profile.user.name}
              </p>
              <p className="text-gray-800 dark:text-gray-200">
                Email: {profile.user.email}
              </p>
            </div>
          )}
          <button
            onClick={handleLogOut}
            className="mt-6 w-full h-12 rounded-md bg-indigo-600 text-white text-lg font-medium hover:bg-indigo-700 transition-colors duration-200"
          >
            Log Out
          </button>
        </div>
      </div>
      <div className="hidden lg:flex lg:w-3/5 items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h3 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Welcome to your Dashboard
          </h3>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Here you can manage your profile and settings.
          </p>
          <img
            className="mt-8 mx-auto max-w-xs"
            src="https://i.ibb.co/sgNwQtf/magician.png"
            alt="Dashboard Illustration"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
