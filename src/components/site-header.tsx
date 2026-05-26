import { useLocation } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  const location = useLocation()

  const pageTitles: Record<string, string> = {
    "/": "Login",
    "/cadastro": "Cadastro",
    "/dashboard": "Dashboard",
    "/agendar": "Agendar",
    "/servicos": "Servicos",
    "/funcionario/servicos": "Servicos do Funcionario",
    "/maquiagem": "Maquiagem",
    "/cabelo": "Cabelo",
    "/estetica-facial": "Estetica Facial",
  }

  return (
    <header className="sticky top-0 z-50 flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">
          {pageTitles[location.pathname] ?? "Dashboard"}
        </h1>
      </div>
    </header>
  )
}
