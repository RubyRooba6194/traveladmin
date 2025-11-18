import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { auth } from "../../config/firebase";
import { FiMail, FiCheck, FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  // Check if user is completing sign-in from email link
  useEffect(() => {
    const completeSignIn = async () => {
      // Check if this is a sign-in link
      if (isSignInWithEmailLink(auth, window.location.href)) {
        console.log("📧 Email link detected!");

        // Try to get email from localStorage
        let emailForSignIn = window.localStorage.getItem("emailForSignIn");

        // Also check sessionStorage as backup
        if (!emailForSignIn) {
          emailForSignIn = window.sessionStorage.getItem("emailForSignIn");
        }

        if (!emailForSignIn) {
          // Only prompt if really not found
          emailForSignIn = window.prompt(
            "Please enter your email for confirmation:"
          );

          // Save it for next time if user entered it
          if (emailForSignIn) {
            window.localStorage.setItem("emailForSignIn", emailForSignIn);
          }
        }

        if (emailForSignIn) {
          try {
            console.log("🔐 Signing in with:", emailForSignIn);

            // Complete the sign-in
            const result = await signInWithEmailLink(
              auth,
              emailForSignIn,
              window.location.href
            );

            console.log("✅ Sign-in successful!", result.user);

            // Clean up - remove from both storages AFTER successful sign-in
            window.localStorage.removeItem("emailForSignIn");
            window.sessionStorage.removeItem("emailForSignIn");

            toast.success("✅ Successfully signed in!");

            // Navigate to dashboard
            navigate("/dashboard", { replace: true });
          } catch (error: any) {
            console.error("❌ Sign-in error:", error);

            // Don't remove email from storage if sign-in failed
            if (error.code === "auth/invalid-action-code") {
              toast.error(
                "⏰ This sign-in link has expired. Please request a new one."
              );
            } else if (error.code === "auth/invalid-email") {
              toast.error("❌ Invalid email address. Please try again.");
            } else {
              toast.error("❌ Sign-in failed: " + error.message);
            }
          }
        }
      }
    };

    completeSignIn();
  }, [navigate]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    // Allowed admin emails
    const allowedEmails = [
      "admin@thenitravel.com",
      "roobashini@gmail.com",
      "roobashinip0604@gmail.com",
    ];

    const trimmedEmail = email.toLowerCase().trim();

    if (!allowedEmails.includes(trimmedEmail)) {
      toast.error("❌ Unauthorized email address");
      return;
    }

    try {
      setLoading(true);
      console.log("📤 Sending sign-in link to:", trimmedEmail);

      const actionCodeSettings = {
        url: window.location.href,
        handleCodeInApp: true,
      };

      await sendSignInLinkToEmail(auth, trimmedEmail, actionCodeSettings);

      // Save to BOTH localStorage and sessionStorage for reliability
      window.localStorage.setItem("emailForSignIn", trimmedEmail);
      window.sessionStorage.setItem("emailForSignIn", trimmedEmail);

      // Also save in a cookie as extra backup
      document.cookie = `emailForSignIn=${trimmedEmail}; max-age=3600; path=/`;

      setEmailSent(true);
      console.log("✅ Email saved to storage:", trimmedEmail);
      toast.success("📧 Check your email for sign-in link!");
    } catch (error: any) {
      console.error("❌ Error:", error);
      toast.error("❌ Failed to send sign-in link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <FiMail className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Theni Travel
          </h1>
          <p className="text-gray-600">Admin Panel - OTP Login</p>
        </div>

        {!emailSent ? (
          <form onSubmit={handleSendOTP} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="roobashinip0604@gmail.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending OTP...
                </div>
              ) : (
                "Send Sign-In Link (OTP)"
              )}
            </button>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                🔒 No password needed - Sign in with email link only
              </p>
            </div>
          </form>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
              <FiCheck className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              📧 Check Your Email!
            </h2>
            <p className="text-gray-600 mb-6">
              Sign-in link sent to:
              <br />
              <strong className="text-blue-600 text-lg">{email}</strong>
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
              <p className="text-sm font-bold text-gray-800 mb-3">
                📬 How to sign in:
              </p>
              <ol className="text-sm text-gray-700 text-left space-y-2 list-decimal list-inside">
                <li>Open your email inbox</li>
                <li>
                  Look for email from <strong>Firebase</strong>
                </li>
                <li>
                  Click the <strong>"Sign in"</strong> link
                </li>
                <li>
                  You'll be logged in automatically (no prompt needed)! 🎉
                </li>
              </ol>
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-700 font-semibold">
                  💡 Pro Tip: Click the link on the SAME device/browser where
                  you requested it
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setEmailSent(false);
                setEmail("");
              }}
              className="flex items-center justify-center text-blue-600 hover:text-blue-700 font-medium mx-auto transition"
            >
              <FiArrowLeft className="mr-2" />
              Use different email
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
