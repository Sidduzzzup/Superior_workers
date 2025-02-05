import { useState } from "react";
import { FiMail, FiShield, FiLock } from "react-icons/fi";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";




const PasswordRecovery = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [canResend, setCanResend] = useState(false);


  const { isLoading, forgotPassword } = useAuthStore();


  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await forgotPassword(email);
      setSuccess(true);
      setCanResend(true);
      navigate("/EmailConfirmationSuccess");
      
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setSuccess(false);
    setCanResend(false);
    setEmail("");
  };

  const services = [
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Secure Recovery",
      description: "Advanced encryption for your security"
    },
    {
      icon: <FiMail className="w-6 h-6" />,
      title: "Instant Email",
      description: "Quick verification link delivery"
    },
    {
      icon: <FiLock className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance available"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Forgot Password?</h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't worry! It happens. Please enter the email associated with your account.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              disabled={loading || success}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600" role="alert">{error}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={!email || loading || success}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${!email || loading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing
                </span>
              ) : "Send Verification Link"}
            </button>
          </div>

          {success && (
            <div className="text-center">
              <p className="text-sm text-green-600">Verification link has been sent to your email!</p>
              {canResend && (
                <button
                  type="button"
                  onClick={handleResend}
                  className="mt-4 text-sm text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline"
                >
                  Send another link
                </button>
              )}
            </div>
          )}
        </form>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Our Services</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                <div className="text-indigo-600 mb-2">{service.icon}</div>
                <h4 className="text-sm font-medium text-gray-900">{service.title}</h4>
                <p className="mt-1 text-xs text-gray-500">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;