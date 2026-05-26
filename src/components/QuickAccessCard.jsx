import { ArrowRightIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const badgeVariantByColor = {
  'bg-blue-600': 'default',
  'bg-purple-600': 'secondary',
  'bg-green-600': 'outline',
  'bg-pink-600': 'secondary',
}

export default function QuickAccessCard({
  titulo,
  descricao,
  Icon,
  color,
  onClick,
}) {
  const badgeVariant = badgeVariantByColor[color] ?? 'outline'

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <Badge variant={badgeVariant}>Acesso rapido</Badge>
            <CardTitle>{titulo}</CardTitle>
            <CardDescription>{descricao}</CardDescription>
          </div>
          <div className="rounded-lg border bg-muted p-2 text-muted-foreground">
            <Icon />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
          Atalho para a tela relacionada no dashboard.
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onClick}>
          <ArrowRightIcon data-icon="inline-end" />
          Acessar
        </Button>
      </CardFooter>
    </Card>
  )
}
