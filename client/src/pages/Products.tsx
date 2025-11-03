import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ChevronRight, Flame } from "lucide-react";

type Category = "standard" | "travel" | "business" | "vip";

interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  totalRevenue: number;
  netIncomePerDay: number;
  validityPeriod: number;
  purchaseLimit: number;
  imageUrl: string;
  isHot: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Coal Power Generator (Standard)",
    category: "standard",
    price: 5000000,
    originalPrice: 6500000,
    totalRevenue: 15000000,
    netIncomePerDay: 310000,
    validityPeriod: 62,
    purchaseLimit: 100,
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663203179557/KHeWmEdKWWJEJYPG.jpg",
    isHot: true,
  },
  {
    id: 2,
    name: "Coal Power Generator (Premium)",
    category: "standard",
    price: 41800000,
    totalRevenue: 125000000,
    netIncomePerDay: 1390000,
    validityPeriod: 62,
    purchaseLimit: 50,
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663203179557/CxACsFHOThvUnABy.jpg",
    isHot: true,
  },
  {
    id: 3,
    name: "Power Station Investment (Small)",
    category: "travel",
    price: 18800000,
    totalRevenue: 56400000,
    netIncomePerDay: 3380000,
    validityPeriod: 48,
    purchaseLimit: 75,
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663203179557/SsORAKElQJfdZdjT.jpg",
    isHot: true,
  },
  {
    id: 4,
    name: "Renewable Energy Project",
    category: "business",
    price: 25000000,
    totalRevenue: 75000000,
    netIncomePerDay: 2500000,
    validityPeriod: 90,
    purchaseLimit: 40,
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663203179557/KHeWmEdKWWJEJYPG.jpg",
    isHot: false,
  },
  {
    id: 5,
    name: "VIP Power Grid Share",
    category: "vip",
    price: 100000000,
    totalRevenue: 300000000,
    netIncomePerDay: 10000000,
    validityPeriod: 180,
    purchaseLimit: 10,
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663203179557/CxACsFHOThvUnABy.jpg",
    isHot: true,
  },
  {
    id: 6,
    name: "Industrial Generator Package",
    category: "business",
    price: 50000000,
    totalRevenue: 150000000,
    netIncomePerDay: 5000000,
    validityPeriod: 120,
    purchaseLimit: 25,
    imageUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663203179557/SsORAKElQJfdZdjT.jpg",
    isHot: false,
  },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<Category>("standard");
  const [, setLocation] = useLocation();

  const categories: { id: Category; label: string }[] = [
    { id: "standard", label: "Standard" },
    { id: "travel", label: "Travel" },
    { id: "business", label: "Business" },
    { id: "vip", label: "VIP" },
  ];

  const filteredProducts = products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 px-4 py-4">
        <h1 className="text-white font-bold text-lg">Rental product details</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Category Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-700/50 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products List */}
        {filteredProducts.length > 0 ? (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="bg-slate-800/50 border-slate-700/50 overflow-hidden hover:border-emerald-400/50 transition-all"
              >
                <div className="p-4">
                  {/* Product Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {product.isHot && (
                          <div className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center space-x-1">
                            <Flame className="h-3 w-3" />
                            <span>Hot</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-emerald-400 font-bold text-lg">{product.name}</h3>
                    </div>
                  </div>

                  {/* Product Image */}
                  {product.imageUrl && (
                    <div className="mb-4 bg-slate-700/50 rounded-lg overflow-hidden h-32 flex items-center justify-center">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Product Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Total revenue</span>
                      <span className="text-yellow-400 font-semibold">
                        R{(product.totalRevenue / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Net income/day</span>
                      <span className="text-yellow-400 font-semibold">
                        R{(product.netIncomePerDay / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Purchase limit</span>
                      <span className="text-emerald-400 font-semibold">
                        {product.purchaseLimit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 text-sm">Validity period</span>
                      <span className="text-emerald-400 font-semibold">
                        {product.validityPeriod} day{product.validityPeriod !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                    <div className="flex items-baseline space-x-2">
                      {product.originalPrice && (
                        <span className="text-slate-400 line-through text-sm">
                          R{(product.originalPrice / 100).toFixed(2)}
                        </span>
                      )}
                      <span className="text-yellow-400 text-2xl font-bold">
                        R{(product.price / 100).toFixed(2)}
                      </span>
                    </div>
                    <Button
                      onClick={() => setLocation(`/product/${product.id}`)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-2 rounded-full flex items-center space-x-1"
                    >
                      <span>To Buy</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400">No products available in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
