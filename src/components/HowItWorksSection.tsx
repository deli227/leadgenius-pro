import { motion } from "framer-motion";
import { Target, Search, BarChart3, Download, Zap } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jour 1', clients: 1 },
  { name: 'Jour 2', clients: 2 },
  { name: 'Jour 3', clients: 3 },
  { name: 'Jour 4', clients: 3 },
  { name: 'Jour 5', clients: 5 },
  { name: 'Jour 6', clients: 6 },
  { name: 'Jour 7', clients: 8 },
  { name: 'Jour 8', clients: 9 },
  { name: 'Jour 9', clients: 11 },
  { name: 'Jour 10', clients: 12 },
];

const steps = [
  {
    icon: Target,
    title: "Définissez Votre Cible",
    description: "Entrez le pays et la ville dans laquelle vous souhaitez rechercher des leads, puis précisez le nombre de leads que vous souhaitez obtenir."
  },
  {
    icon: Search,
    title: "Lancez Votre Recherche",
    description: "En quelques secondes seulement, LeadGen Pro analyse les données et vous fournit une liste de leads qualifiés, comprenant toutes les informations essentielles sur chaque prospect."
  },
  {
    icon: BarChart3,
    title: "Analysez Vos Leads",
    description: "Découvrez les points forts et points faibles de chaque lead, avec des recommandations stratégiques et des insights détaillés pour optimiser vos actions commerciales."
  },
  {
    icon: Download,
    title: "Exportez Vos Leads",
    description: "Une fois vos leads soigneusement sélectionnés et analysés, exportez-les facilement au format de votre choix pour les intégrer à vos outils ou campagnes existantes."
  },
  {
    icon: Zap,
    title: "Automatisation à Venir",
    description: "Nous travaillons sur une fonctionnalité d'automatisation complète qui vous permettra d'intégrer encore plus rapidement vos leads qualifiés dans vos flux de travail."
  }
];

export const HowItWorksSection = () => {
  return (
    <div className="bg-gradient-to-b from-black via-secondary-dark to-secondary-dark py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white sm:text-5xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4 sm:mb-6">
            Découvrez Comment Fonctionne LeadGen Pro
          </h2>
          <p className="text-base sm:text-lg leading-7 sm:leading-8 text-gray-300">
            Avec LeadGen Pro, la génération de leads qualifiés devient simple, rapide et ultra-efficace. Voici comment notre solution fonctionne étape par étape :
          </p>
        </motion.div>

        <div className="mx-auto mt-8 sm:mt-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Steps Section */}
            <div className="space-y-8 sm:space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative flex items-start group"
                >
                  <div className="shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 ring-2 ring-primary/20 transform transition-all group-hover:scale-110 shadow-[0_0_15px_rgba(155,135,245,0.3)] group-hover:shadow-[0_0_25px_rgba(155,135,245,0.6)]">
                      <step.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                  </div>
                  <div className="ml-4 sm:ml-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-sm sm:text-base text-gray-300">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Graph Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative bg-secondary-dark/50 rounded-xl p-4 sm:p-6 ring-2 ring-primary/20"
              style={{ height: '500px' }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 text-center">
                Progression Moyenne d'Acquisition Clients
              </h3>
              <div className="w-full h-[calc(100%-4rem)]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={data} 
                    margin={{ 
                      top: 20, 
                      right: 20, 
                      left: 0, 
                      bottom: 60 
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#9CA3AF"
                      tick={{ 
                        fontSize: '12px',
                        fill: '#9CA3AF',
                      }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      interval={0}
                      padding={{ left: 10, right: 10 }}
                    />
                    <YAxis 
                      stroke="#9CA3AF"
                      tick={{ 
                        fontSize: '12px',
                        fill: '#9CA3AF',
                      }}
                      width={40}
                      padding={{ top: 20, bottom: 20 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '0.5rem',
                        fontSize: '12px',
                        padding: '8px 12px',
                      }}
                      labelStyle={{ color: '#9CA3AF', marginBottom: '4px' }}
                      formatter={(value) => [`${value} clients acquis`, 'Clients']}
                    />
                    <Line
                      type="monotone"
                      dataKey="clients"
                      name="Clients Acquis"
                      stroke="#9b87f5"
                      strokeWidth={3}
                      dot={{ 
                        fill: '#9b87f5', 
                        strokeWidth: 2,
                        r: 4,
                      }}
                      activeDot={{
                        r: 6,
                        stroke: '#9b87f5',
                        strokeWidth: 2,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
