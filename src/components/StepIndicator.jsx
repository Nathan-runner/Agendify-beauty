export default function StepIndicator({ etapa }) {
  const steps = [
    { numero: 1, label: 'Funcionário' },
    { numero: 2, label: 'Serviço' },
    { numero: 3, label: 'Horário' },
  ]

  return (
    <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
      {steps.map((step, index) => (
        <div key={step.numero} className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-3 sm:text-left">
            <div
              className={`flex size-10 items-center justify-center rounded-full font-bold text-sm transition sm:size-12 sm:text-lg ${
                etapa >= step.numero
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step.numero}
            </div>
            <span
              className={`text-xs font-medium sm:text-sm ${
                etapa >= step.numero ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {step.label}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div
              className={`hidden h-1 w-8 sm:block sm:w-12 ${
                etapa > step.numero ? 'bg-primary' : 'bg-muted'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
