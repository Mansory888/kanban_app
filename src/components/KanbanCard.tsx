import { Sag } from '../types/law';

interface KanbanCardProps {
  sag: Sag;
}

export default function KanbanCard({ sag }: KanbanCardProps) {
  return (         
    <div className="bg-white rounded-lg shadow p-4 transition-all duration-300 transform hover:scale-102 hover:shadow-md origin-top-left hover:-translate-y-0.5 ">
      <h3 className="text-sm font-medium text-blue-600 mb-2">{sag.titelkort}</h3>
      <p className="text-sm text-gray-600 mb-1">Nummer: {sag.nummer}</p>
      <p className="text-sm text-gray-600">Type: {getTypeText(sag.typeid)}</p>
    </div>
  );
}

function getTypeText(typeId: number) {
  switch (typeId) {
    case 3:
      return "Lovforslag";
    case 4:
      return "Beslutningsforslag";
    case 5:
      return "Redegørelse";
    default:
      return `Type ${typeId}`;
  }
}