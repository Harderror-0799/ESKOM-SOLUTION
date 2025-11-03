import { APP_LOGO, APP_TITLE } from "@/const";
import { TrendingUp, Wallet, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const userBalance = 50000;
  const totalInvestments = 120000;
  const teamEarnings = 15000;
  const activeInvestments = 3;

  const stats = [
    {
      label: "Balance",
      value: `R${userBalance.toLocaleString()}`,
      icon: Wallet,
      color: "bg-emerald-500/10 border-emerald-500/50",
      textColor: "text-emerald-400",
    },
    {
      label: "Total Investments",
      value: `R${totalInvestments.toLocaleString()}`,
      icon: TrendingUp,
      color: "bg-blue-500/10 border-blue-500/50",
      textColor: "text-blue-400",
    },
    {
      label: "Team Earnings",
      value: `R${teamEarnings.toLocaleString()}`,
      icon: Users,
      color: "bg-purple-500/10 border-purple-500/50",
      textColor: "text-purple-400",
    },
    {
      label: "Active Investments",
      value: activeInvestments,
      icon: Target,
      color: "bg-orange-500/10 border-orange-500/50",
      textColor: "text-orange-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-24">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {APP_LOGO && <img src={APP_LOGO} alt={APP_TITLE} className="h-10 w-10 rounded-lg" />}
            <div>
              <h1 className="text-xl font-bold text-white">{APP_TITLE}</h1>
              <p className="text-xs text-slate-400">Investment Platform</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="container py-8">
        {/* Welcome section */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back!</h2>
          <p className="text-slate-400">Manage your investments and track your earnings</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`card-premium border ${stat.color} animate-slide-up`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-2">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.textColor} opacity-50`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Button className="btn-primary h-14 text-base">
            Browse Products
          </Button>
          <Button className="btn-secondary h-14 text-base">
            Recharge Account
          </Button>
        </div>

        {/* Recent investments */}
        <div className="card-premium">
          <h3 className="text-lg font-bold text-white mb-6">Recent Investments</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                <div>
                  <p className="text-white font-semibold">Coal Power Generator</p>
                  <p className="text-slate-400 text-sm">Investment ID: #2024{i}001</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-semibold">R{(50000 * i).toLocaleString()}</p>
                  <p className="text-slate-400 text-sm">Active</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
