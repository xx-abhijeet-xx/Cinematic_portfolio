import { useRef, useState, useCallback, type FormEvent } from "react";
import { useReveal } from "@/hooks/useReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SITE } from "@/lib/constants";

type FormStatus = 'idle' | 'success' | 'submitting' | 'error'

const CONTACT_LINKS = [
  {
    label: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: "✉",
  },
  {
    label: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s/g, "")}`,
    icon: "☏",
  },
  {
    label: `@${SITE.instagram.split("/").pop()}`,
    href: SITE.instagram,
    icon: "◎",
    external: true,
  },
] as const;

export function Contact() {
  const leftRef = useReveal<HTMLDivElement>();
  const rightRef = useReveal<HTMLDivElement>();

  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const data = new FormData(formRef.current);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const type = data.get("project_type") as string;
    const message = data.get("message") as string;

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project Type: ${type}`,
      ``,
      `Message:`,
      message,
    ].join("%0A");

    const subject = encodeURIComponent(`Project Enquiry from ${name}`);

    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;

    setStatus("success");
    formRef.current.reset();
  }, []);

  return (
    <section
      id="contact"
      className="relative py-24 md:py-36 px-6 md:px-[60px] overflow-hidden"
    >
      {/* Ghost text */}
      <p
        aria-hidden="true"
        className="absolute -bottom-8 -left-4 font-display text-ivory/[0.018] whitespace-nowrap pointer-events-none select-none leading-none"
        style={{ fontSize: "clamp(80px, 17vw, 240px)" }}
      >
        LET'S TALK
      </p>

      <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24 items-start">
        {/* Left — heading + links */}
        <div ref={leftRef} className="reveal-up">
          <p className="deco-line font-body text-[10px] tracking-ultra uppercase text-gold mb-7">
            Get In Touch
          </p>

          <h2
            className="font-display leading-hero text-ivory mb-7"
            style={{ fontSize: "clamp(50px, 8vw, 115px)" }}
          >
            GOT A
            <span
              className="block font-serif italic font-light text-gold"
              style={{ fontSize: "0.62em", lineHeight: 1.1 }}
            >
              project?
            </span>
            LET'S GO
          </h2>

          <p className="font-body font-light text-[14px] leading-[1.85] text-lgrey max-w-[370px] mb-12">
            Whether you have a brief, a budget, or just a vibe — reach out. I
            love building things from scratch.
          </p>

          <ul className="flex flex-col list-none">
            {CONTACT_LINKS.map(({ label, href, icon }) => (
              <li key={href}>
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="
                    group flex items-center gap-4 py-[18px]
                    border-b border-white/[0.06]
                    font-body text-[13px] tracking-[0.08em] text-lgrey
                    hover:text-gold hover:pl-2
                    transition-all duration-300
                    cursor-none
                  "
                >
                  <span
                    className="
                    w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center
                    text-gold text-sm shrink-0
                    group-hover:bg-gold/[0.08] group-hover:border-gold/50
                    transition-all duration-300
                  "
                  >
                    {icon}
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — form */}
        <div
          ref={rightRef}
          className="reveal-up"
          style={{ transitionDelay: "150ms" }}
        >
          {status === "success" ? (
            <div className="flex flex-col items-start gap-4 py-12">
              <span className="font-display text-[60px] text-gold leading-none">
                ✓
              </span>
              <p className="font-serif italic text-[22px] text-ivory">
                Message received.
              </p>
              <p className="font-body font-light text-[14px] text-lgrey">
                I'll get back to you soon. Looking forward to it.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 font-body text-[10px] tracking-[0.2em] uppercase text-gold border-b border-gold/40 hover:border-gold transition-colors duration-300 cursor-none"
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FloatingInput
                  id="f-name"
                  name="name"
                  label="Your Name"
                  type="text"
                  required
                />
                <FloatingInput
                  id="f-email"
                  name="email"
                  label="Email Address"
                  type="email"
                  required
                />
              </div>
              <FloatingInput
                id="f-type"
                name="project_type"
                label="Project Type (Ad Film, Wedding…)"
                type="text"
              />
              <FloatingTextarea
                id="f-msg"
                name="message"
                label="Tell me about the project"
                required
              />

              {status === "error" && (
                <p
                  role="alert"
                  className="font-body text-[12px] tracking-[0.1em] text-red-400"
                >
                  ✕ {errorMsg} — or email directly at{" "}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="underline hover:text-gold"
                  >
                    {SITE.email}
                  </a>
                </p>
              )}

              <MagneticButton type="submit" disabled={status === "submitting"}>
                <span>
                  {status === "submitting" ? "Sending…" : "Send Message"}
                </span>
                {status !== "submitting" && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </MagneticButton>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FloatingInput({
  id,
  name,
  label,
  type,
  required,
}: {
  id: string;
  name: string;
  label: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div className="relative group">
      <input
        id={id}
        name={name}
        type={type}
        placeholder=" "
        required={required}
        autoComplete={name}
        className="
          peer w-full bg-transparent border-0 border-b border-white/10
          pt-5 pb-2 px-0
          font-body font-light text-[13px] text-ivory
          placeholder-transparent
          focus:border-gold focus:outline-none
          transition-colors duration-300
        "
      />
      <label
        htmlFor={id}
        className="
          absolute left-0 top-5
          font-body text-[10px] tracking-[0.2em] uppercase text-mgrey
          pointer-events-none
          transition-all duration-300
          peer-focus:-translate-y-5 peer-focus:text-[8px] peer-focus:text-gold
          peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:text-[8px]
        "
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({
  id,
  name,
  label,
  required,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        rows={4}
        placeholder=" "
        required={required}
        className="
          peer w-full bg-transparent border-0 border-b border-white/10
          pt-5 pb-2 px-0
          font-body font-light text-[13px] text-ivory
          placeholder-transparent resize-none
          focus:border-gold focus:outline-none
          transition-colors duration-300
        "
      />
      <label
        htmlFor={id}
        className="
          absolute left-0 top-5
          font-body text-[10px] tracking-[0.2em] uppercase text-mgrey
          pointer-events-none
          transition-all duration-300
          peer-focus:-translate-y-5 peer-focus:text-[8px] peer-focus:text-gold
          peer-not-placeholder-shown:-translate-y-5 peer-not-placeholder-shown:text-[8px]
        "
      >
        {label}
      </label>
    </div>
  );
}
