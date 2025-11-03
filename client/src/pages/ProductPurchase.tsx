import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { ChevronLeft, Copy, Check, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function ProductPurchase() {
  const [, setLocation] = useLocation();
  const [copied, setCopied] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  // Mock product data - replace with actual API call
  const product = {
    id: 1,
    name: "Coal Power Generator",
    price: 50000,
    imageUrl: "https://via.placeholder.com/400x300?text=Coal+Generator",
    totalRevenue: 150000,
    netIncomePerDay: 500,
    validityPeriod: 365,
    description: "High-capacity coal-powered generator for industrial use",
  };

  const handlePurchase = async () => {
    setShowPaymentDetails(true);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const paymentDetails = {
    accountName: "V.NKOSI",
    bankName: "Capitect saving",
    accountNumber: "2166373573",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 px-4 py-4 flex items-center">
        <button
          onClick={() => setLocation("/products")}
          className="text-slate-400 hover:text-emerald-400 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-white font-bold text-lg ml-4">Product Details</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Product Card */}
        <Card className="bg-slate-800/50 border-slate-700/50 overflow-hidden">
          <div className="p-4 space-y-4">
            {/* Product Image */}
            {product.imageUrl && (
              <div className="bg-slate-700/50 rounded-lg overflow-hidden h-48 flex items-center justify-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Product Name and Price */}
            <div>
              <h2 className="text-emerald-400 font-bold text-2xl mb-2">{product.name}</h2>
              <p className="text-slate-400 text-sm mb-4">{product.description}</p>
              <div className="text-yellow-400 text-3xl font-bold">
                R{(product.price / 100).toFixed(2)}
              </div>
            </div>

            {/* Product Details Grid */}
            <div className="space-y-3 pt-4 border-t border-slate-700/50">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Total Revenue</span>
                <span className="text-yellow-400 font-semibold">
                  R{(product.totalRevenue / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Net Income/Day</span>
                <span className="text-yellow-400 font-semibold">
                  R{(product.netIncomePerDay / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Validity Period</span>
                <span className="text-emerald-400 font-semibold">
                  {product.validityPeriod} days
                </span>
              </div>
            </div>

            {/* Purchase Button */}
            <Button
              onClick={handlePurchase}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg mt-4"
            >
              Purchase Now
            </Button>
          </div>
        </Card>

        {/* Payment Details Section */}
        {showPaymentDetails && (
          <Card className="bg-slate-800/50 border-slate-700/50 p-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-emerald-400">
                <AlertCircle className="h-5 w-5" />
                <h3 className="font-bold">Payment Details</h3>
              </div>

              <div className="space-y-3 bg-slate-700/30 rounded-lg p-4">
                <div>
                  <p className="text-slate-400 text-sm mb-1">Account Name</p>
                  <div className="flex items-center justify-between bg-slate-800/50 rounded p-2">
                    <span className="text-white font-semibold">{paymentDetails.accountName}</span>
                    <button
                      onClick={() => handleCopy(paymentDetails.accountName)}
                      className="text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-slate-400 text-sm mb-1">Bank Name</p>
                  <div className="flex items-center justify-between bg-slate-800/50 rounded p-2">
                    <span className="text-white font-semibold">{paymentDetails.bankName}</span>
                    <button
                      onClick={() => handleCopy(paymentDetails.bankName)}
                      className="text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-slate-400 text-sm mb-1">Account Number</p>
                  <div className="flex items-center justify-between bg-slate-800/50 rounded p-2">
                    <span className="text-white font-semibold">{paymentDetails.accountNumber}</span>
                    <button
                      onClick={() => handleCopy(paymentDetails.accountNumber)}
                      className="text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-slate-400 text-xs text-center">
                Please transfer the amount and wait for confirmation
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
