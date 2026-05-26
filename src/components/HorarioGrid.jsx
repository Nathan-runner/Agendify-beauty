export default function HorarioGrid({ horarios, horarioSelecionado, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
      {horarios.map((horario) => {
        const hora = typeof horario === 'string' ? horario : horario.horarioFormatado
        const dataIso = typeof horario === 'string' ? horario : horario.dataHoraIso
        const isSelected =
          horarioSelecionado === hora || horarioSelecionado === dataIso

        return (
          <button
            key={dataIso}
            onClick={() => onSelect(dataIso)}
            className={`rounded-lg px-3 py-3 text-sm font-medium transition-all sm:px-4 ${
              isSelected
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            }`}
          >
            {hora}
          </button>
        )
      })}
    </div>
  )
}
