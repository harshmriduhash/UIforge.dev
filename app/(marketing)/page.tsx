"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Code, Palette, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built with performance in mind. Every component is optimized for speed.",
  },
  {
    icon: Code,
    title: "Production Ready",
    description: "Copy-paste components that work out of the box. No configuration needed.",
  },
  {
    icon: Palette,
    title: "Beautiful Design",
    description: "Carefully crafted UI components that follow modern design principles.",
  },
  {
    icon: Sparkles,
    title: "Fully Customizable",
    description: "Easily customize components to match your brand and design system.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Frontend Lead",
    company: "TechCorp",
    content: "Glint has transformed how we build UIs. The components are production-ready and beautifully designed.",
  },
  {
    name: "Michael Rodriguez",
    role: "Product Designer",
    company: "StartupXYZ",
    content: "The best UI component library I've used. It's fast, customizable, and the code quality is excellent.",
  },
  {
    name: "Emily Johnson",
    role: "Full Stack Developer",
    company: "DevStudio",
    content: "Saves me hours of work. The playground feature is a game-changer for prototyping.",
  },
];

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[120px] animate-pulse-slow" />
          <div className="absolute top-[20%] -right-[10%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px] animate-pulse-slow font-delay-2000" />
        </div>

        <section className="container relative py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-[64rem] text-center flex flex-col items-center gap-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center rounded-full glass-effect px-4 py-1.5 text-sm font-medium"
            >
              <Sparkles className="mr-2 h-4 w-4 text-indigo-400" />
              <span className="shimmer-text font-semibold uppercase tracking-wider text-[10px]">Now with Claude 3.5 & OpenAI o1</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Forge <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-shimmer bg-[length:200%_auto]">Premium</span> <br />
              UI with AI Spark
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-8"
            >
              Prototype, preview, and reuse high-quality UI patterns with production-grade React
              architecture. Built for senior engineers who demand the best.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <Link href={session ? "/dashboard" : "/login"}>
                <Button size="lg" className="h-12 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all hover:scale-105 active:scale-95 group">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#preview">
                <Button size="lg" variant="outline" className="h-12 px-8 rounded-xl glass-effect border-white/10 hover:bg-white/5 transition-all text-slate-200">
                  Explore Playground
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Featured Components Section */}
        <section id="preview" className="container py-24 border-t border-white/5 bg-slate-950/20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl white-glow">
              Featured Components
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              A glimpse into the high-performance UI patterns you can forge.
            </p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2 lg:px-12">
            {/* Example 1: Glassmorphic Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative flex flex-col items-center justify-center p-12 rounded-3xl glass-effect overflow-hidden animate-float"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative group w-full max-w-md">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600/50 to-purple-600/50 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative px-7 py-10 bg-black/40 backdrop-blur-3xl border border-white/20 rounded-2xl leading-none flex items-top justify-start space-x-6">
                  <div className="space-y-4">
                    <p className="text-2xl text-indigo-100 font-bold tracking-tight">Glassmorphic Card</p>
                    <p className="text-indigo-200/60 text-sm leading-relaxed">
                      Advanced backdrop filter effects combined with segmented
                      gradients for a truly depth-driven interface.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 py-1 px-3 glass-effect rounded-full">React</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 py-1 px-3 glass-effect rounded-full">Tailwind</span>
              </div>
            </motion.div>

            {/* Example 2: Neon Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative flex flex-col items-center justify-center p-12 rounded-3xl glass-effect overflow-hidden animate-float font-delay-1000"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <button className="relative px-10 py-5 font-bold text-white group overflow-hidden rounded-lg">
                <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-indigo-500 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full border-4 border-white/90"></span>
                <span className="relative tracking-widest text-sm uppercase">Neon Presence</span>
              </button>
              <div className="mt-14 flex gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-pink-400 py-1 px-3 glass-effect rounded-full">Interactive</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-pink-400 py-1 px-3 glass-effect rounded-full">Premium</span>
              </div>
            </motion.div>
          </div>

          <div className="mt-20 text-center">
            <Link href={session ? "/dashboard/playground" : "/login"}>
              <Button size="lg" className="h-12 px-10 rounded-xl bg-white text-slate-950 hover:bg-slate-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                View All in Playground
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t bg-muted/50 py-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to build modern UIs
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A comprehensive collection of React components designed for speed and flexibility.
              </p>
            </motion.div>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full transition-all hover:scale-105 glass-effect border-white/5 hover:border-indigo-500/30 text-center group">
                    <CardHeader className="flex flex-col items-center">
                      <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 group-hover:bg-indigo-500/20 transition-colors">
                        <feature.icon className="h-8 w-8 text-indigo-400" />
                      </div>
                      <CardTitle className="mt-4">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-400">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Loved by developers worldwide
            </h2>
          </motion.div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <CardHeader className="flex flex-col items-center">
                    <CardDescription className="text-base">{testimonial.content}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center">
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t bg-primary text-primary-foreground py-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to start building?
              </h2>
              <p className="mt-4 text-lg opacity-90">
                Join thousands of developers building beautiful UIs with Glint.
              </p>
              <div className="mt-10">
                <Link href={session ? "/dashboard" : "/login"}>
                  <Button size="lg" variant="secondary" className="group">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
