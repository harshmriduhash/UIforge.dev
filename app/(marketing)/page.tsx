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
    content: "UIForge has transformed how we build UIs. The components are production-ready and beautifully designed.",
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
        {/* Hero Section */}
        <section className="container py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
            >
              Build Beautiful UI
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {" "}
                Components
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground sm:text-xl"
            >
              Prototype, preview, and reuse high-quality UI patterns with production-grade React
              architecture. Start building faster today.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
            >
              <Link href={session ? "/dashboard" : "/login"}>
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/dashboard/playground">
                <Button size="lg" variant="outline">
                  Explore Playground
                </Button>
              </Link>
            </motion.div>
          </motion.div>
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
                  <Card className="h-full transition-shadow hover:shadow-lg">
                    <CardHeader>
                      <feature.icon className="h-8 w-8 text-primary" />
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
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
                <Card>
                  <CardHeader>
                    <CardDescription className="text-base">{testimonial.content}</CardDescription>
                  </CardHeader>
                  <CardContent>
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
                Join thousands of developers building beautiful UIs with UIForge.
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
