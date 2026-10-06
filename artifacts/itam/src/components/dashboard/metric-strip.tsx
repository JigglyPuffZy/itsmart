import { Link } from "wouter";

import { motion } from "framer-motion";

import { ArrowUpRight } from "lucide-react";

import type { MetricConfig, MetricAccent } from "./metric-cards";

import { cn } from "@/lib/utils";



const accentMap: Record<

  MetricAccent,

  {

    surface: string;

    border: string;

    accent: string;

    icon: string;

    label: string;

  }

> = {

  primary: {

    surface: "from-white via-white to-primary/[0.06]",

    border: "border-primary/12 group-hover:border-primary/22",

    accent: "bg-primary",

    icon: "bg-primary/10 text-primary ring-primary/15",

    label: "text-primary/75",

  },

  warning: {

    surface: "from-white via-white to-amber-500/[0.07]",

    border: "border-amber-500/12 group-hover:border-amber-500/22",

    accent: "bg-amber-500",

    icon: "bg-amber-500/10 text-amber-700 ring-amber-500/18",

    label: "text-amber-700/75",

  },

  success: {

    surface: "from-white via-white to-emerald-500/[0.07]",

    border: "border-emerald-500/12 group-hover:border-emerald-500/22",

    accent: "bg-emerald-500",

    icon: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/18",

    label: "text-emerald-700/75",

  },

  info: {

    surface: "from-white via-white to-sky-500/[0.07]",

    border: "border-sky-500/12 group-hover:border-sky-500/22",

    accent: "bg-sky-500",

    icon: "bg-sky-500/10 text-sky-700 ring-sky-500/18",

    label: "text-sky-700/75",

  },

  violet: {

    surface: "from-white via-white to-violet-500/[0.07]",

    border: "border-violet-500/12 group-hover:border-violet-500/22",

    accent: "bg-violet-500",

    icon: "bg-violet-500/10 text-violet-700 ring-violet-500/18",

    label: "text-violet-700/75",

  },

};



interface MetricStripProps {

  metrics: MetricConfig[];

}



export function MetricStrip({ metrics }: MetricStripProps) {

  const shown = metrics.slice(0, 4);



  return (

    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">

      {shown.map((metric, i) => {

        const accent = accentMap[metric.accent];

        return (

          <motion.div

            key={metric.title}

            initial={{ opacity: 0, y: 14 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ delay: 0.08 + i * 0.07, type: "spring", stiffness: 320, damping: 28 }}

          >

            <Link href={metric.href}>

              <article

                className={cn(

                  "group relative flex min-h-[112px] flex-col justify-between overflow-hidden rounded-2xl border bg-gradient-to-br p-4",

                  "border-white/80 shadow-[0_4px_20px_rgba(53,88,114,0.06)] backdrop-blur-sm",

                  "transition-all duration-300 hover:-translate-y-0.5 hover:bg-card/90 hover:shadow-[0_12px_32px_rgba(53,88,114,0.1)]",

                  accent.surface,

                  accent.border

                )}

              >

                <div

                  aria-hidden

                  className={cn(

                    "pointer-events-none absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full opacity-70 transition-opacity duration-300 group-hover:opacity-100",

                    accent.accent

                  )}

                />



                <div className="relative flex items-start justify-between gap-2 pl-2">

                  <div

                    className={cn(

                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-[1.03]",

                      accent.icon

                    )}

                  >

                    <metric.icon className="h-[17px] w-[17px]" />

                  </div>

                  <span

                    className={cn(

                      "flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground/50",

                      "opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"

                    )}

                  >

                    <ArrowUpRight className="h-3.5 w-3.5" />

                  </span>

                </div>



                <div className="relative mt-3 pl-2">

                  <p className={cn("text-[10px] font-semibold uppercase tracking-[0.12em]", accent.label)}>

                    {metric.title}

                  </p>

                  <p className="mt-0.5 font-display text-3xl font-bold tabular-nums tracking-tight text-foreground">

                    {metric.value}

                  </p>

                </div>

              </article>

            </Link>

          </motion.div>

        );

      })}

    </div>

  );

}

