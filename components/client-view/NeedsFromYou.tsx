import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

type Props = {
  blockers?: string;
  projectTitle?: string;
  contactEmail?: string; // optional but recommended
};

export function NeedsFromYou({
  blockers,
  projectTitle = "Project Update",
  contactEmail = "hello@projectly.com", // fallback
}: Props) {
  if (!blockers) return null;

  const subject = encodeURIComponent(
    `Re: Action Required – ${projectTitle}`
  );

  const body = encodeURIComponent(
    `Hi,\n\nRegarding the following item:\n\n"${blockers}"\n\nHere is my response:\n\n—`
  );

  const mailto = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">
        Needs From You
      </h2>

      <div className="rounded-xl border-l-4 border-amber-400 bg-card p-6 flex justify-between gap-4">
        <div className="flex gap-4">
          <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center">
            <Mail className="text-amber-600" />
          </div>

          <div>
            <p className="font-bold">Action Required</p>
            <p className="text-sm text-muted-foreground">
              {blockers}
            </p>
          </div>
        </div>

        <a href={mailto}>
          <Button size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Reply via Email
          </Button>
        </a>
      </div>
    </section>
  );
}
