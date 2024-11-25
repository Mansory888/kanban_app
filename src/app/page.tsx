"use client"
import { useEffect, useState } from "react";
import { Sag } from "../types/law";
import KanbanBoard from "../components/KanbanBoard";

export default function Home() {
  const [data, setData] = useState<Sag[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/fetch-laws");
      const result = await response.json();

      if (result.success) {
        setData(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container max-w-full p-6 h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">Kanban Board of the Laws</h1>
      {loading ? (
        <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-800"></div>
          <span className="ml-4 text-lg text-blue-800">Loading laws...</span>
        </div>
      ) : (
        <KanbanBoard sager={data} />
      )}
    </div>
  );
}
