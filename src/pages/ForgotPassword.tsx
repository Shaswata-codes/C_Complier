import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      toast({
        title: "Missing Email",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword(email);
      toast({
        title: "Email Sent",
        description: "Check your inbox for the password reset link.",
      });
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Reset Failed",
        description: error.message || "Could not send reset email.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      {/* Watermark */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-white/10 text-6xl font-bold tracking-widest select-none pointer-events-none">
        SHAS CODES
      </div>

      <div className="w-full max-w-md relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>

        <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-slate-800">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              Reset Password
            </h1>
            <p className="text-slate-400 text-sm">Enter your email to continue</p>
          </div>

          {/* Email Input */}
          <div className="relative group/input mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur opacity-0 group-hover/input:opacity-20 transition duration-300"></div>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="relative group/button mb-4">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-lg blur opacity-50 group-hover/button:opacity-75 transition duration-300"></div>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="relative w-full py-3 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </div>

          {/* Back to Login */}
          <p className="text-center text-sm text-slate-400">
            Remember your password?{" "}
            <a href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
