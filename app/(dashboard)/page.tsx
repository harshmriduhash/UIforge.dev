"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Component, Zap, Users, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Components Created",
    value: "24",
    description: "+12% from last month",
    icon: Component,
  },
  {
    title: "Active Projects",
    value: "8",
    description: "+3 new this week",
    icon: Zap,
  },
  {
    title: "Team Members",
    value: "12",
    description: "+2 recently added",
    icon: Users,
  },
  {
    title: "Growth Rate",
    value: "24%",
    description: "+4% from last month",
    icon: TrendingUp,
  },
];

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="flex-1 space-y-8 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {session?.user?.name || "User"}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your projects today.
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest component creations and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Button Component</p>
                  <p className="text-xs text-muted-foreground">Created 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Card Component</p>
                  <p className="text-xs text-muted-foreground">Updated 5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Modal Component</p>
                  <p className="text-xs text-muted-foreground">Created yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
