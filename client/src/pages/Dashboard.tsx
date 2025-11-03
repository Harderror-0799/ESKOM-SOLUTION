import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Wallet, Users, Zap, Download, MessageCircle, LogOut } from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  // Mock profile data
  const profile = {
    balance: 5000000,
    teamEarnings: 1500000,
    points: 3,
    vipLevel: 2,
  };

  const handleLogout = async () => {
    await logout();
    setLocation("/login");
  };

  const vipLevel = profile?.vipLevel || 0;
  const nextVipCost = 3000000;
  const spentAmount = profile?.balance || 0;
  const progressPercentage = Math.min((spentAmount / nextVipCost) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-24">
      {/* Header with logout */}
      <div className="sticky top-0 z-40 bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 px-4 py-4 flex justify-between items-center">
        <h1 className="text-white font-bold text-lg">ESKOM SOLUTION</h1>
        <button
          onClick={handleLogout}
          className="text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* VIP Level Card */}
        <Card className="bg-gradient-to-r from-teal-600 to-teal-700 border-0 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span className="text-sm font-semibold">VIP {vipLevel}</span>
            </div>
            <span className="text-xs text-teal-100">
              To upgrade to the next VIP level, you need to spend R {(nextVipCost / 100).toFixed(2)}
            </span>
          </div>
          <div className="w-full bg-teal-800/50 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-400 h-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-slate-800/50 border-slate-700/50 p-4 text-center">
            <div className="text-emerald-400 text-2xl font-bold">
              {profile ? (profile.balance / 100).toFixed(2) : "0.00"}
            </div>
            <div className="text-slate-400 text-xs mt-1">Balance (R)</div>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700/50 p-4 text-center">
            <div className="text-yellow-400 text-2xl font-bold">
              {profile ? (profile.teamEarnings / 100).toFixed(2) : "0.00"}
            </div>
            <div className="text-slate-400 text-xs mt-1">Team (R)</div>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700/50 p-4 text-center">
            <div className="text-emerald-400 text-2xl font-bold">
              {profile?.points || 0}
            </div>
            <div className="text-slate-400 text-xs mt-1">Points</div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => setLocation("/recharge")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-6 rounded-lg flex flex-col items-center space-y-2"
          >
            <Wallet className="h-6 w-6" />
            <span>Recharge</span>
          </Button>
          <Button
            onClick={() => setLocation("/withdraw")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-6 rounded-lg flex flex-col items-center space-y-2"
          >
            <Wallet className="h-6 w-6" />
            <span>Withdraw</span>
          </Button>
          <Button
            onClick={() => setLocation("/fund-record")}
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-6 rounded-lg flex flex-col items-center space-y-2"
          >
            <Zap className="h-6 w-6" />
            <span>Fund Record</span>
          </Button>
          <Button
            onClick={() => setLocation("/team")}
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-6 rounded-lg flex flex-col items-center space-y-2"
          >
            <Users className="h-6 w-6" />
            <span>My Team</span>
          </Button>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          <Button
            onClick={() => setLocation("/application")}
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50"
          >
            <Download className="h-5 w-5 mr-3" />
            <span>Application</span>
          </Button>
          <Button
            onClick={() => setLocation("/customer-service")}
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50"
          >
            <MessageCircle className="h-5 w-5 mr-3" />
            <span>Customer service</span>
          </Button>
          <Button
            onClick={() => setLocation("/withdrawal-record")}
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50"
          >
            <Wallet className="h-5 w-5 mr-3" />
            <span>Withdrawal Record</span>
          </Button>
          <Button
            onClick={() => setLocation("/team-income")}
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50"
          >
            <Users className="h-5 w-5 mr-3" />
            <span>Team Income Record</span>
          </Button>
          <Button
            onClick={() => setLocation("/invite")}
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50"
          >
            <Users className="h-5 w-5 mr-3" />
            <span>Invite Friend</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
