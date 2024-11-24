import { Sag } from "../types/law";

interface KanbanCardProps {
  sag: Sag;
}

export default function KanbanCard({ sag }: KanbanCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-2">{sag.titelkort}</h3>
      <p className="text-sm text-gray-600 mb-2">Nummer: {sag.nummer}</p>
      <p className="text-sm text-gray-600">Type: {sag.typeid}</p>
    </div>
  );
}