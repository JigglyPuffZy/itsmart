import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Loader2,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  TicketCheck,
  MonitorSmartphone,
  BarChart3,
  CalendarDays,
  Lock,
  Mail,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ModulePreview } from "@/components/login/module-previews";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const ROTATING_LINES = [
  "Track every asset. Resolve every ticket.",
  "Your IT operations command center.",
  "DOST Cagayan Valley — secure by design.",
];

const MODULES = [
  {
    type: "tickets",
    icon: TicketCheck,
    title: "Support tickets",
    desc: "Submit and resolve requests",
    color: "from-amber-500/25 via-amber-500/10 to-transparent",
    iconColor: "text-amber-400",
    glow: "bg-amber-400",
    ring: "ring-amber-400/40",
  },
  {
    type: "assets",
    icon: MonitorSmartphone,
    title: "Asset inventory",
    desc: "Equipment lifecycle tracking",
    color: "from-sky-500/25 via-sky-500/10 to-transparent",
    iconColor: "text-sky-400",
    glow: "bg-sky-400",
    ring: "ring-sky-400/40",
  },
  {
    type: "reports",
    icon: BarChart3,
    title: "Reports",
    desc: "Insights and analytics",
    color: "from-emerald-500/25 via-emerald-500/10 to-transparent",
    iconColor: "text-emerald-400",
    glow: "bg-emerald-400",
    ring: "ring-emerald-400/40",
  },
  {
    type: "calendar",
    icon: CalendarDays,
    title: "Calendar",
    desc: "Maintenance scheduling",
    color: "from-violet-500/25 via-violet-500/10 to-transparent",
    iconColor: "text-violet-400",
    glow: "bg-violet-400",
    ring: "ring-violet-400/40",
  },
];

function LoginModuleCard({
  mod,
  index,
  isActive,
}: {
  mod: (typeof MODULES)[number];
  index: number;
  isActive: boolean;
}) {
  const Icon = mod.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.1 + index * 0.07, type: "spring", stiffness: 280, damping: 24 }}
      className="login-module-card group relative flex h-full min-h-0 cursor-default flex-col overflow-hidden rounded-lg border border-white/[0.08] p-2.5 sm:p-3"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${mod.color}`} />
      <motion.div
        animate={{ opacity: isActive ? [0.3, 0.55, 0.3] : 0.12 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -right-4 -top-4 h-16 w-16 rounded-full blur-2xl ${mod.glow}`}
      />
      <motion.div
        animate={{ opacity: isActive ? 1 : 0 }}
        className={`absolute inset-0 rounded-lg ring-2 ${mod.ring}`}
        transition={{ duration: 0.4 }}
      />

      <div className="relative flex h-full min-h-0 flex-col">
        <div className="flex shrink-0 items-center gap-2">
          <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/[0.1] ${mod.iconColor}`}>
            <Icon className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-white/95 leading-tight">{mod.title}</p>
            <p className="text-[9px] text-white/40 leading-snug line-clamp-1">{mod.desc}</p>
          </div>
        </div>
        <div className="mt-1.5 min-h-0 flex-1">
          <ModulePreview type={mod.type} isActive={isActive} />
        </div>
      </div>
    </motion.div>
  );
}

export default function Login() {
  const { login } = useAuth();
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [activeModule, setActiveModule] = useState(0);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    const timer = setInterval(() => setLineIndex((i) => (i + 1) % ROTATING_LINES.length), 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActiveModule((i) => (i + 1) % MODULES.length), 2800);
    return () => clearInterval(timer);
  }, []);

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsPending(true);
    try {
      await login(values);
    } catch {
      setIsPending(false);
    }
  };

  return (
    <div className="relative flex h-dvh max-h-dvh items-center justify-center overflow-hidden bg-[hsl(207_32%_10%)] p-2 sm:p-3">
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(hsl(207 55% 62% / 0.07) 1px, transparent 1px),
              linear-gradient(90deg, hsl(207 55% 62% / 0.07) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[50%] w-[70%] rounded-full bg-[hsl(207_55%_50%/0.12)] blur-[90px]" />
      </div>

      {/* Main panel — locked to viewport */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 flex h-full max-h-[calc(100dvh-1rem)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/10 shadow-[0_32px_80px_rgba(0,0,0,0.45)] lg:grid lg:grid-cols-5 lg:rounded-[1.5rem]"
        style={{
          background: "linear-gradient(160deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 100%)",
          backdropFilter: "blur(32px)",
        }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

        {/* Mobile brand strip */}
        <div className="flex shrink-0 items-center gap-2.5 border-b border-white/[0.08] px-4 py-3 lg:hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
            <img src="/dostlogo.png" alt="DOST" className="h-6 w-6 object-contain" />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">DOST Cagayan Valley</p>
            <h1 className="font-display text-xl font-bold text-white">
              IT<span className="text-accent">SMART</span>
            </h1>
          </div>
        </div>

        {/* Left: brand + modules (desktop) */}
        <div className="hidden min-h-0 flex-col overflow-hidden lg:flex lg:col-span-3 p-4 sm:p-5 lg:p-6">
          <div className="flex shrink-0 items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15 sm:h-11 sm:w-11">
                <img src="/dostlogo.png" alt="DOST" className="h-7 w-7 object-contain sm:h-8 sm:w-8" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45 sm:text-[10px]">
                  DOST Cagayan Valley
                </p>
                <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  IT<span className="text-accent">SMART</span>
                </h1>
              </div>
            </div>
            <div className="hidden sm:flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10px] font-medium text-white/50">Online</span>
            </div>
          </div>

          <div className="mt-3 h-9 shrink-0 overflow-hidden sm:mt-4 sm:h-10">
            <AnimatePresence mode="wait">
              <motion.p
                key={lineIndex}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4 }}
                className="text-base font-display font-semibold text-white/90 leading-snug sm:text-lg"
              >
                {ROTATING_LINES[lineIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-2 grid min-h-0 flex-1 grid-cols-2 gap-1.5 sm:gap-2">
            {MODULES.map((mod, i) => (
              <LoginModuleCard key={mod.title} mod={mod} index={i} isActive={activeModule === i} />
            ))}
          </div>

          <div className="mt-2 flex shrink-0 flex-wrap items-center gap-x-3 gap-y-0.5 text-[10px] text-white/30">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              Authorized personnel only
            </span>
            <span className="flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Access monitored
            </span>
          </div>
        </div>

        {/* Sign in */}
        <div className="relative flex min-h-0 flex-1 flex-col justify-center overflow-hidden bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-4 sm:p-5 lg:col-span-2 lg:border-l lg:border-white/[0.08] lg:p-6">
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="mb-3 sm:mb-4">
              <div className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-0.5 lg:inline-flex">
                <Lock className="h-3 w-3 text-accent/80" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">
                  Secure sign in
                </span>
              </div>
              <h2 className="font-display text-xl font-bold text-white lg:mt-3 sm:text-2xl">Welcome back</h2>
              <p className="mt-1 text-xs text-white/45 sm:text-sm">
                Sign in with your DOST Cagayan Valley credentials.
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.1] bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:rounded-2xl sm:p-5">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[11px] font-medium text-white/55">Email</FormLabel>
                        <FormControl>
                          <div className="group relative">
                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30 group-focus-within:text-accent/80" />
                            <Input
                              type="email"
                              autoComplete="email"
                              placeholder="you@dost.gov.ph"
                              {...field}
                              className="h-10 rounded-lg border-white/[0.08] bg-white/[0.05] pl-9 text-sm text-white placeholder:text-white/25 focus-visible:border-accent/40 focus-visible:ring-accent/20"
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-300 text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[11px] font-medium text-white/55">Password</FormLabel>
                        <FormControl>
                          <div className="group relative">
                            <Lock className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30 group-focus-within:text-accent/80" />
                            <Input
                              type={showPassword ? "text" : "password"}
                              autoComplete="current-password"
                              placeholder="Enter your password"
                              {...field}
                              className="h-10 rounded-lg border-white/[0.08] bg-white/[0.05] pl-9 pr-10 text-sm text-white placeholder:text-white/25 focus-visible:border-accent/40 focus-visible:ring-accent/20"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword((v) => !v)}
                              aria-label={showPassword ? "Hide password" : "Show password"}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 hover:text-white/70"
                            >
                              {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-300 text-xs" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="group mt-0.5 h-10 w-full rounded-lg border-0 bg-gradient-to-r from-[hsl(207_55%_48%)] to-[hsl(207_65%_42%)] text-sm font-semibold text-white shadow-[0_6px_24px_hsl(207_55%_40%/0.35)] hover:brightness-110"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in to ITSMART
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            <p className="mt-3 text-center text-[10px] leading-relaxed text-white/35 sm:text-[11px]">
              Need help? Contact your MIS Admin for password reset or access.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
