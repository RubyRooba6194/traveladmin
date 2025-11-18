import { useAuth } from "../../context/AuthContext";
import { FiMail, FiShield, FiUser, FiCheckCircle } from "react-icons/fi";

export const AdminManagement = () => {
  const { currentUser } = useAuth();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Management</h1>
        <p className="text-gray-600 mt-1">Manage your admin account</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Admin Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <FiUser className="text-blue-600 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Account Information
              </h2>
              <p className="text-sm text-gray-600">
                Your admin profile details
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="text-sm font-semibold text-gray-600 flex items-center mb-2">
                <FiMail className="mr-2" />
                Email Address
              </label>
              <p className="text-lg text-gray-800 font-mono break-all">
                {currentUser?.email || "Not available"}
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="text-sm font-semibold text-gray-600 mb-2 block">
                User ID
              </label>
              <p className="text-sm text-gray-500 font-mono break-all">
                {currentUser?.uid || "Not available"}
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center text-green-700">
                <FiCheckCircle className="w-5 h-5 mr-2" />
                <div>
                  <p className="font-semibold">Passwordless Authentication</p>
                  <p className="text-sm text-green-600">
                    Your account uses secure email link sign-in
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <FiShield className="text-green-600 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Security Status
              </h2>
              <p className="text-sm text-gray-600">Your account security</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start p-3 bg-green-50 rounded-lg">
              <span className="text-green-600 mr-3 mt-1 text-xl">✓</span>
              <div>
                <p className="font-semibold text-gray-800">Email Verified</p>
                <p className="text-sm text-gray-600">
                  Your email is confirmed and secure
                </p>
              </div>
            </div>

            <div className="flex items-start p-3 bg-green-50 rounded-lg">
              <span className="text-green-600 mr-3 mt-1 text-xl">✓</span>
              <div>
                <p className="font-semibold text-gray-800">
                  Passwordless Sign-In
                </p>
                <p className="text-sm text-gray-600">
                  No password to remember or manage
                </p>
              </div>
            </div>

            <div className="flex items-start p-3 bg-green-50 rounded-lg">
              <span className="text-green-600 mr-3 mt-1 text-xl">✓</span>
              <div>
                <p className="font-semibold text-gray-800">Secure Links</p>
                <p className="text-sm text-gray-600">
                  One-time links expire after 1 hour
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Tips Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <FiShield className="text-blue-600 mr-2" />
            Security Best Practices
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="font-semibold text-gray-800 mb-2">
                🔐 Keep Email Secure
              </p>
              <p className="text-sm text-gray-600">
                Enable 2FA on your email account for maximum security
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="font-semibold text-gray-800 mb-2">
                🔒 Never Share Links
              </p>
              <p className="text-sm text-gray-600">
                Don't forward or share your sign-in links with anyone
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="font-semibold text-gray-800 mb-2">
                ⏱️ Quick Expiration
              </p>
              <p className="text-sm text-gray-600">
                Sign-in links expire after 1 hour for your protection
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="font-semibold text-gray-800 mb-2">
                🚪 Always Logout
              </p>
              <p className="text-sm text-gray-600">
                Remember to logout when using shared computers
              </p>
            </div>
          </div>
        </div>

        {/* Permissions Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Admin Permissions
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-300">
              <p className="text-sm text-gray-600 mb-1">Destinations</p>
              <p className="text-lg font-bold text-green-700">Full Access ✓</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-300">
              <p className="text-sm text-gray-600 mb-1">Gallery</p>
              <p className="text-lg font-bold text-green-700">Full Access ✓</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-300">
              <p className="text-sm text-gray-600 mb-1">Contacts</p>
              <p className="text-lg font-bold text-green-700">Full Access ✓</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-300">
              <p className="text-sm text-gray-600 mb-1">Settings</p>
              <p className="text-lg font-bold text-green-700">Full Access ✓</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
