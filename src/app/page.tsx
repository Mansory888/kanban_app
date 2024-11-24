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
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="container max-w-full p-6 h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">Kanban Board of the Laws</h1>
      <KanbanBoard sager={data} />
    </div>
  );
}
