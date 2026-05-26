import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  AlertCircleIcon,
  CalendarDaysIcon,
  Clock3Icon,
  DollarSignIcon,
  ScissorsIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts'
import {
  getDashboardAgendamentosReceita,
  getDashboardMetricas,
  getDashboardOcupacaoHorarios,
  getDashboardServicosPopulares,
  getDashboardStatusAgendamentos,
} from '@/services/api'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'

const PIE_OPACITIES = [1, 0.78, 0.58, 0.38]

const STATUS_LABELS = {
  AGENDADO: 'Agendado',
  EM_ATENDIMENTO: 'Em atendimento',
  FINALIZADO: 'Finalizado',
  CANCELADO: 'Cancelado',
}

function slugify(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function formatCurrency(value, currency = 'BRL') {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(value)
}

function formatShortDate(isoDate) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  }).format(new Date(`${isoDate}T00:00:00`))
}

function MetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="gap-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-24" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function ChartSkeleton({ className }) {
  return (
    <Card className={className}>
      <CardHeader className="gap-3">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-56" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[260px] w-full" />
      </CardContent>
    </Card>
  )
}

function ChartError({ title, message, className }) {
  return (
    <Card className={className}>
      <CardContent>
        <Alert>
          <AlertCircleIcon />
          <AlertDescription>
            <strong>{title}</strong> {message}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

function PieLegend({ items }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div
          key={item.key}
          className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2 text-sm"
        >
          <div className="flex items-center gap-2">
            <span
              className="size-2 rounded-full bg-primary"
              style={{ opacity: item.opacity }}
            />
            <span>{item.label}</span>
          </div>
          <span className="font-medium text-foreground">{item.quantidade}</span>
        </div>
      ))}
    </div>
  )
}

export default function DashboardCharts({ filters, isRangeValid }) {
  const metricsQuery = useQuery({
    queryKey: ['dashboard', 'metricas', filters],
    queryFn: () => getDashboardMetricas(filters),
    enabled: isRangeValid,
  })

  const timelineQuery = useQuery({
    queryKey: ['dashboard', 'agendamentos-receita', filters],
    queryFn: () => getDashboardAgendamentosReceita(filters),
    enabled: isRangeValid,
  })

  const popularServicesQuery = useQuery({
    queryKey: ['dashboard', 'servicos-populares', filters],
    queryFn: () => getDashboardServicosPopulares(filters),
    enabled: isRangeValid,
  })

  const statusQuery = useQuery({
    queryKey: ['dashboard', 'status-agendamentos', filters],
    queryFn: () => getDashboardStatusAgendamentos(filters),
    enabled: isRangeValid,
  })

  const occupancyQuery = useQuery({
    queryKey: ['dashboard', 'ocupacao-horarios', filters],
    queryFn: () => getDashboardOcupacaoHorarios(filters),
    enabled: isRangeValid,
  })

  useEffect(() => {
    if (metricsQuery.error) toast.error('Falha ao carregar as métricas.')
  }, [metricsQuery.error])

  useEffect(() => {
    if (timelineQuery.error) toast.error('Falha ao carregar a evolução de agendamentos e receita.')
  }, [timelineQuery.error])

  useEffect(() => {
    if (popularServicesQuery.error) toast.error('Falha ao carregar os serviços populares.')
  }, [popularServicesQuery.error])

  useEffect(() => {
    if (statusQuery.error) toast.error('Falha ao carregar os status de agendamentos.')
  }, [statusQuery.error])

  useEffect(() => {
    if (occupancyQuery.error) toast.error('Falha ao carregar a ocupação por horário.')
  }, [occupancyQuery.error])

  if (!isRangeValid) {
    return (
      <Alert>
        <AlertCircleIcon />
        <AlertDescription>
          <strong>Período inválido.</strong> A data inicial deve ser menor ou igual à data final.
        </AlertDescription>
      </Alert>
    )
  }

  // --- Métricas ---
  const metricCards = metricsQuery.data
    ? [
        {
          key: 'agendamentosSemana',
          icon: CalendarDaysIcon,
          title: 'Agendamentos da semana',
          value: String(metricsQuery.data.agendamentosSemana.valor),
          description: `${metricsQuery.data.agendamentosSemana.variacaoPercentual >= 0 ? '+' : ''}${metricsQuery.data.agendamentosSemana.variacaoPercentual}% em relação ao período anterior`,
        },
        {
          key: 'taxaConfirmacao',
          icon: Clock3Icon,
          title: 'Taxa de confirmação',
          value: `${metricsQuery.data.taxaConfirmacao.valor}%`,
          description: metricsQuery.data.taxaConfirmacao.descricao,
        },
        {
          key: 'receitaPrevista',
          icon: DollarSignIcon,
          title: 'Receita prevista',
          value: formatCurrency(
            metricsQuery.data.receitaPrevista.valor,
            metricsQuery.data.receitaPrevista.moeda,
          ),
          description: 'Cancelados excluídos do cálculo.',
        },
        {
          key: 'servicoLider',
          icon: ScissorsIcon,
          title: 'Serviço líder',
          value: metricsQuery.data.servicoLider.nome,
          description: `${metricsQuery.data.servicoLider.quantidade} agendamentos no período`,
        },
      ]
    : []

  // --- Timeline ---
  const timelineData = (timelineQuery.data?.itens ?? []).map((item) => ({
    ...item,
    label: formatShortDate(item.data),
  }))

  const timelineConfig = {
    agendamentos: { label: 'Agendamentos', color: 'var(--primary)' },
    receita: { label: 'Receita', color: 'var(--primary)' },
  }

  // --- Serviços Populares ---
  const popularServicesData = [...(popularServicesQuery.data?.itens ?? [])]
    .sort((a, b) => b.quantidade - a.quantidade)
    .map((item, i) => ({
      key: slugify(item.categoria),
      label: item.categoria,
      quantidade: item.quantidade,
      opacity: PIE_OPACITIES[i % PIE_OPACITIES.length],
    }))

  const popularServicesConfig = popularServicesData.reduce((acc, item) => {
    acc[item.key] = { label: item.label, color: 'var(--primary)' }
    return acc
  }, {})

  // --- Status ---
  const statusData = (statusQuery.data?.itens ?? []).map((item, i) => ({
    key: slugify(item.status),
    label: STATUS_LABELS[item.status] ?? item.status,
    quantidade: item.quantidade,
    opacity: PIE_OPACITIES[i % PIE_OPACITIES.length],
  }))

  const statusConfig = statusData.reduce((acc, item) => {
    acc[item.key] = { label: item.label, color: 'var(--primary)' }
    return acc
  }, {})

  // --- Ocupação ---
  const occupancyData = occupancyQuery.data?.itens ?? []
  const occupancyConfig = {
    ocupacaoPercentual: { label: 'Ocupação (%)', color: 'var(--primary)' },
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Métricas */}
      {metricsQuery.isLoading ? (
        <MetricsSkeleton />
      ) : metricsQuery.isError ? (
        <ChartError
          title="Não foi possível carregar as métricas."
          message="Verifique a disponibilidade da API."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metricCards.map(({ key, icon: Icon, title, value, description }) => (
            <Card key={key}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <CardDescription>{title}</CardDescription>
                    <CardTitle className="text-2xl">{value}</CardTitle>
                  </div>
                  <div className="rounded-lg border bg-muted p-2 text-muted-foreground">
                    <Icon className="size-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Agendamentos e Receita + Serviços Populares */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {timelineQuery.isLoading ? (
          <ChartSkeleton className="xl:col-span-2" />
        ) : timelineQuery.isError ? (
          <ChartError
            className="xl:col-span-2"
            title="Falha ao carregar a série temporal."
            message="A rota de agendamentos e receita não retornou dados válidos."
          />
        ) : (
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>Agendamentos e Receita</CardTitle>
              <CardDescription>Evolução diária do período selecionado.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={timelineConfig} className="h-[280px] w-full">
                <AreaChart data={timelineData}>
                  <defs>
                    <linearGradient id="gradAgendamentos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-agendamentos)" stopOpacity={0.32} />
                      <stop offset="95%" stopColor="var(--color-agendamentos)" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="gradReceita" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-receita)" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="var(--color-receita)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        indicator="dot"
                        labelFormatter={(_, payload) => payload?.[0]?.payload?.data ?? ''}
                        formatter={(value, name) =>
                          name === 'receita'
                            ? [formatCurrency(Number(value)), 'Receita']
                            : [String(value), 'Agendamentos']
                        }
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="receita"
                    stroke="var(--color-receita)"
                    strokeOpacity={0.55}
                    fill="url(#gradReceita)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="agendamentos"
                    stroke="var(--color-agendamentos)"
                    fill="url(#gradAgendamentos)"
                    strokeWidth={2.4}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}

        {popularServicesQuery.isLoading ? (
          <ChartSkeleton />
        ) : popularServicesQuery.isError ? (
          <ChartError
            title="Falha ao carregar os serviços populares."
            message="A API não retornou dados para o período selecionado."
          />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Serviços Populares</CardTitle>
              <CardDescription>Distribuição por categoria no período.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <ChartContainer config={popularServicesConfig} className="mx-auto h-[200px] w-full max-w-[240px]">
                  <PieChart>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          nameKey="key"
                          hideLabel
                          formatter={(value, _, item) => [String(value), item.payload.label]}
                        />
                      }
                    />
                    <Pie
                      data={popularServicesData}
                      dataKey="quantidade"
                      nameKey="key"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                    >
                      {popularServicesData.map((item) => (
                        <Cell key={item.key} fill="var(--primary)" fillOpacity={item.opacity} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
                <PieLegend items={popularServicesData} />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Status dos Agendamentos + Ocupação por Horário */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {statusQuery.isLoading ? (
          <ChartSkeleton />
        ) : statusQuery.isError ? (
          <ChartError
            title="Falha ao carregar os status."
            message="A API não retornou a distribuição de status para o período selecionado."
          />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Status dos Agendamentos</CardTitle>
              <CardDescription>Distribuição por status no período.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <ChartContainer config={statusConfig} className="mx-auto h-[200px] w-full max-w-[240px]">
                  <PieChart>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          nameKey="key"
                          hideLabel
                          formatter={(value, _, item) => [String(value), item.payload.label]}
                        />
                      }
                    />
                    <Pie
                      data={statusData}
                      dataKey="quantidade"
                      nameKey="key"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                    >
                      {statusData.map((item) => (
                        <Cell key={item.key} fill="var(--primary)" fillOpacity={item.opacity} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
                <PieLegend items={statusData} />
              </div>
            </CardContent>
          </Card>
        )}

        {occupancyQuery.isLoading ? (
          <ChartSkeleton />
        ) : occupancyQuery.isError ? (
          <ChartError
            title="Falha ao carregar a ocupação por horário."
            message="A API não retornou os dados de ocupação para o período selecionado."
          />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Ocupação por Horário</CardTitle>
              <CardDescription>Percentual de ocupação entre 08:00 e 20:00.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={occupancyConfig} className="h-[260px] w-full">
                <BarChart data={occupancyData} barSize={24}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="hora" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    domain={[0, 100]}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        indicator="dot"
                        formatter={(value) => [`${value}%`, 'Ocupação']}
                        hideLabel
                      />
                    }
                  />
                  <Bar
                    dataKey="ocupacaoPercentual"
                    fill="var(--color-ocupacaoPercentual)"
                    radius={6}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}
      </div>

    </div>
  )
}
