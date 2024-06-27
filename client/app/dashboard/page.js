"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const DashboardPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:8000/api/user/profile", {
          withCredentials: true,
        });
        setLoading(false);
      } catch (error) {
        console.error("Authentication error: ", error);
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Welcome to the Dashboard</h2>
      </main>
    </div>
  );
};

export default DashboardPage;
