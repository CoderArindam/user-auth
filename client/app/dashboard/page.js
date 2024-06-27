"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Check if the user is authenticated using is_auth cookie
        const isAuthCookie = getCookie("is_auth");
        if (!isAuthCookie || isAuthCookie !== "true") {
          router.push("/");
          return;
        }

        const response = await fetch("http://localhost:8000/api/users/profile");

        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          setError("Failed to fetch user profile");
          router.push("/");
        }
      } catch (error) {
        setError("Failed to fetch user profile");
        router.push("/");
      }
    };

    fetchUserProfile();
  }, []);

  const getCookie = (name) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";");
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName.trim() === name) {
        return cookieValue;
      }
    }
    return null;
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="dark:bg-muted-800 flex min-h-screen bg-white">
      <div className="relative flex flex-1 flex-col justify-center px-6 py-12 lg:w-2/5 lg:flex-none">
        <div className="dark:bg-muted-800 relative mx-auto w-full max-w-sm bg-white">
          <h2 className="dark:text-white nui-heading nui-heading-3xl nui-weight-medium nui-lead-relaxed mt-6 text-muted-700">
            Dashboard
          </h2>
          {profile && (
            <div className="mt-4">
              <p className="text-muted-400">Name: {profile.name}</p>
              <p className="text-muted-400">Email: {profile.email}</p>
              {/* Additional dashboard content here */}
            </div>
          )}
        </div>
      </div>
      <div className="bg-muted-100 dark:bg-muted-900 relative hidden w-0 flex-1 items-center justify-center lg:flex lg:w-3/5">
        <div className="mx-auto w-full max-w-4xl">
          {/* Placeholder or additional content */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
