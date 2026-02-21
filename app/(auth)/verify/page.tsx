"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

function VerifyForm() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { toast } = useToast();

  useEffect(() => {
    if (!email) {
      router.push("/login");
    }
  }, [email, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Verify code with our API first
      const res = await fetch(`/api/auth/otp?email=${email}&code=${code}`);
      const data = await res.json();

      if (data.valid) {
        toast({ title: "Success", description: "Code verified. Logging you in..." });
        signIn("credentials", { email, code, callbackUrl: "/dashboard" });
      } else {
        toast({ title: "Error", description: data.error || "Invalid code", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Verification failed", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="000000"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="text-center text-2xl tracking-[1rem] font-bold"
          required
        />
        <Button className="w-full" disabled={isLoading || code.length !== 6}>
          {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Verify & Continue"}
        </Button>
      </form>
    </CardContent>
  );
}

export default function VerifyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Verify Email</CardTitle>
          <CardDescription>Enter the 6-digit code sent to your email</CardDescription>
        </CardHeader>
        <Suspense fallback={
          <CardContent className="flex justify-center py-8">
            <Loader2 className="animate-spin h-8 w-8 text-primary" />
          </CardContent>
        }>
          <VerifyForm />
        </Suspense>
      </Card>
    </div>
  );
}
