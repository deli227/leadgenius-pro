import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { LeadsExport } from "../leads/LeadsExport"
import { Lead } from "@/types/leads"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useNavigate } from "react-router-dom"

interface DashboardHeaderProps {
  exportLeads: Lead[]
}

export function DashboardHeader({ exportLeads }: DashboardHeaderProps) {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      // First check if we have a session
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        // If no session, just redirect to auth
        navigate('/auth')
        return
      }

      // Attempt to sign out
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      // Only navigate after successful logout
      navigate('/auth')
    } catch (error) {
      console.error('Error logging out:', error)
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion.",
      })
    }
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 md:mb-8">
      <div className="space-y-2 w-full md:w-auto">
        <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary-light via-primary to-accent bg-clip-text text-transparent">
          Tableau de bord
        </h1>
        <p className="text-sm md:text-base text-primary-light/70">
          Gérez et analysez vos leads en temps réel
        </p>
      </div>
      <div className="flex gap-2 md:gap-4 items-center w-full md:w-auto justify-end">
        <LeadsExport leads={exportLeads} />
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="bg-gradient-to-r from-primary/20 to-primary-dark/20 text-primary-light border-primary-light/20 hover:bg-primary/30 hover:text-white transition-all duration-300"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Déconnexion</span>
        </Button>
      </div>
    </div>
  )
}