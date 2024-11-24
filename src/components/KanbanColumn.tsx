import { Sag } from "../types/law";
import KanbanCard from "./KanbanCard";

interface KanbanColumnProps {
  statusId: number;
  sager: Sag[];
}

export default function KanbanColumn({ statusId, sager }: KanbanColumnProps) {
  const getStatusColor = (statusId: number) => {
    switch (statusId) {
      case 11:
        return "bg-green-100 border-green-300";
      case 13:
        return "bg-blue-100 border-blue-300";
      case 16:
        return "bg-red-100 border-red-300";
      default:
        return "bg-gray-100 border-gray-300";
    }
  };

  return (
    <div className={`flex-shrink-0 w-96 ${getStatusColor(statusId)} rounded-lg p-4 h-full flex flex-col border-2`}>
      <h2 className="font-bold mb-4 text-lg">{getStatusName(statusId)}</h2>
      <div className="flex-1 overflow-y-auto pr-2 space-y-3">
        {sager.map((sag) => (
          <KanbanCard key={sag.id} sag={sag} />
        ))}
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