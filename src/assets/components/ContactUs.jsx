import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperclip, FaTimes, FaComments } from "react-icons/fa";

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const subjectOptions = [
    { value: "general", label: "General Inquiry" },
    { value: "technical", label: "Technical Support" },
    { value: "complaint", label: "Complaint" },
    { value: "feedback", label: "Feedback" },
    { value: "partnership", label: "Partnership" }
  ];

  const severityOptions = [
    { value: "low", label: "Low Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "high", label: "High Priority" },
    { value: "urgent", label: "Urgent" }
  ];

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (uploadedFiles.length + files.length > 3) {
      showNotificationMessage("Maximum 3 files allowed", "error");
      return;
    }
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'application/pdf'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });
    setUploadedFiles([...uploadedFiles, ...validFiles]);
  };

  const removeFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      showNotificationMessage("Form submitted successfully!", "success");
      reset();
      setUploadedFiles([]);
    } catch (error) {
      showNotificationMessage("Error submitting form. Please try again.", "error");
    }
    setIsLoading(false);
  };

  const showNotificationMessage = (message, type) => {
    setNotificationMessage({ text: message, type });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const toggleChat = () => {
    setChatOpen(!chatOpen);
    if (!chatOpen && chatMessages.length === 0) {
      setChatMessages([{ text: "Hello! How can I help you today?", isBot: true }]);
    }
  };

  const sendChatMessage = (message) => {
    setChatMessages([...chatMessages, { text: message, isBot: false }]);
    // Simulate bot response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { text: "Thanks for your message. An agent will respond shortly.", isBot: true }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information Section */}
          <div className="bg-card rounded-lg shadow-sm p-8">
            <h2 className="text-heading font-heading text-foreground mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt className="text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Address</h3>
                  <p className="text-accent">123 Business Avenue, Suite 100<br />Enterprise City, EC 12345</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaPhone className="text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Phone</h3>
                  <p className="text-accent">Main: (555) 123-4567<br />Support: (555) 987-6543</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaEnvelope className="text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-accent">support@company.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaClock className="text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Hours</h3>
                  <p className="text-accent">Monday - Friday: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-accent hover:text-primary transition-colors">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="text-accent hover:text-primary transition-colors">
                  <FaTwitter size={24} />
                </a>
                <a href="#" className="text-accent hover:text-primary transition-colors">
                  <FaLinkedin size={24} />
                </a>
                <a href="#" className="text-accent hover:text-primary transition-colors">
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>

            <div className="mt-8 h-64 rounded-lg overflow-hidden">
              <iframe
                title="Google Maps Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.991441291371!2d2.294481615507165!3d48.85837007928745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sus!4v1647951481244!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-card rounded-lg shadow-sm p-8">
            <h2 className="text-heading font-heading text-foreground mb-6">Send us a Message</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-foreground">First Name</label>
                  <input
                    {...register("firstName", { required: "First name is required" })}
                    type="text"
                    className="mt-1 block w-full rounded-sm border-input bg-background px-3 py-2"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-destructive">{errors.firstName.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-foreground">Last Name</label>
                  <input
                    {...register("lastName", { required: "Last name is required" })}
                    type="text"
                    className="mt-1 block w-full rounded-sm border-input bg-background px-3 py-2"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  type="email"
                  className="mt-1 block w-full rounded-sm border-input bg-background px-3 py-2"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground">Subject</label>
                <Select
                  options={subjectOptions}
                  className="mt-1"
                  {...register("subject", { required: "Please select a subject" })}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-destructive">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground">Message</label>
                <textarea
                  {...register("message", {
                    required: "Message is required",
                    minLength: { value: 20, message: "Message must be at least 20 characters" },
                    maxLength: { value: 500, message: "Message cannot exceed 500 characters" }
                  })}
                  rows={4}
                  className="mt-1 block w-full rounded-sm border-input bg-background px-3 py-2"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground">Attachments</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-input rounded-sm">
                  <div className="space-y-1 text-center">
                    <FaPaperclip className="mx-auto h-12 w-12 text-accent" />
                    <div className="flex text-sm text-accent">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-background rounded-sm font-medium text-primary hover:text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                        <span>Upload files</span>
                        <input
                          id="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileUpload}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-accent">PDF, PNG, JPG up to 5MB</p>
                  </div>
                </div>
                <div className="mt-2 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-sm">
                      <span className="text-sm text-accent truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-accent hover:text-destructive"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    {...register("terms", { required: "You must accept the terms" })}
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-input rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-accent">
                    I agree to the <a href="#" className="text-primary hover:text-primary">Terms</a> and <a href="#" className="text-primary hover:text-primary">Privacy Policy</a>
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Chat Widget */}
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={toggleChat}
            className="bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <FaComments size={24} />
          </button>

          <AnimatePresence>
            {chatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-16 right-0 w-96 bg-card rounded-lg shadow-lg"
              >
                <div className="p-4 border-b border-input">
                  <h3 className="text-lg font-semibold text-foreground">Chat Support</h3>
                </div>
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-3/4 p-3 rounded-lg ${message.isBot
                          ? "bg-muted text-muted-foreground"
                          : "bg-primary text-primary-foreground"
                          }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-input">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const input = e.target.elements.message;
                      if (input.value.trim()) {
                        sendChatMessage(input.value);
                        input.value = "";
                      }
                    }}
                    className="flex space-x-2"
                  >
                    <input
                      type="text"
                      name="message"
                      placeholder="Type your message..."
                      className="flex-1 rounded-sm border-input bg-background px-3 py-2"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notification */}
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className={`fixed bottom-4 left-4 p-4 rounded-lg shadow-lg ${notificationMessage.type === "success" ? "bg-chart-2 text-white" : "bg-destructive text-destructive-foreground"}`}
            >
              {notificationMessage.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactUs;
