import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Lock, Phone, ArrowRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

export default function Login() {
  const [, setLocation] = useLocation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [error, setError] = useState("");

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      console.log("loginMutation onSuccess:", data);
      if (data.success) {
        // Redirect to dashboard
        setLocation("/dashboard");
      }
    },
    onError: (error) => {
      console.error("loginMutation onError:", error);
      setError(error.message || "Login failed");
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    console.log("handleLogin called");
    e.preventDefault();
    setError("");

    if (!phone || !password) {
      setError("Please enter both phone number and password");
      return;
    }

    console.log("Calling loginMutation.mutate with:", { phone, password });
    loginMutation.mutate({ phone, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center px-4 py-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header with logo */}
        <div className="text-center mb-8 animate-fade-in">
          {APP_LOGO && (
            <img src={APP_LOGO} alt={APP_TITLE} className="h-16 w-16 mx-auto mb-4 rounded-xl shadow-glow" />
          )}
          <h1 className="text-4xl font-bold text-white mb-2">{APP_TITLE}</h1>
          <p className="text-emerald-400 text-sm font-medium">Investment Platform</p>
        </div>

        {/* Login form card */}
        <div className="card-premium animate-slide-up">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Error message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Phone input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 h-5 w-5 text-emerald-400" />
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-premium pl-10"
                  required
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-200">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-emerald-400" />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-premium pl-10"
                  required
                />
              </div>
            </div>

            {/* Remember password checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberPassword}
                onCheckedChange={(checked) => setRememberPassword(checked as boolean)}
                className="border-slate-500"
              />
              <label htmlFor="remember" className="text-sm text-slate-300 cursor-pointer font-medium">
                Remember password
              </label>
            </div>

            {/* Login button */}
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loginMutation.isPending ? "Logging in..." : (
                <>
                  Log in
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Footer links */}
          <div className="mt-8 pt-6 border-t border-slate-700/50 space-y-4 text-center">
            <div>
              <span className="text-slate-400 text-sm">New user? </span>
              <Link to="/register" className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors">
                Create account
              </Link>
            </div>
            <button className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors">
              Forgot password?
            </button>
          </div>
        </div>

        {/* Language selector */}
        <div className="mt-6 text-center">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200">
            English
          </button>
        </div>
      </div>
    </div>
  );
}
