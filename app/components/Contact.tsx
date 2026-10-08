"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "../lib/gsap";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(headerRef.current, { opacity: 0, y: 24 });
        gsap.to(headerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        });

        gsap.set(formCardRef.current, { opacity: 0, y: 30, scale: 0.97 });
        gsap.to(formCardRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: formCardRef.current, start: "top 85%" },
        });
      });
    },
    { scope: sectionRef },
  );

  useEffect(() => {
    if (status === "success" && submitBtnRef.current) {
      gsap.fromTo(
        submitBtnRef.current,
        { scale: 1 },
        { scale: 1.06, duration: 0.2, ease: "power2.out", yoyo: true, repeat: 1 },
      );
    }
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    // Netlify expects form-encoded data
    const formElement = e.currentTarget;
    const formDataObj = new FormData(formElement);
    
    // @ts-expect-error - FormData is iterable at runtime, lib.dom types lag behind
    const body = new URLSearchParams(formDataObj).toString();

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body,
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative w-full py-32 px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-steel/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-ice/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative max-w-5xl mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="heading-fluid font-black mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-lg md:text-xl">Let&apos;s build something amazing together</p>
        </div>

        <div className="grid">
          <div ref={formCardRef} className="glass modern-card p-4 sm:p-8">
            {/* NETLIFY FORM CONFIGURATION */}
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-3 sm:space-y-6"
            >
              {/* Hidden fields for Netlify */}
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>Don&apos;t fill this out if you&apos;re human: <input name="bot-field" /></label>
              </p>

              <div>
                <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 glass rounded-xl text-white placeholder-gray-500 focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/50 transition-all text-left"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 glass rounded-xl text-white placeholder-gray-500 focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/50 transition-all text-left"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1 sm:mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2.5 sm:px-4 sm:py-3 glass rounded-xl text-white placeholder-gray-500 focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/50 transition-all resize-none text-left h-28 sm:h-36"
                  placeholder="Your message..."
                />
              </div>

              <button
                ref={submitBtnRef}
                type="submit"
                disabled={status === "sending"}
                className="w-full glass py-2.5 px-4 sm:py-4 sm:px-6 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl text-white font-bold text-sm sm:text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : status === "success" ? "Message Sent! ✓" : status === "error" ? "Error! Try Again" : "Send Message"}
              </button>

              {status === "success" && (
                <div className="text-center text-green-400 animate-fade-in font-medium text-sm sm:text-base">
                  Thank you! I&apos;ll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div className="text-center text-red-400 animate-fade-in font-medium text-sm sm:text-base">
                  Something went wrong. Please try again or email me directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
