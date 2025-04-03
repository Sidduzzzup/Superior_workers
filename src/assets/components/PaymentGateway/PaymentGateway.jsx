import React, { useState } from "react";
import { FaCreditCard, FaRegCreditCard, FaMobile } from "react-icons/fa";
import { BsBank } from "react-icons/bs";
import { MdPayment } from "react-icons/md";

const PaymentGateway = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });
  const [errors, setErrors] = useState({});

  const orderSummary = {
    subtotal: 999.99,
    tax: 89.99,
    total: 1089.98
  };

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validatePhone = (phone) => {
    return phone.match(/^[0-9]{10}$/);
  };

  const validateCardNumber = (number) => {
    return number.match(/^[0-9]{16}$/);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.paymentMethod) newErrors.paymentMethod = "Please select a payment method";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.cardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (!validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = "Invalid card number";
    }
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
    if (!formData.cvv) newErrors.cvv = "CVV is required";
    if (!formData.cardholderName) newErrors.cardholderName = "Cardholder name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    let isValid = false;
    switch (step) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      default:
        break;
    }

    if (isValid) setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (validateStep3()) {
      setLoading(true);
      // Simulate payment processing
      setTimeout(() => {
        setPaymentStatus("success");
        setLoading(false);
      }, 2000);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="fullName">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${errors.fullName ? "border-destructive" : ""}`}
          placeholder="John Doe"
        />
        {errors.fullName && <p className="mt-1 text-sm text-destructive">{errors.fullName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${errors.email ? "border-destructive" : ""}`}
          placeholder="john@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${errors.phone ? "border-destructive" : ""}`}
          placeholder="1234567890"
        />
        {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone}</p>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setFormData({ ...formData, paymentMethod: "credit" })}
          className={`p-4 rounded-lg border ${formData.paymentMethod === "credit" ? "border-primary bg-primary/10" : "border-gray-200"} hover:border-primary transition-all flex items-center gap-3`}
        >
          <FaCreditCard className="text-2xl" />
          <span>Credit Card</span>
        </button>

        <button
          onClick={() => setFormData({ ...formData, paymentMethod: "debit" })}
          className={`p-4 rounded-lg border ${formData.paymentMethod === "debit" ? "border-primary bg-primary/10" : "border-gray-200"} hover:border-primary transition-all flex items-center gap-3`}
        >
          <FaRegCreditCard className="text-2xl" />
          <span>Debit Card</span>
        </button>

        <button
          onClick={() => setFormData({ ...formData, paymentMethod: "netbanking" })}
          className={`p-4 rounded-lg border ${formData.paymentMethod === "netbanking" ? "border-primary bg-primary/10" : "border-gray-200"} hover:border-primary transition-all flex items-center gap-3`}
        >
          <BsBank className="text-2xl" />
          <span>Net Banking</span>
        </button>

        <button
          onClick={() => setFormData({ ...formData, paymentMethod: "upi" })}
          className={`p-4 rounded-lg border ${formData.paymentMethod === "upi" ? "border-primary bg-primary/10" : "border-gray-200"} hover:border-primary transition-all flex items-center gap-3`}
        >
          <FaMobile className="text-2xl" />
          <span>UPI</span>
        </button>
      </div>
      {errors.paymentMethod && <p className="mt-1 text-sm text-destructive">{errors.paymentMethod}</p>}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="cardNumber">
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${errors.cardNumber ? "border-destructive" : ""}`}
          placeholder="1234 5678 9012 3456"
          maxLength="16"
        />
        {errors.cardNumber && <p className="mt-1 text-sm text-destructive">{errors.cardNumber}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="expiryDate">
            Expiry Date
          </label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${errors.expiryDate ? "border-destructive" : ""}`}
            placeholder="MM/YY"
          />
          {errors.expiryDate && <p className="mt-1 text-sm text-destructive">{errors.expiryDate}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="cvv">
            CVV
          </label>
          <input
            type="password"
            id="cvv"
            name="cvv"
            value={formData.cvv}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${errors.cvv ? "border-destructive" : ""}`}
            placeholder="123"
            maxLength="3"
          />
          {errors.cvv && <p className="mt-1 text-sm text-destructive">{errors.cvv}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="cardholderName">
          Cardholder Name
        </label>
        <input
          type="text"
          id="cardholderName"
          name="cardholderName"
          value={formData.cardholderName}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm ${errors.cardholderName ? "border-destructive" : ""}`}
          placeholder="John Doe"
        />
        {errors.cardholderName && <p className="mt-1 text-sm text-destructive">{errors.cardholderName}</p>}
      </div>
    </div>
  );

  const renderOrderSummary = () => (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${orderSummary.subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${orderSummary.tax}</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${orderSummary.total}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentStatus = () => (
    <div className="text-center py-8">
      {loading ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p>Processing your payment...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {paymentStatus === "success" && (
            <>
              <div className="text-green-500 text-5xl">✓</div>
              <h3 className="text-xl font-semibold">Payment Successful!</h3>
              <p className="text-gray-600">Thank you for your payment</p>
            </>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-white/20">
        <div className="px-6 py-8">
          <div className="flex items-center justify-center mb-8">
            <MdPayment className="text-4xl text-primary" />
            <h2 className="ml-2 text-2xl font-bold text-gray-900">Payment Gateway</h2>
          </div>

          {step < 4 && (
            <div className="mb-8">
              <div className="flex justify-between items-center">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className={`flex items-center ${item !== 3 ? "flex-1" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= item ? "bg-primary text-white" : "bg-gray-200 text-gray-600"}`}
                    >
                      {item}
                    </div>
                    {item !== 3 && (
                      <div
                        className={`flex-1 h-1 mx-2 ${step > item ? "bg-primary" : "bg-gray-200"}`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderPaymentStatus()}

          {step < 4 && (
            <>
              {renderOrderSummary()}
              
              <div className="mt-6 flex justify-between">
                {step > 1 && (
                  <button
                    onClick={handlePrevStep}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Previous
                  </button>
                )}
                <button
                  onClick={step === 3 ? handleSubmit : handleNextStep}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ml-auto"
                >
                  {step === 3 ? "Pay Now" : "Next"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;