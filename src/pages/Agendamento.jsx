import { useParams } from "react-router-dom";
import { useState } from "react";

function Agendamento() {
  const { id } = useParams();

  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState("");

  const horarios = ["09:00", "10:00", "11:00", "14:00", "15:00"];
  const duracaoServico = 30;

  function calcularHorarioFinal(horarioInicial) {
    const [hora, minuto] = horarioInicial.split(":").map(Number);
    const data = new Date();

    data.setHours(hora);
    data.setMinutes(minuto + duracaoServico);

    const horaFinal = String(data.getHours()).padStart(2, "0");
    const minutoFinal = String(data.getMinutes()).padStart(2, "0");

    return `${horaFinal}:${minutoFinal}`;
  }

  function confirmarAgendamento() {
    if (!horarioSelecionado) {
      setMensagem("Escolha um horário antes de confirmar.");
      return;
    }

    const novoAgendamento = {
      id: Date.now(),
      servicoId: id,
      horarioInicio: horarioSelecionado,
      horarioFim: calcularHorarioFinal(horarioSelecionado),
      status: "pendente",
    };

    const agendamentosSalvos =
      JSON.parse(localStorage.getItem("agendamentos")) || [];

    localStorage.setItem(
      "agendamentos",
      JSON.stringify([...agendamentosSalvos, novoAgendamento])
    );

    setMensagem("Agendamento confirmado com sucesso!");
  }

  return (
    <main className="min-h-screen bg-cyan-100 flex items-center justify-center px-4 py-10">
      <section className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <p className="text-cyan-600 font-bold text-xl tracking-wider">
            Estúdio Siqueira
          </p>

          <h1 className="text-4xl font-bold text-gray-900 mt-2">
            Escolha um horário
          </h1>

          <p className="text-gray-500 mt-2">serviço selecionado: {id}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Horários disponíveis
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {horarios.map((horario) => (
              <button
                key={horario}
                onClick={() => {
                  setHorarioSelecionado(horario);
                  setMensagem("");
                }}
                className={`rounded-2xl p-5 font-semibold transition-all duration-200 ${
                  horarioSelecionado === horario
                    ? "bg-cyan-500 text-white shadow-lg scale-105"
                    : "bg-cyan-100 text-gray-800 hover:bg-cyan-200"
                }`}
              >
                {horario} até {calcularHorarioFinal(horario)}
              </button>
            ))}
          </div>

          {horarioSelecionado && (
            <div className="mt-10 border-t pt-6 text-center">
              <p className="text-gray-500 text-sm">Horário selecionado</p>

              <p className="text-2xl font-bold text-cyan-600 mt-1">
                {horarioSelecionado} até{" "}
                {calcularHorarioFinal(horarioSelecionado)}
              </p>

              <button
                onClick={confirmarAgendamento}
                className="mt-6 bg-cyan-500 text-white px-10 py-3 rounded-full font-semibold shadow-md hover:bg-cyan-600 transition-all"
              >
                Confirmar agendamento
              </button>
            </div>
          )}

          {mensagem && (
            <p className="mt-6 text-center font-semibold text-cyan-700">
              {mensagem}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Agendamento;