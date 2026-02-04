type Props = {
  launchDate?: string;
  contactName?: string;
};

export function ProjectSidebar({
  launchDate,
  contactName,
}: Props) {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <h3 className="text-sm uppercase font-bold text-muted-foreground">
        Project Info
      </h3>

      {launchDate && (
        <div className="text-sm">
          <p className="text-muted-foreground">
            Launch Date
          </p>
          <p className="font-bold">
            {launchDate}
          </p>
        </div>
      )}

      {contactName && (
        <div className="text-sm">
          <p className="text-muted-foreground">
            Primary Contact
          </p>
          <p className="font-bold">
            {contactName}
          </p>
        </div>
      )}
    </div>
  );
}
