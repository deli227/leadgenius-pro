import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Database, Mail, Phone, Globe, Search, Brain, TrendingUp } from "lucide-react";

export const DataAnalyticsSection = () => {
  // Data for the pie chart showing different types of data collection
  const data = [
    { name: "Emails", value: 30, color: "#9b87f5" },
    { name: "Téléphones", value: 25, color: "#F97316" },
    { name: "Sites Web", value: 20, color: "#7E69AB" },
    { name: "Réseaux Sociaux", value: 25, color: "#6E59A5" },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-secondary-dark to-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.6)_100%)]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl animate-pulse" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
              Données Complètes, Décisions Éclairées
            </h2>
            
            <div className="space-y-6 text-gray-300">
              <div className="flex items-start gap-4">
                <Database className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <p className="text-lg">
                  Accédez à des informations complètes sur vos leads : emails directs, numéros de téléphone, 
                  sites internet et tous leurs réseaux sociaux.
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <Brain className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <p className="text-lg">
                  Notre IA avancée scanne, analyse et identifie les meilleures opportunités pour vous 
                  en quelques secondes.
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <TrendingUp className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <p className="text-lg">
                  Prenez des décisions stratégiques en un temps record et voyez vos conversions décoller.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-[400px] w-full"
          >
            <div className="absolute inset-0 bg-secondary-dark/30 backdrop-blur-sm rounded-xl border border-primary/10 shadow-lg">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "rgba(0,0,0,0.8)", 
                      border: "1px solid rgba(155,135,245,0.2)",
                      borderRadius: "8px",
                      color: "#fff"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Icons around the chart */}
              <div className="absolute inset-0 pointer-events-none">
                <Mail className="absolute top-12 left-12 w-8 h-8 text-primary" />
                <Phone className="absolute top-12 right-12 w-8 h-8 text-accent" />
                <Globe className="absolute bottom-12 left-12 w-8 h-8 text-primary-dark" />
                <Search className="absolute bottom-12 right-12 w-8 h-8 text-primary-light" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};