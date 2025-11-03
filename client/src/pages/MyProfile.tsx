import { APP_LOGO, APP_TITLE } from "@/const";
import { Button } from "@/components/ui/button";
import { User, Phone, Mail, LogOut, CreditCard, History } from "lucide-react";

export default function MyProfile() {
  const userProfile = {
    name: "John Doe",
    phone: "+27 123 456 7890",
    email: "john@example.com",
    balance: 50000,
    totalInvested: 120000,
    teamEarnings: 15000,
    vipLevel: 2,
    invitationCode: "JOHN2024",
    joinDate: "2024-01-15",
  };

  const handleLogout = () => {
    // TODO: Implement actual logout
    alert("Logged out successfully");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-24">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {APP_LOGO && <img src={APP_LOGO} alt={APP_TITLE} className="h-10 w-10 rounded-lg" />}
            <div>
              <h1 className="text-xl font-bold text-white">{APP_TITLE}</h1>
              <p className="text-xs text-slate-400">My Profile</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container py-8">
        {/* Profile header */}
        <div className="card-premium mb-8 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{userProfile.name}</h2>
              <p className="text-slate-400">VIP Level {userProfile.vipLevel}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
              <p className="text-slate-400 text-sm mb-1">Account Balance</p>
              <p className="text-xl font-bold text-emerald-400">R{userProfile.balance.toLocaleString()}</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
              <p className="text-slate-400 text-sm mb-1">Total Invested</p>
              <p className="text-xl font-bold text-blue-400">R{userProfile.totalInvested.toLocaleString()}</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
              <p className="text-slate-400 text-sm mb-1">Team Earnings</p>
              <p className="text-xl font-bold text-purple-400">R{userProfile.teamEarnings.toLocaleString()}</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
              <p className="text-slate-400 text-sm mb-1">Member Since</p>
              <p className="text-xl font-bold text-orange-400">{userProfile.joinDate}</p>
            </div>
          </div>
        </div>

        {/* Contact information */}
        <div className="card-premium mb-8 animate-slide-up">
          <h3 className="text-lg font-bold text-white mb-6">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
              <Phone className="h-5 w-5 text-emerald-400" />
              <div>
                <p className="text-slate-400 text-sm">Phone Number</p>
                <p className="text-white font-semibold">{userProfile.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
              <Mail className="h-5 w-5 text-emerald-400" />
              <div>
                <p className="text-slate-400 text-sm">Email Address</p>
                <p className="text-white font-semibold">{userProfile.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Referral code */}
        <div className="card-premium mb-8 animate-slide-up">
          <h3 className="text-lg font-bold text-white mb-6">Referral Code</h3>
          <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg border border-emerald-500/50">
            <div className="flex-1">
              <p className="text-slate-400 text-sm mb-2">Your Invitation Code</p>
              <p className="text-2xl font-bold text-emerald-400">{userProfile.invitationCode}</p>
            </div>
            <Button className="btn-secondary">
              Copy Code
            </Button>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Button className="btn-primary h-14 flex items-center justify-center gap-2">
            <CreditCard className="h-5 w-5" />
            Recharge Account
          </Button>
          <Button className="btn-secondary h-14 flex items-center justify-center gap-2">
            <History className="h-5 w-5" />
            Transaction History
          </Button>
        </div>

        {/* Logout button */}
        <Button
          onClick={handleLogout}
          className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
