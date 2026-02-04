import { AuthHeader } from "@/components/layout/AuthHeader";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AuthHeader />

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Headline */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Create your provider account
            </h1>
            <p className="text-muted-foreground mt-2">
              Start sharing project updates with your clients in minutes.
            </p>
          </div>

          <SignupForm />
        </div>
      </main>
    </div>
  );
}
