import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seeding...");

  const components = [
    {
      name: "Glassmorphic Card",
      description: "A modern glassmorphism card component with backdrop blur.",
      category: "Cards",
      isPremium: false,
      code: `import React from 'react';

export const GlassCard = ({ children, title }) => (
  <div className="relative group">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
    <div className="relative px-7 py-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg leading-none flex items-top justify-start space-x-6">
      <div className="space-y-2">
        <p className="text-slate-100 font-bold">{title}</p>
        <div className="text-slate-300 text-sm">{children}</div>
      </div>
    </div>
  </div>
);`,
    },
    {
      name: "Neon Button",
      description: "Eye-catching neon glow button with hover effects.",
      category: "Buttons",
      isPremium: false,
      code: `import React from 'react';

export const NeonButton = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="relative px-6 py-3 font-bold text-white group"
  >
    <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-purple-500 group-hover:translate-x-0 group-hover:translate-y-0"></span>
    <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
    <span className="relative">{children}</span>
  </button>
);`,
    },
    {
      name: "Animated Gradient Text",
      description: "Text component with a moving gradient background.",
      category: "Typography",
      isPremium: true,
      code: `import React from 'react';

export const GradientText = ({ text }) => (
  <h1 className="text-5xl font-extrabold">
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient-x">
      {text}
    </span>
  </h1>
);
// Make sure to add this to your tailwind config:
// keyframes: { 'gradient-x': { '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' }, '50%': { 'background-size': '200% 200%', 'background-position': 'right center' } } }`,
    },
    {
      name: "Stacked Navigation",
      description: "A clean, modern vertical navigation stack.",
      category: "Navigation",
      isPremium: true,
      code: `import React from 'react';
import { Home, Settings, User, Bell } from 'lucide-react';

export const SidebarNav = () => (
  <nav className="flex flex-col space-y-2 p-4 bg-slate-900 rounded-2xl w-64">
    {[
      { icon: Home, label: 'Dashboard', active: true },
      { icon: User, label: 'Profile' },
      { icon: Bell, label: 'Notifications' },
      { icon: Settings, label: 'Settings' },
    ].map((item) => (
      <button key={item.label} className={\`flex items-center space-x-3 px-4 py-3 rounded-xl transition \${item.active ? 'bg-primary text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}\`}>
        <item.icon size={20} />
        <span className="font-medium">{item.label}</span>
      </button>
    ))}
  </nav>
);`,
    },
    {
      name: "Pricing Toggle",
      description: "Monthly/Yearly pricing switcher with smooth animation.",
      category: "Interactive",
      isPremium: false,
      code: `import React, { useState } from 'react';

export const PricingToggle = () => {
  const [isYearly, setIsYearly] = useState(false);
  return (
    <div className="flex items-center justify-center space-x-4">
      <span className={!isYearly ? 'text-white' : 'text-slate-500'}>Monthly</span>
      <button 
        onClick={() => setIsYearly(!isYearly)}
        className="relative w-14 h-7 bg-slate-700 rounded-full transition p-1"
      >
        <div className={\`w-5 h-5 bg-white rounded-full transition transform \${isYearly ? 'translate-x-7' : 'translate-x-0'}\`} />
      </button>
      <span className={isYearly ? 'text-white' : 'text-slate-500'}>Yearly</span>
    </div>
  );
};`,
    },
  ];

  for (const component of components) {
    await prisma.component.upsert({
      where: { id: component.name.toLowerCase().replace(/ /g, "-") }, // Using name as base for mock ID
      update: {},
      create: {
        id: component.name.toLowerCase().replace(/ /g, "-"),
        ...component,
      },
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
