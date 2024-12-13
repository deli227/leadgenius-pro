import { Button } from "@/components/ui/button";
import { Check, Infinity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface PricingPlanProps {
  name: string;
  description: string;
  price: string;
  features: string[];
  buttonText: string;
  type: string;
  popular?: boolean;
  priceId?: string;
}

export const PricingPlan = ({
  name,
  description,
  price,
  features,
  buttonText,
  type,
  popular,
  priceId,
}: PricingPlanProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      if (type === 'free') {
        navigate('/dashboard');
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer la session de paiement. Veuillez réessayer.",
      });
    }
  };

  return (
    <div
      className={`relative flex flex-col justify-between rounded-3xl bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-300 p-8 xl:p-10 transform hover:scale-105 ${
        popular ? "shadow-[0_0_30px_rgba(155,135,245,0.3)]" : ""
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1 text-sm font-semibold text-white shadow-[0_0_15px_rgba(155,135,245,0.5)]">
            Populaire
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between gap-x-4">
          <h3 className="text-lg font-semibold leading-8 text-primary-light">
            {name}
          </h3>
        </div>
        <p className="mt-4 text-sm leading-6 text-gray-300">
          {description}
        </p>
        <p className="mt-6 flex items-baseline gap-x-1">
          <span className="text-4xl font-bold tracking-tight text-white bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {price}
          </span>
          {price !== "Sur mesure" && (
            <span className="text-sm font-semibold leading-6 text-gray-300">
              /mois
            </span>
          )}
        </p>
        <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
          {features.map((feature) => (
            <li key={feature} className="flex gap-x-3">
              {feature.includes("illimit") ? (
                <Infinity className="h-6 w-5 flex-none text-primary animate-pulse" />
              ) : (
                <Check className="h-6 w-5 flex-none text-primary" />
              )}
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <Button
        onClick={handleSubscribe}
        className={`mt-8 w-full ${
          popular
            ? "bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 shadow-[0_0_15px_rgba(155,135,245,0.5)] hover:shadow-[0_0_25px_rgba(155,135,245,0.8)]"
            : "bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 hover:border-primary/40"
        } transform transition-all duration-300`}
      >
        {buttonText}
      </Button>
    </div>
  );
};