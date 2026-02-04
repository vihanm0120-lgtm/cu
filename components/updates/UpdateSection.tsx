import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  variant?: "warning";
};

export function UpdateSection({
  title,
  icon,
  placeholder,
  value,
  onChange,
  variant,
}: Props) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card shadow-sm",
        variant === "warning" &&
          "border-amber-200 bg-amber-50/40"
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-5 pt-4">
        {icon}
        <h2 className="font-semibold text-base">{title}</h2>
      </div>

      {/* Body */}
      <div className="p-4 pt-2">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "min-h-[120px] resize-none",
            variant === "warning" &&
              "border-amber-200 focus-visible:ring-amber-300"
          )}
        />
      </div>
    </div>
  );
}
