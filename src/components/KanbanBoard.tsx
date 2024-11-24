import { Sag } from "../types/law";
import KanbanColumn from "./KanbanColumn";

interface KanbanBoardProps {
  sager: Sag[];
}

export default function KanbanBoard({ sager }: KanbanBoardProps) {
  const groupedSager = sager.reduce((acc, sag) => {
    if (!acc[sag.statusid]) {
      acc[sag.statusid] = [];
    }
    acc[sag.statusid].push(sag);
    return acc;
  }, {} as Record<number, Sag[]>);

  return (
    <div className="flex overflow-x-auto space-x-4 p-4">
      {Object.entries(groupedSager).map(([statusId, sagerInStatus]) => (
        <KanbanColumn key={statusId} statusId={parseInt(statusId)} sager={sagerInStatus} />
      ))}
    </div>
  );
}
