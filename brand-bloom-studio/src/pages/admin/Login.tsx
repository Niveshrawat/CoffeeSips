import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password });
      localStorage.setItem("adminToken", data.token);
      navigate("/admin/blogs");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 font-body">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-secondary/30 backdrop-blur-xl p-10 rounded-[2rem] border border-border shadow-warm">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center px-4 py-2.5 mb-6 rounded-2xl bg-white/95 backdrop-blur-md shadow-sm border border-white/20">
            <img src="/logo.png" alt="Coffeesips" className="h-12 w-auto" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground">Admin Portal</h1>
          <p className="text-muted-foreground text-sm mt-2">Sign in to manage your wealth-creation stories.</p>
        </div>
        
        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 text-sm text-center font-medium animate-pulse">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-2">Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-background/50 border border-border rounded-xl p-4 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-muted-foreground/50" placeholder="admin@coffeesips.in" />
          </div>
          <div>
            <label className="block text-sm text-muted-foreground font-semibold uppercase tracking-wider mb-2">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-background/50 border border-border rounded-xl p-4 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all placeholder:text-muted-foreground/50" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground font-bold text-lg py-4 rounded-xl hover:bg-coffee-warm transition-transform active:scale-95 hover:shadow-lg mt-4">Provide Access</button>
        </form>
      </motion.div>
    </div>
  );
};
export default Login;
