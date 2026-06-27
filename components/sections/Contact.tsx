"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/utils/validation";
import { sendContactEmail } from "@/app/actions/contact";
import { useState, useRef, useEffect } from "react";
import { TurnstileWrapper } from "@/components/ui/TurnstileWrapper";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // Security: State-Locked Form
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const containerRef = useRef<HTMLElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // 1. Hydration Guard
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  useGSAP(
    (context) => {
      // 2. Abort if React hasn't fully painted yet
      if (!isMounted || !containerRef.current) return;

      let rafId1: number;
      let rafId2: number;

      rafId1 = requestAnimationFrame(() => {
        rafId2 = requestAnimationFrame(() => {
          // 3. Guaranteed Context Execution
          context.add(() => {
            const q = gsap.utils.selector(containerRef);
            let mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
              ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 80%",
                onEnter: () => {
                  gsap.fromTo(
                    q(".contact-elem"),
                    { opacity: 0, y: 30 },
                    {
                      opacity: 1,
                      y: 0,
                      duration: 0.8,
                      ease: "power3.out",
                      stagger: 0.1,
                    }
                  );
                }
              });
            });

            mm.add("(prefers-reduced-motion: reduce)", () => {
              ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 80%",
                onEnter: () => {
                  gsap.fromTo(
                    q(".contact-elem"),
                    { opacity: 0 },
                    {
                      opacity: 1,
                      duration: 0.8,
                      stagger: 0.1,
                    }
                  );
                }
              });
            });
          });
        });
      });

      return () => {
        cancelAnimationFrame(rafId1);
        cancelAnimationFrame(rafId2);
      };
    },
    { scope: containerRef, dependencies: [isMounted], revertOnUpdate: true }
  );

  const onSubmit = async (data: ContactFormData) => {
    // Failsafe: Prevent execution if not verified client-side (Zero-Trust)
    if (!isVerified) return;

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const result = await sendContactEmail(data);
      if (result.success) {
        setFeedback({
          type: "success",
          message: "[TRANSMISSION_SUCCESSFUL]",
        });
        reset();
        setIsVerified(false); // Reset verification after successful send
      } else {
        setFeedback({
          type: "error",
          message: result.error || "[TRANSMISSION_FAILED]",
        });
      }
    } catch (e) {
      setFeedback({ type: "error", message: "[SERVER_ERROR]" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={containerRef}
      className="w-full relative border-y border-outline bg-background overflow-hidden"
      id="contact"
    >
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-20 z-0">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="hidden lg:block border-r border-outline" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
        {/* HEADER (Spans 4 cols) */}
        <div className="lg:col-span-4 border-r border-outline border-b lg:border-b-0 pl-4 md:pl-12 pr-4 pt-24 pb-12 flex flex-col justify-between">
          <div className="contact-elem opacity-0 will-change-transform">
            <h2 className="font-headline text-6xl lg:text-[7rem] font-black tracking-[-0.04em] text-on-background uppercase leading-[0.85] break-words">
              LET&apos;S<br />CONNECT.
            </h2>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-on-background/50 mt-12 block">
              [STATUS: OPEN_FOR_PROJECTS]
            </p>
          </div>
        </div>

        {/* FORM (Spans 8 cols) */}
        <div className="lg:col-span-8 flex flex-col bg-background relative z-10">
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full h-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 border-b border-outline">
              <div className="contact-elem opacity-0 will-change-transform border-b md:border-b-0 md:border-r border-outline relative p-8 md:p-12">
                <label className="font-mono text-[10px] tracking-[0.4em] uppercase text-on-background/50 block mb-6">
                  [FULL_NAME]
                </label>
                <input
                  {...register("name")}
                  className="w-full bg-transparent border-none text-2xl lg:text-4xl font-headline font-black uppercase text-on-background focus:outline-none focus:ring-0 placeholder-on-background/10 transition-colors"
                  placeholder="JOHN DOE"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <span className="absolute bottom-4 left-8 md:left-12 text-[9px] text-red-500 font-bold uppercase tracking-[0.2em]">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="contact-elem opacity-0 will-change-transform relative p-8 md:p-12">
                <label className="font-mono text-[10px] tracking-[0.4em] uppercase text-on-background/50 block mb-6">
                  [EMAIL_ADDRESS]
                </label>
                <input
                  {...register("email")}
                  className="w-full bg-transparent border-none text-2xl lg:text-4xl font-headline font-black uppercase text-on-background focus:outline-none focus:ring-0 placeholder-on-background/10 transition-colors"
                  placeholder="HELLO@DOMAIN.COM"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <span className="absolute bottom-4 left-8 md:left-12 text-[9px] text-red-500 font-bold uppercase tracking-[0.2em]">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="contact-elem opacity-0 will-change-transform border-b border-outline relative p-8 md:p-12 flex-grow">
              <label className="font-mono text-[10px] tracking-[0.4em] uppercase text-on-background/50 block mb-6">
                [MESSAGE]
              </label>
              <textarea
                {...register("message")}
                className="w-full h-full min-h-[200px] lg:min-h-[300px] bg-transparent border-none text-2xl lg:text-4xl font-headline font-black uppercase text-on-background focus:outline-none focus:ring-0 placeholder-on-background/10 transition-colors resize-none"
                placeholder="TELL ME ABOUT YOUR PROJECT..."
                disabled={isSubmitting}
              />
              {errors.message && (
                <span className="absolute bottom-4 left-8 md:left-12 text-[9px] text-red-500 font-bold uppercase tracking-[0.2em]">
                  {errors.message.message}
                </span>
              )}
            </div>

            <div className="contact-elem opacity-0 will-change-transform flex flex-col md:flex-row items-stretch min-h-[140px]">
              <div className="flex-grow p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-outline relative">
                <TurnstileWrapper
                  onSuccess={(token) => {
                    setValue("turnstileToken", token);
                    setIsVerified(true);
                  }}
                  onExpire={() => {
                    setValue("turnstileToken", "");
                    setIsVerified(false);
                  }}
                  onError={() => {
                    setValue("turnstileToken", "");
                    setIsVerified(false);
                  }}
                />
                {errors.turnstileToken && (
                  <span className="absolute top-4 right-8 text-[9px] text-red-500 font-bold uppercase tracking-[0.2em]">
                    {errors.turnstileToken.message}
                  </span>
                )}
                {feedback && (
                  <span className={`mt-4 text-[9px] font-bold uppercase tracking-[0.2em] ${feedback.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    {feedback.message}
                  </span>
                )}
              </div>
              
              <button
                className={`w-full md:w-[350px] flex items-center justify-center font-headline text-2xl lg:text-4xl font-black uppercase transition-all duration-300 ${
                  !isVerified || isSubmitting || feedback?.type === "success" 
                    ? "bg-surface text-on-background/30 cursor-not-allowed" 
                    : "bg-on-background text-background hover:bg-primary hover:text-black cursor-crosshair"
                }`}
                type="submit"
                disabled={!isVerified || isSubmitting || feedback?.type === "success"}
              >
                {isSubmitting 
                  ? "TRANSMITTING..." 
                  : feedback?.type === "success" 
                    ? "RECEIVED." 
                    : !isVerified 
                      ? "AWAITING VERIFICATION" 
                      : "SEND"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
