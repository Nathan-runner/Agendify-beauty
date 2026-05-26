import { BriefcaseBusinessIcon, SparklesIcon } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function WelcomeBanner({ user }) {
  const saudacao = () => {
    const hora = new Date().getHours()
    if (hora < 12) return 'Bom dia'
    if (hora < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  const roleName = user.role === 'cliente' ? 'Cliente' : 'Profissional'
  const initials = user.nome
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="px-4 pt-6">
      <div className="mx-auto max-w-6xl">
        <Card className="border-border/60 bg-background/95">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    <SparklesIcon data-icon="inline-start" />
                    Painel Studio Siqueira
                  </Badge>
                  <Badge variant="secondary">{roleName}</Badge>
                </div>
                <div className="flex flex-col gap-1">
                  <CardTitle>{`${saudacao()}, ${user.nome}`}</CardTitle>
                  <CardDescription>
                    Você está logado como {roleName} e pode acessar suas principais ações pelo painel.
                  </CardDescription>
                </div>
              </div>
              <Avatar size="lg">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
              <BriefcaseBusinessIcon />
              Navegue pelas telas da aplicação usando a sidebar ou os atalhos abaixo.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
