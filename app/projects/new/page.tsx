import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { ProjectFormHeader } from "@/components/projects/ProjectFormHeader";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { ProjectProTip } from "@/components/projects/ProjectProTip";

export default function CreateProjectPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="flex justify-center py-10 px-4">
        <div className="w-full max-w-xl space-y-8">
          <ProjectFormHeader />
          <ProjectForm />
          <ProjectProTip />
        </div>
      </main>
    </div>
  );
}
