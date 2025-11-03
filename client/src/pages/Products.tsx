import { APP_LOGO, APP_TITLE } from "@/const";
import { Button } from "@/components/ui/button";
import { TrendingUp, Zap } from "lucide-react";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  netIncomePerDay: number;
  validityPeriod: number;
  imageUrl: string;
  isHot: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Coal Power Generator (Standard)",
    category: "standard",
    price: 11000,
    originalPrice: 13000,
    netIncomePerDay: 3100,
    validityPeriod: 62,
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663203179557/KHeWmEdKWWJEJYPG.jpg",
    isHot: true,
  },
  {
    id: 2,
    name: "Coal Power Generator (Premium)",
    category: "standard",
    price: 41800,
    netIncomePerDay: 13900,
    validityPeriod: 62,
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663203179557/CxACsFHOThvUnABy.jpg",
    isHot: true,
  },
  {
    id: 3,
    name: "Power Station Investment (Small)",
    category: "travel",
    price: 18800,
    netIncomePerDay: 33800,
    validityPeriod: 48,
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663203179557/SsORAKElQJfdZdjT.jpg",
    isHot: true,
  },
  {
    id: 4,
    name: "Power Station Investment (Medium)",
    category: "travel",
    price: 73800,
    originalPrice: 108000,
    netIncomePerDay: 33800,
    validityPeriod: 46,
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663203179557/MaNuZwVSnqAhYECR.png",
    isHot: true,
  },
  {
    id: 5,
    name: "VIP Power Grid Share (Level 1)",
    category: "vip",
    price: 358000,
    originalPrice: 580000,
    netIncomePerDay: 72000,
    validityPeriod: 10,
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663203179557/KHeWmEdKWWJEJYPG.jpg",
    isHot: false,
  },
  {
    id: 6,
    name: "Business Power Contract (30-Day)",
    category: "business",
    price: 250000,
    originalPrice: 350000,
    netIncomePerDay: 45000,
    validityPeriod: 30,
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663203179557/CxACsFHOThvUnABy.jpg",
    isHot: false,
  },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Products" },
    { id: "standard", label: "Standard" },
    { id: "travel", label: "Travel" },
    { id: "vip", label: "VIP" },
    { id: "business", label: "Business" },
  ];

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-24">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-40">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {APP_LOGO && <img src={APP_LOGO} alt={APP_TITLE} className="h-10 w-10 rounded-lg" />}
            <div>
              <h1 className="text-xl font-bold text-white">{APP_TITLE}</h1>
              <p className="text-xs text-slate-400">Investment Products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container py-8">
        {/* Title */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-white mb-2">Investment Products</h2>
          <p className="text-slate-400">Choose from our premium power generation investments</p>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/50"
                  : "bg-slate-700/50 text-slate-300 hover:bg-slate-600/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="card-premium group overflow-hidden animate-slide-up hover:border-emerald-500/50"
            >
              {/* Image container */}
              <div className="relative mb-4 overflow-hidden rounded-lg bg-slate-700/30 h-48">
                {product.isHot && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
                    HOT
                  </div>
                )}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>

              {/* Stats */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Daily Income</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    R{product.netIncomePerDay.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Validity</span>
                  <span className="text-slate-300 font-semibold">{product.validityPeriod} days</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">R{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">R{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                {product.originalPrice && (
                  <p className="text-emerald-400 text-sm font-semibold">
                    Save R{(product.originalPrice - product.price).toLocaleString()}
                  </p>
                )}
              </div>

              {/* Button */}
              <Button className="btn-primary w-full flex items-center justify-center gap-2">
                <Zap className="h-4 w-4" />
                Invest Now
              </Button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No products found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
