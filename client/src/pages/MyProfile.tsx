import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { LogOut, User, Globe, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function MyProfile() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [copied, setCopied] = useState(false);

  // Mock profile data
  const profile = {
    phone: "27712345678",
    balance: 5000000,
    vipLevel: 2,
    invitationCode: "85268539",
  };

  const handleLogout = async () => {
    await logout();
    setLocation("/login");
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 px-4 py-4">
        <h1 className="text-white font-bold text-lg">My Account</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* User Profile Card */}
        <Card className="bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border-emerald-500/30 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-white font-bold text-lg">{user?.name || "User"}</h2>
              <p className="text-slate-400 text-sm">{profile.phone}</p>
            </div>
          </div>
        </Card>

        {/* Account Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-slate-800/50 border-slate-700/50 p-4 text-center">
            <div className="text-emerald-400 text-2xl font-bold">
              {profile ? (profile.balance / 100).toFixed(2) : "0.00"}
            </div>
            <div className="text-slate-400 text-xs mt-2">Account Balance</div>
          </Card>
          <Card className="bg-slate-800/50 border-slate-700/50 p-4 text-center">
            <div className="text-yellow-400 text-2xl font-bold">
              VIP {profile?.vipLevel || 0}
            </div>
            <div className="text-slate-400 text-xs mt-2">VIP Level</div>
          </Card>
        </div>

        {/* Referral Code Section */}
        <Card className="bg-slate-800/50 border-slate-700/50 p-4">
          <h3 className="text-emerald-400 font-bold mb-3">My Referral Code</h3>
          <div className="flex items-center justify-between bg-slate-700/50 rounded p-3">
            <span className="text-white font-semibold font-mono">{profile.invitationCode}</span>
            <button
              onClick={() => handleCopy(profile.invitationCode)}
              className="text-slate-400 hover:text-emerald-400 transition-colors"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </Card>

        {/* Settings Section */}
        <div className="space-y-3">
          <h3 className="text-slate-300 font-semibold text-sm px-2">Settings</h3>

          <Button
            onClick={() => {}}
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50"
          >
            <Globe className="h-5 w-5 mr-3" />
            <span>Language: English</span>
          </Button>

          <Button
            onClick={() => {}}
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50"
          >
            <User className="h-5 w-5 mr-3" />
            <span>Edit Profile</span>
          </Button>
        </div>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}
