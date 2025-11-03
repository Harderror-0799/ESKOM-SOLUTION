import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Send } from "lucide-react";
import { useState } from "react";

export default function Invite() {
  const [copied, setCopied] = useState(false);

  // Mock invitation code - replace with actual user data
  const invitationCode = "85268539";
  const invitationUrl = `https://www.eskom-solution.com/h5/index.html#/pages/login/register/index?recomno=${invitationCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(invitationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 px-4 py-4">
        <h1 className="text-white font-bold text-lg">Invite Friends</h1>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Subtitle */}
        <div className="text-center">
          <p className="text-slate-300 text-sm">My exclusive invitation code</p>
        </div>

        {/* QR Code Card */}
        <Card className="bg-gradient-to-br from-teal-600/20 to-teal-700/20 border-teal-500/30 p-8 flex flex-col items-center space-y-6">
          {/* QR Code Placeholder */}
          <div className="bg-white p-4 rounded-lg">
            <div className="w-48 h-48 bg-slate-200 rounded flex items-center justify-center">
              <div className="text-center">
                <p className="text-slate-500 text-sm mb-2">QR Code</p>
                <p className="text-slate-400 text-xs">Scan to invite</p>
              </div>
            </div>
          </div>

          {/* Invitation Code */}
          <div className="text-center">
            <div className="text-emerald-400 text-4xl font-bold font-mono mb-2">
              {invitationCode}
            </div>
            <button
              onClick={handleCopy}
              className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold flex items-center space-x-1"
            >
              <Copy className="h-4 w-4" />
              <span>{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        </Card>

        {/* Invitation Link */}
        <Card className="bg-slate-800/50 border-slate-700/50 p-4">
          <div className="bg-slate-700/50 rounded-lg p-3 mb-3 break-all">
            <p className="text-slate-300 text-xs font-mono">{invitationUrl}</p>
          </div>
          <Button
            onClick={handleCopy}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
          >
            <Copy className="h-4 w-4 mr-2" />
            {copied ? "Copied!" : "Copy Link"}
          </Button>
        </Card>

        {/* Team Section */}
        <div className="space-y-3">
          <h2 className="text-emerald-400 font-bold text-lg">Team</h2>
          <Card className="bg-slate-800/50 border-slate-700/50 p-4 text-center">
            <p className="text-slate-400 text-sm">No team members yet</p>
            <p className="text-slate-500 text-xs mt-2">
              Invite friends to start building your team
            </p>
          </Card>
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => {
              const text = `Join ESKOM SOLUTION investment platform! Use my code: ${invitationCode}`;
              if (navigator.share) {
                navigator.share({ title: "ESKOM SOLUTION", text, url: invitationUrl });
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
          >
            <Send className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            onClick={() => {
              const text = `Join ESKOM SOLUTION investment platform! Use my code: ${invitationCode}`;
              const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + invitationUrl)}`;
              window.open(whatsappUrl, "_blank");
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2"
          >
            <Send className="h-4 w-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
