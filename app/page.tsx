import { AuthHeader } from "@/components/layout/AuthHeader";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AuthHeader />

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Headline */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back
            </h1>
            <p className="text-muted-foreground mt-2">
              Log in to continue managing your client updates.
            </p>
          </div>

          <LoginForm />
        </div>
      </main>
    </div>
  );
}
