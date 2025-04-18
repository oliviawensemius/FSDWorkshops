import Card from "../components/Card";

export default function Home() {
  const cardData = {
    title: "Our Services",
    description: "We provide high-quality solutions for your needs",
  };

  const handleCardClick = (title: string) => {
    alert(title);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 text-gray-800">
      <main className="max-w-4xl mx-auto flex flex-col gap-8">
        <h1 className="text-4xl font-bold">Welcome to Our Site</h1>
        <Card
          title={cardData.title}
          description={cardData.description}
          onClick={handleCardClick}
        />
        <Card
          title="About Us"
          description="Learn more about our company and mission"
          onClick={handleCardClick}
        />
      </main>
    </div>
  );
}
