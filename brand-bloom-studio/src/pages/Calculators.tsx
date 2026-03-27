import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

const Calculators = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  const totalInvestment = monthlyInvestment * 12 * timePeriod;
  const estimatedReturns = Math.round(monthlyInvestment * ((Math.pow(1 + (expectedReturn/100)/12, timePeriod * 12) - 1) / ((expectedReturn/100)/12)) * (1 + (expectedReturn/100)/12)) - totalInvestment;
  const totalValue = totalInvestment + estimatedReturns;

  const data = [
    { name: "Total Investment", value: totalInvestment },
    { name: "Estimated Returns", value: estimatedReturns },
  ];
  const COLORS = ["#d4a373", "#7f5539"]; 

  return (
    <div className="min-h-screen bg-gradient-beige theme-beige flex flex-col">
      <Navbar />
      <div className="flex-1 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">SIP <span className="text-gradient-gold">Calculator</span></h1>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">Calculate your potential wealth creation through disciplined systematic investment plans. Start early, invest small, play consistent.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-secondary/30 p-8 rounded-3xl border border-border shadow-warm">
          {/* Controls */}
          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-4">
                <label className="font-medium">Monthly Investment</label>
                <div className="bg-background border border-border px-4 py-1 rounded-full text-gold font-bold">₹{monthlyInvestment.toLocaleString()}</div>
              </div>
              <input type="range" min="500" max="100000" step="500" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(Number(e.target.value))} className="w-full accent-gold h-2 bg-muted rounded-lg appearance-none cursor-pointer" />
            </div>
            
            <div>
              <div className="flex justify-between mb-4">
                <label className="font-medium">Expected Return Rate</label>
                <div className="bg-background border border-border px-4 py-1 rounded-full text-gold font-bold">{expectedReturn}%</div>
              </div>
              <input type="range" min="1" max="30" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full accent-gold h-2 bg-muted rounded-lg appearance-none cursor-pointer" />
            </div>

            <div>
              <div className="flex justify-between mb-4">
                <label className="font-medium">Time Period (Years)</label>
                <div className="bg-background border border-border px-4 py-1 rounded-full text-gold font-bold">{timePeriod} Yr</div>
              </div>
              <input type="range" min="1" max="40" step="1" value={timePeriod} onChange={(e) => setTimePeriod(Number(e.target.value))} className="w-full accent-gold h-2 bg-muted rounded-lg appearance-none cursor-pointer" />
            </div>

            <div className="pt-8 border-t border-border grid grid-cols-2 gap-6">
               <div className="bg-background/50 p-4 rounded-2xl border border-border/50">
                 <p className="text-muted-foreground text-sm mb-1">Invested Amount</p>
                 <p className="text-xl font-bold font-display">₹{totalInvestment.toLocaleString()}</p>
               </div>
               <div className="bg-background/50 p-4 rounded-2xl border border-border/50">
                 <p className="text-muted-foreground text-sm mb-1">Est. Returns</p>
                 <p className="text-xl font-bold font-display text-[#d4a373]">₹{estimatedReturns.toLocaleString()}</p>
               </div>
               <div className="col-span-2 bg-coffee-warm/10 p-6 rounded-2xl border border-coffee-warm/20 text-center">
                 <p className="text-muted-foreground text-sm mb-2">Total Value</p>
                 <p className="text-4xl font-bold font-display text-gradient-gold">₹{totalValue.toLocaleString()}</p>
               </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-[400px] lg:h-full flex items-center justify-center relative bg-background/30 rounded-2xl border border-border/50">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={100} outerRadius={150} paddingAngle={2} dataKey="value" stroke="none">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => `₹${value.toLocaleString()}`} 
                  contentStyle={{ backgroundColor: '#1a1005', borderColor: '#3d2514', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};
export default Calculators;
