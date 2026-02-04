import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ProjectGrid } from "@/components/dashboard/ProjectGrid";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <PageHeader />
        <ProjectGrid />
      </main>
    </div>
  );
}
