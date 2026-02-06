"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

interface Step {
  title: string;
  description: string;
  component: React.ReactNode;
}

interface MultiStepFormProps {
  steps: Step[];
  onSubmit: (data: Record<string, any>) => void;
}

export function MultiStepForm({ steps, onSubmit }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Multi-Step Form</CardTitle>
        <CardDescription>
          Step {currentStep + 1} of {steps.length}
        </CardDescription>
        <Progress value={progress} className="mt-4" />
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {steps[currentStep].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {steps[currentStep].description}
                </p>
              </div>
              {steps[currentStep].component}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          {currentStep === steps.length - 1 ? (
            <Button onClick={handleSubmit}>Submit</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
