import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import { ChevronLeft, Copy, Check } from "lucide-react";

export default function Recharge() {
  const [, setLocation] = useLocation();
  const [amount, setAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  const handleRecharge = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
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
          onClick={() => setLocation("/dashboard")}
          className="text-slate-400 hover:text-emerald-400 mr-3"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-white font-bold text-lg">Recharge</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        {!showPaymentDetails ? (
          <>
            {/* Amount Input */}
            <Card className="bg-slate-800/50 border-slate-700/50 p-6">
              <label className="block text-slate-300 text-sm font-semibold mb-3">
                Enter Amount (R)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-emerald-400 font-bold">R</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-emerald-400 focus:ring-emerald-400 text-lg"
                  min="0"
                  step="0.01"
                />
              </div>
            </Card>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-3 gap-3">
              {["100", "500", "1000"].map((val) => (
                <Button
                  key={val}
                  onClick={() => setAmount(val)}
                  className="bg-slate-700 hover:bg-slate-600 text-white font-semibold"
                >
                  R{val}
                </Button>
              ))}
            </div>

            {/* Recharge Button */}
            <Button
              onClick={handleRecharge}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg"
            >
              Continue
            </Button>
          </>
        ) : (
          <>
            {/* Payment Details */}
            <Card className="bg-slate-800/50 border-slate-700/50 p-4">
              <h2 className="text-emerald-400 font-bold mb-4">Payment Details</h2>

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

              <p className="text-slate-400 text-xs text-center mt-4">
                Please transfer R{amount} and wait for confirmation
              </p>
            </Card>

            {/* Back Button */}
            <Button
              onClick={() => setShowPaymentDetails(false)}
              variant="outline"
              className="w-full text-slate-300 border-slate-600"
            >
              Back
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
