import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, ShieldCheck, Github, Linkedin, Instagram, Sparkles } from "lucide-react";
import { ThemeConfig } from "../types";
import CircuitOverlay from "./CircuitOverlay";

interface ContactProps {
  currentTheme: ThemeConfig;
}

export default function Contact({ currentTheme }: ContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successInfo, setSuccessInfo] = useState<{ emailSent?: boolean } | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMessage("Please fill out all fields before submitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(null);
    setErrorMessage("");
    setSuccessInfo(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitSuccess(true);
        setSuccessInfo({ emailSent: result.data?.emailSent });
        // Reset inputs on success
        setName("");
        setEmail("");
        setMessage("");
      } else {
        throw new Error(result.error || "Failed to deliver message.");
      }
    } catch (err: any) {
      console.error(err);
      setSubmitSuccess(false);
      setErrorMessage(err.message || "Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight mb-3">
            Get In Touch
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-emerald-500 mx-auto rounded-full" />
          <p className="text-stone-800 dark:text-slate-300 text-xs uppercase tracking-wider font-mono mt-3">
            Send a direct message
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details & Info - Left Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-sans font-extrabold text-stone-900 dark:text-white">
                Contact Information
              </h3>
              <p className="text-xs text-stone-900 dark:text-slate-200 leading-relaxed font-bold">
                Fill out the contact form to drop me a message. Your submissions are processed securely and forwarded directly to my primary inboxes in real-time.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/15">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-slate-300">Email Address</h4>
                  <a href="mailto:v333066@gmail.com" className="text-xs font-mono font-bold text-stone-950 dark:text-slate-200 hover:underline">
                    v333066@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-slate-300">Mobile Phone</h4>
                  <a href="tel:+919448472001" className="text-xs font-mono font-bold text-stone-950 dark:text-slate-200 hover:underline">
                    +91 9448472001
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/15">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-slate-300">Office Location</h4>
                  <span className="text-xs font-bold text-stone-950 dark:text-slate-200">
                    Coxtown, Bangalore - 560005, India
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-stone-200/50 dark:border-slate-800/50 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 dark:text-slate-400">
                Connect Digitally
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href="www.linkedin.com/in/v-lokeshwara-a3418a39a" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-stone-300/80 dark:border-slate-800 hover:border-cyan-500 text-stone-700 dark:text-slate-300 hover:text-cyan-500 transition-all shadow-sm"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/loky77v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-stone-300/80 dark:border-slate-800 hover:border-emerald-500 text-stone-700 dark:text-slate-300 hover:text-emerald-500 transition-all shadow-sm"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/the_loky_77"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-stone-300/80 dark:border-slate-800 hover:border-pink-500 text-stone-700 dark:text-slate-300 hover:text-pink-500 transition-all shadow-sm"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form - Right Column */}
          <div className="lg:col-span-7">
            <div
              className={`p-6 md:p-8 rounded-3xl ${currentTheme.cardClass} group relative overflow-hidden`}
            >
              <CircuitOverlay />
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-emerald-500" />
                <h3 className="font-sans font-extrabold text-base tracking-tight text-stone-900 dark:text-white">
                  Send a Message
                </h3>
              </div>

              <form onSubmit={handleSend} className="space-y-5">
                <div>
                  <label htmlFor="form-name" className="block text-[11px] font-mono font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    id="form-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    placeholder="E.g. V Lokeshwara"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950/40 backdrop-blur-md border border-white/10 text-xs font-bold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all text-white placeholder-slate-400"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="form-email" className="block text-[11px] font-mono font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="form-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    placeholder="E.g. loky77@gmail.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950/40 backdrop-blur-md border border-white/10 text-xs font-bold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all text-white placeholder-slate-400"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="form-message" className="block text-[11px] font-mono font-extrabold uppercase tracking-wider text-slate-300 mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    id="form-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSubmitting}
                    rows={5}
                    placeholder="Type your message here..."
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-950/40 backdrop-blur-md border border-white/10 text-xs font-bold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all text-white resize-none placeholder-slate-400"
                    required
                  />
                </div>

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 font-medium">
                    {errorMessage}
                  </div>
                )}

                {submitSuccess === true && (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-400 flex items-start gap-2.5 font-medium leading-relaxed">
                    <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-500" />
                    <div>
                      <span>Message successfully saved!</span>
                      {successInfo?.emailSent ? (
                        <p className="mt-1 text-[11px] text-emerald-700 dark:text-emerald-400/80">
                          ✓ A notification email has been dispatched and routed directly to V Lokeshwara's inbox.
                        </p>
                      ) : (
                        <p className="mt-1 text-[11px] opacity-80">
                          (The administrator has been notified. SMTP email dispatch can be enabled by setting up your credentials.)
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold text-xs uppercase tracking-wider hover:bg-stone-800 dark:hover:bg-slate-100 disabled:opacity-50 transition-all cursor-pointer shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
