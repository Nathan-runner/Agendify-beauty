import { useEffect, useState } from "react";
import CardServico from "../components/CardServico";
import { getServices } from "../services/serviceApi";

function ServicesPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        console.log("Erro ao buscar serviços", error);

        setServices([
          {
            id: 1,
            name: "Corte de cabelo",
            description: "Corte feminino, masculino e infantil.",
            price: 50,
            duration: 30,
            image: "/src/assets/Cabelo.png",
          },
          {
            id: 2,
            name: "Maquiagem",
            description: "Maquiagem social e profissional.",
            price: 80,
            duration: 60,
            image: "/src/assets/Maquiagem.png",
          },
        ]);
      }
    }

    loadServices();
  }, []);

  return (
    <main className="min-h-screen bg-cyan-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Escolha um serviço
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <CardServico
            key={service.id}
            imagem={service.image}
            nome={service.name}
            descricao={`R$ ${service.price} • ${service.duration} minutos`}
            link={`/agendamento/${service.id}`}
          />
        ))}
      </div>
    </main>
  );
}

export default ServicesPage;