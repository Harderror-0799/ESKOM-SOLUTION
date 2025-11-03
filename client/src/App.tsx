import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductPurchase from "./pages/ProductPurchase";
import Invite from "./pages/Invite";
import MyProfile from "./pages/MyProfile";
import Recharge from "./pages/Recharge";
import { useAuth } from "./_core/hooks/useAuth";
import { Home, ShoppingBag, Gift, Users, User } from "lucide-react";

function BottomNav() {
  const [location] = useLocation();

  const isAuthPage = location === "/login" || location === "/register";
  if (isAuthPage) return null;

  const navItems = [
    { path: "/dashboard", label: "Home", icon: Home },
    { path: "/products", label: "Product", icon: ShoppingBag },
    { path: "/vip", label: "VIP", icon: Gift },
    { path: "/invite", label: "Invite", icon: Users },
    { path: "/profile", label: "My", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-800/80 backdrop-blur-xl border-t border-slate-700/50 px-2 py-2 flex justify-around items-center">
      {navItems.map(({ path, label, icon: Icon }) => (
        <a
          key={path}
          href={path}
          className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
            location === path
              ? "text-emerald-400"
              : "text-slate-400 hover:text-emerald-400"
          }`}
        >
          <Icon className="h-6 w-6" />
          <span className="text-xs font-semibold">{label}</span>
        </a>
      ))}
    </div>
  );
}

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/products" component={() => <ProtectedRoute component={Products} />} />
      <Route path="/product/:id" component={() => <ProtectedRoute component={ProductPurchase} />} />
      <Route path="/invite" component={() => <ProtectedRoute component={Invite} />} />
      <Route path="/profile" component={() => <ProtectedRoute component={MyProfile} />} />
      <Route path="/recharge" component={() => <ProtectedRoute component={Recharge} />} />
      
      {/* Placeholder routes for other features */}
      <Route path="/vip" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/withdraw" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/fund-record" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/team" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/application" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/customer-service" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/withdrawal-record" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/team-income" component={() => <ProtectedRoute component={Dashboard} />} />
      
      <Route path={"/"} component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
          <BottomNav />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
