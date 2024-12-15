import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { NewAutomationForm } from "./NewAutomationForm"
import { AutomationList } from "./AutomationList"
import { toast } from "sonner"

export function EmailAutomationTab() {
  const { data: automations, refetch } = useQuery({
    queryKey: ['email-automations'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('email_automations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    }
  })

  const handleSendEmails = async (automationId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-automated-emails', {
        body: { automation_id: automationId }
      })

      if (error) throw error

      toast.success("Emails envoyés avec succès")
      refetch()
    } catch (error) {
      console.error('Error sending emails:', error)
      toast.error("Erreur lors de l'envoi des emails")
    }
  }

  return (
    <div className="space-y-6 p-4 bg-gradient-to-br from-black/80 to-secondary-dark/80 rounded-xl border border-primary/10">
      <NewAutomationForm onSuccess={refetch} />
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-primary-light">Automatisations existantes</h3>
        <AutomationList 
          automations={automations} 
          onUpdate={refetch}
          onSendEmails={handleSendEmails}
        />
      </div>
    </div>
  )
}