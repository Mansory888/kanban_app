import { Sag } from "../types/law";
import { useState, useMemo } from 'react';
import KanbanColumn from "./KanbanColumn";

interface KanbanBoardProps {
  sager: Sag[];
}

export default function KanbanBoard({ sager }: KanbanBoardProps) {
  const [selectedStatus, setSelectedStatus] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const groupedSager = useMemo(() => {
    const grouped: Record<number, Sag[]> = {};
    sager.forEach(sag => {
      if (!grouped[sag.statusid]) {
        grouped[sag.statusid] = [];
      }
      grouped[sag.statusid].push(sag);
    });
    return grouped;
  }, [sager]);
  
  const statusOptions = useMemo(() => Object.keys(groupedSager).map(Number), [groupedSager]);
  
  const filteredSager = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered: Record<number, Sag[]> = {};
  
    Object.entries(groupedSager).forEach(([statusId, sagerInStatus]) => {
      const numericStatusId = Number(statusId);
  
      if (selectedStatus.length === 0 || selectedStatus.includes(numericStatusId)) {
        filtered[numericStatusId] = sagerInStatus.filter(sag => 
          sag.titelkort.toLowerCase().includes(lowerCaseSearchTerm) || 
          sag.nummer.toLowerCase().includes(lowerCaseSearchTerm)
        );
      }
    });
  
    return filtered;
  }, [groupedSager, selectedStatus, searchTerm]);
  
  const toggleStatus = (statusId: number) => {
    setSelectedStatus(prev => {
      const isSelected = prev.includes(statusId);
      return isSelected ? prev.filter(id => id !== statusId) : [...prev, statusId];
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6 space-y-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search by title or number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow px-3 py-2 border rounded-md"
          />
          <button
            onClick={() => setSearchTerm('')}
            className="px-4 py-2 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Clear
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((statusId) => (
            <button
              key={statusId}
              onClick={() => toggleStatus(statusId)}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedStatus.includes(statusId)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {getStatusName(statusId)}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-x-auto">
        <div className="flex space-x-6 h-full pb-4">
          {Object.entries(filteredSager).map(([statusId, sagerInStatus]) => (
            <KanbanColumn key={statusId} statusId={parseInt(statusId)} sager={sagerInStatus} />
          ))}
        </div>
      </div>
    </div>
  );
}

function getStatusName(statusId: number) {
  switch (statusId) {
    case 11:
      return "Vedtaget";
    case 13:
      return "Under behandling";
    case 16:
      return "Forkastet";
    default:
      return `Status ${statusId}`;
  }
}