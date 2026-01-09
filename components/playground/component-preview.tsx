"use client";

import { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ComponentPreviewProps {
  component: {
    id: string;
    name: string;
    props?: Record<string, any>;
  };
}

function ComponentPreview({ component }: ComponentPreviewProps) {
  // Simple preview renderer - in a real app, this would dynamically render components
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{component.name} Preview</h3>
            <div className="flex gap-2">
              <Button>Primary</Button>
              <Button variant="outline">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default memo(ComponentPreview);
