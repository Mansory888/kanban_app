import { Sag } from "../types/law";
import KanbanCard from "./KanbanCard";

interface KanbanColumnProps {
  statusId: number;
  sager: Sag[];
}

export default function KanbanColumn({ statusId, sager }: KanbanColumnProps) {
  const getStatusName = (statusId: number) => {
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
  };

  return (
    <div className="flex-shrink-0 w-80 bg-gray-100 rounded-lg p-4">
      <h2 className="font-bold mb-4">{getStatusName(statusId)}</h2>
      <div className="space-y-2">
        {sager.map((sag) => (
          <KanbanCard key={sag.id} sag={sag} />
        ))}
      </div>
    </div>
  );
}