"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/utils/validation";
import { sendContactEmail } from "@/app/actions/contact";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const result = await sendContactEmail(data);
      if (result.success) {
        setFeedback({
          type: "success",
          message: "Message sent! I'll get back to you soon.",
        });
        reset();
      } else {
        setFeedback({
          type: "error",
          message: result.error || "Something went wrong.",
        });
      }
    } catch (e) {
      setFeedback({ type: "error", message: "Failed to connect to server." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="px-8 max-w-screen-2xl mx-auto py-16 lg:py-48"
      id="contact"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 1,
          ease: [0.16, 1, 0.3, 1] as any,
          delay: 0.1,
        }}
        className="max-w-4xl mx-auto contact-form glass-card p-12 md:p-24 relative overflow-hidden shadow-2xl shadow-black/5"
      >
        {/* Dynamic Decorative Orbs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-on-background/[0.03] blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-on-background/[0.02] blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-on-background/[0.01] blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center mb-16">
          <h2 className="font-headline lg:text-6xl text-4xl font-extrabold tracking-tighter mb-4 text-on-background">
            LET'S START A CONVERSATION.
          </h2>

          <p className="text-on-background/85 font-label text-[10px] tracking-[0.3em] uppercase">
            Currently accepting new projects
          </p>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative group/field">
              <input
                {...register("name")}
                className="peer block w-full appearance-none border-0 border-b border-outline bg-transparent py-4 px-0 text-on-background focus:outline-none focus:ring-0 transition-all duration-300"
                id="name"
                placeholder=" "
                type="text"
                disabled={isSubmitting}
              />
              <div className="absolute bottom-0 left-0 w-full h-[2px] scale-x-0 peer-focus:scale-x-100 bg-on-background transition-transform duration-500 origin-center" />
              <label
                className="absolute top-4 -z-10 origin-[0] -translate-y-8 scale-75 transform text-xs font-bold tracking-widest text-on-background/75 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-on-background"
                htmlFor="name"
              >
                FULL NAME
              </label>
              <AnimatePresence>
                {errors.name && (
                  <motion.span
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-2 block"
                  >
                    {errors.name.message}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <div className="relative group/field">
              <input
                {...register("email")}
                className="peer block w-full appearance-none border-0 border-b border-outline bg-transparent py-4 px-0 text-on-background focus:outline-none focus:ring-0 transition-all duration-300"
                id="email"
                placeholder=" "
                type="email"
                disabled={isSubmitting}
              />
              <div className="absolute bottom-0 left-0 w-full h-[2px] scale-x-0 peer-focus:scale-x-100 bg-on-background transition-transform duration-500 origin-center" />
              <label
                className="absolute top-4 -z-10 origin-[0] -translate-y-8 scale-75 transform text-xs font-bold tracking-widest text-on-background/75 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-on-background"
                htmlFor="email"
              >
                EMAIL ADDRESS
              </label>
              <AnimatePresence>
                {errors.email && (
                  <motion.span
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-2 block"
                  >
                    {errors.email.message}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="relative group/field">
            <textarea
              {...register("message")}
              className="peer block w-full appearance-none border-0 border-b border-outline bg-transparent py-4 px-0 text-on-background focus:outline-none focus:ring-0 transition-all duration-300"
              id="message"
              placeholder=" "
              rows={3}
              disabled={isSubmitting}
            ></textarea>
            <div className="absolute bottom-0 left-0 w-full h-[2px] scale-x-0 peer-focus:scale-x-100 bg-on-background transition-transform duration-500 origin-center" />
            <label
              className="absolute top-4 -z-10 origin-[0] -translate-y-8 scale-75 transform text-xs font-bold tracking-widest text-on-background/75 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-8 peer-focus:scale-75 peer-focus:text-on-background"
              htmlFor="message"
            >
              PROJECT OVERVIEW
            </label>
            <AnimatePresence>
              {errors.message && (
                <motion.span
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-2 block"
                >
                  {errors.message.message}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-center gap-8 pt-8">
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, rotateX: -10 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  className={`text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-3 rounded-full border ${
                    feedback.type === "success"
                      ? "bg-on-background/10 border-on-background/20 text-on-background"
                      : "bg-red-500/10 border-red-500/20 text-red-500"
                  }`}
                >
                  {feedback.message}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              className={`bg-on-background text-background border-on-background border rounded-full px-16 py-5 text-xs font-bold uppercase tracking-[0.3em] transition-all duration-[400ms] relative overflow-hidden group min-w-[240px] flex items-center justify-center ${
                isSubmitting
                  ? "opacity-60 cursor-not-allowed scale-[0.98]"
                  : feedback?.type === "success"
                    ? "bg-green-500 border-green-500 text-white"
                    : "hover:bg-transparent hover:text-on-background active:scale-95"
              }`}
              type="submit"
              disabled={isSubmitting || feedback?.type === "success"}
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.span
                    key="submitting"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3"
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.8,
                        ease: "linear",
                      }}
                      className="w-4 h-4 border-[2.5px] border-black border-t-transparent rounded-full"
                    />
                    SENDING...
                  </motion.span>
                ) : feedback?.type === "success" ? (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    SENT SUCCESSFULLY
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Send Message
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
