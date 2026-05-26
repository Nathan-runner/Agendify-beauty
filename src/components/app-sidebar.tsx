import * as React from "react"
import { useQuery } from "@tanstack/react-query"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  BriefcaseBusinessIcon,
  CalendarPlusIcon,
  CalendarIcon,
  CommandIcon,
  UserCogIcon,
  UserIcon,
} from "lucide-react"
import { Link } from "react-router-dom"
import { getMeuPerfil } from "@/services/api"
import { getCurrentUser } from "@/config/env"

const CLIENTE_ONLY_URLS = ["/agendar", "/servicos"]
const FUNCIONARIO_ONLY_URLS = ["/dashboard", "/funcionario/servicos", "/meus-agendamentos"]

const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <CommandIcon />,
  },
  {
    title: "Agendar",
    url: "/agendar",
    icon: <CalendarPlusIcon />,
  },
  {
    title: "Servicos",
    url: "/servicos",
    icon: <BriefcaseBusinessIcon />,
  },
  {
    title: "Meus Serviços",
    url: "/funcionario/servicos",
    icon: <UserCogIcon />,
  },
  {
    title: "Meu Perfil",
    url: "/perfil",
    icon: <UserIcon />,
  },
  {
    title: "Meus Agendamentos",
    url: "/meus-agendamentos",
    icon: <CalendarIcon />,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const perfilQuery = useQuery({
    queryKey: ['meu-perfil'],
    queryFn: getMeuPerfil,
  })

  const currentUser = getCurrentUser()
  const isCliente = currentUser?.role === 'CLIENTE'
  const isFuncionario = currentUser?.role === 'FUNCIONARIO'

  const visibleNav = navMain.filter((item) => {
    if (CLIENTE_ONLY_URLS.includes(item.url)) return isCliente
    if (FUNCIONARIO_ONLY_URLS.includes(item.url)) return isFuncionario
    return true
  })

  const user = {
    name: perfilQuery.data?.nome || "Carregando...",
    email: perfilQuery.data?.email || "",
    avatar: perfilQuery.data?.foto || "",
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link to="/dashboard">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">Studio Siqueira</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain label="Principal" items={visibleNav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
