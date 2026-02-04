/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Send, Eye } from "lucide-react";

type Props = {
  onPublish: () => void;
  onPreview?: () => void;
  saving?: any
};

export function UpdateActions({
  onPublish,
  onPreview,
  saving
}: Props) {
  return (
    <div className="flex items-center justify-between pt-6 pb-10">
      <div className="flex items-center gap-3">
        <Button
  onClick={onPublish}
  disabled={saving}
>
  <Send className="mr-2 h-4 w-4" />
  {saving ? "Publishing..." : "Publish Update"}
</Button>


        {onPreview && (
          <Button
            variant="outline"
            onClick={onPreview}
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
        )}
      </div>

      <button
        type="button"
        className="text-sm text-muted-foreground hover:text-destructive"
        onClick={() => window.history.back()}
      >
        Cancel
      </button>
    </div>
  );
}
