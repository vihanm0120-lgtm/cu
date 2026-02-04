import { Button } from "@/components/ui/button";

type Props = {
  submitLabel?: string;
  onCancel?: () => void;
};

export function ProjectFormActions({
  submitLabel = "Save Project",
  onCancel,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
      <Button
        type="button"
        variant="ghost"
        className="w-full sm:w-auto"
        onClick={onCancel}
      >
        Cancel
      </Button>

      <Button type="submit" className="w-full sm:w-auto">
        {submitLabel}
      </Button>
    </div>
  );
}
