import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Lock, Phone, User, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Register() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    try {
      if (!phone || !password || !confirmPassword) {
        setError("Please fill in all required fields");
        setIsLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        setIsLoading(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
          <p className="text-emerald-400 text-sm font-medium">Create Your Account</p>
        </div>

        {/* Registration form card */}
        <div className="card-premium animate-slide-up">
          {success ? (
            <div className="text-center py-8">
              <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-lg p-4 mb-4">
                <p className="text-emerald-400 font-semibold">Account created successfully!</p>
                <p className="text-slate-300 text-sm mt-2">Redirecting to login...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
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
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-premium pl-10"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-200">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-emerald-400" />
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="input-premium pl-10"
                    required
                  />
                </div>
              </div>

              {/* Invite Code input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-200">
                  Invite Code (Optional)
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-emerald-400" />
                  <Input
                    type="text"
                    placeholder="Enter invite code if you have one"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value)}
                    className="input-premium pl-10"
                  />
                </div>
              </div>

              {/* Register button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {isLoading ? "Creating account..." : (
                  <>
                    Create Account
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          )}

          {!success && (
            <>
              {/* Footer link to login */}
              <div className="mt-8 pt-6 border-t border-slate-700/50 text-center">
                <span className="text-slate-400 text-sm">Already have an account? </span>
                <Link to="/login" className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors">
                  Log in
                </Link>
              </div>
            </>
          )}
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
