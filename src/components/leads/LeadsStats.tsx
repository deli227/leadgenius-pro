import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowUpCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { plans } from "../pricing/pricingData"

interface LeadsStatsProps {
  dailyLeadsLeft: number
  monthlyLeadsLeft: number
  totalDailyLeads: number
  totalMonthlyLeads: number
  subscriptionType?: 'free' | 'pro' | 'enterprise'
}

export function LeadsStats({ 
  dailyLeadsLeft, 
  monthlyLeadsLeft, 
  totalDailyLeads, 
  totalMonthlyLeads,
  subscriptionType = 'free'
}: LeadsStatsProps) {
  const { toast } = useToast()

  const handleUpgrade = async () => {
    toast({
      title: "Fonctionnalité temporairement indisponible",
      description: "Le système de paiement sera bientôt disponible.",
      variant: "default",
    })
  }

  const upgradeOptions = plans.filter(plan => plan.type !== 'free')

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mb-8">
      <Card className="p-4 md:p-6 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300">
        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-medium text-primary-light">Leads quotidiens</h3>
          <div className="flex items-center justify-between text-xs text-primary-light/70">
            <span>Restants aujourd'hui</span>
            <span className="font-semibold text-primary-light">{dailyLeadsLeft} / {totalDailyLeads}</span>
          </div>
          <Progress value={(dailyLeadsLeft / totalDailyLeads) * 100} className="h-2 bg-primary/10" />
        </div>
      </Card>

      <Card className="p-4 md:p-6 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300">
        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-medium text-primary-light">Leads mensuels</h3>
          <div className="flex items-center justify-between text-xs text-primary-light/70">
            <span>Restants ce mois</span>
            <span className="font-semibold text-primary-light">{monthlyLeadsLeft} / {totalMonthlyLeads}</span>
          </div>
          <Progress value={(monthlyLeadsLeft / totalMonthlyLeads) * 100} className="h-2 bg-primary/10" />
        </div>
      </Card>

      {subscriptionType === 'free' && (
        <Card className="sm:col-span-2 p-4 md:p-6 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border-primary/10">
          <div className="flex flex-col space-y-6">
            <div className="text-center">
              <h3 className="text-base md:text-lg font-medium text-primary-light">Passez à un plan supérieur</h3>
              <p className="text-xs md:text-sm text-primary-light/70 mt-1">Générez plus de leads et accédez à des fonctionnalités avancées</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {upgradeOptions.map((plan) => (
                <div key={plan.type} className="flex items-center justify-between p-3 md:p-4 rounded-lg bg-gradient-to-r from-primary/5 to-primary-dark/5 hover:from-primary/10 hover:to-primary-dark/10 transition-all duration-300">
                  <div>
                    <h4 className="text-xs md:text-sm font-medium text-primary-light">{plan.name}</h4>
                    <p className="text-xs text-primary-light/70 mt-1">{plan.price}</p>
                  </div>
                  <Button
                    onClick={handleUpgrade}
                    className="bg-primary/20 hover:bg-primary/30 text-primary-light flex items-center gap-1.5 px-2 py-1.5 h-auto opacity-75"
                  >
                    <ArrowUpCircle className="h-3 w-3 flex-shrink-0" />
                    <span className="text-xs whitespace-nowrap">Bientôt</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}