import { useMemo, useState } from 'react'
import DashboardCharts from '@/components/DashboardCharts'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { Input } from '@/components/ui/input'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

function formatDateInput(date) {
  return date.toISOString().split('T')[0]
}

function getDefaultDateRange() {
  const dataFim = new Date()
  const dataInicio = new Date()
  dataInicio.setDate(dataFim.getDate() - 6)
  return {
    dataInicio: formatDateInput(dataInicio),
    dataFim: formatDateInput(dataFim),
  }
}

export default function Dashboard() {
  const defaultDates = useMemo(() => getDefaultDateRange(), [])
  const [filters, setFilters] = useState({
    dataInicio: defaultDates.dataInicio,
    dataFim: defaultDates.dataFim,
  })

  const dashboardFilters = {
    dataInicio: filters.dataInicio,
    dataFim: filters.dataFim,
  }

  const isRangeValid = filters.dataInicio <= filters.dataFim

  return (
    <SidebarProvider
      style={{
        '--sidebar-width': '18rem',
        '--header-height': '4rem',
      }}
    >
      <AppSidebar />
      <SidebarInset className="bg-background">
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="px-6 py-8">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                    Painel de Indicadores
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Ajuste o período e o profissional para atualizar todos os dados em tempo real.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="dataInicio">
                      Data inicial
                    </label>
                    <Input
                      id="dataInicio"
                      type="date"
                      value={filters.dataInicio}
                      max={filters.dataFim}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, dataInicio: e.target.value }))
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="dataFim">
                      Data final
                    </label>
                    <Input
                      id="dataFim"
                      type="date"
                      value={filters.dataFim}
                      min={filters.dataInicio}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, dataFim: e.target.value }))
                      }
                    />
                  </div>
                </div>
              </div>

              <DashboardCharts filters={dashboardFilters} isRangeValid={isRangeValid} />

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
