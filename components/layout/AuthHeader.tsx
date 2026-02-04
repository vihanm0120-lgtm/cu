"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function AuthHeader() {
  const pathname = usePathname();

  const isLoginPage = pathname === "/";

  return (
    <header className="border-b bg-background">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 font-bold text-lg">
          <div className="h-8 w-8 text-primary">
            <svg viewBox="0 0 48 48" fill="currentColor">
              <path d="M24 0.757 47.243 24 24 47.243 0.757 24z" />
            </svg>
          </div>
          Projectly
        </div>

        {/* Right action */}
        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-sm text-muted-foreground">
            {isLoginPage
              ? "Don’t have an account?"
              : "Already have an account?"}
          </span>

          <Button variant="outline" asChild>
            <Link href={isLoginPage ? "/signup" : "/"}>
              {isLoginPage ? "Sign up" : "Log in"}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
