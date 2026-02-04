/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function SignupForm() {
  const { signup } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      await signup({ name, email, password });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="pt-6 space-y-5">
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Email Address</Label>
          <Input
            type="email"
            placeholder="work@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <Button
          className="w-full"
          size="lg"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Account"}
        </Button>
      </CardContent>

      <CardFooter className="border-t text-xs text-muted-foreground text-center py-4">
        By signing up, you agree to our&nbsp;
        <span className="text-primary">Terms</span> and&nbsp;
        <span className="text-primary">Privacy Policy</span>.
      </CardFooter>
    </Card>
  );
}
