interface CardProps {
  title: string;
  description: string;
  onClick: () => void;
}

export default function Card({ title, description, onClick }: CardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md" onClick={onClick}>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
