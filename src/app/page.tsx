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
        setData(result.data.value || []); 
      } 

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="container max-w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Kanban Board of the Laws</h1>
      <KanbanBoard sager={data} />
    </div>
  );
}
