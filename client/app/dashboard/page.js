"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
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
    return <p>Loading...</p>;
  }

  if (isUnauthorized) {
    return <p>Unauthorized access, please log in to continue.</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
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
    <div className="dark:bg-muted-800 flex min-h-screen bg-white">
      <div className="relative flex flex-1 flex-col justify-center px-6 py-12 lg:w-2/5 lg:flex-none">
        <div className="dark:bg-muted-800 relative mx-auto w-full max-w-sm bg-white">
          <h2 className="userauth-heading userauth-heading-3xl userauth-weight-medium userauth-lead-relaxed mt-6 text-muted-700">
            Dashboard
          </h2>
          {profile && (
            <div className="mt-4">
              <p className="text-black">Name: {profile.user.name}</p>
              <p className="text-black">Email: {profile.user.email}</p>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={handleLogOut}
        className="userauth-button userauth-button-primary userauth-button-md userauth-button-rounded w-full h-12"
      >
        LogOut
      </button>
      <div className="bg-muted-100 dark:bg-muted-900 relative hidden w-0 flex-1 items-center justify-center lg:flex lg:w-3/5">
        <div className="mx-auto w-full max-w-4xl">
          {/* Placeholder or additional content */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
