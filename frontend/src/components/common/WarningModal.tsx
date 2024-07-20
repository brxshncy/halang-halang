import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type Props = {
  warningMessage: string;
  handleDelete?: () => void;
  onCancel?: () => void;
};

const WarningModal = ({ warningMessage }: Props) => {
  return (
    <div className="space-y-2">
      {warningMessage}

      <div className="flex flex-col gap-2 mt-3">
        <Button variant="outline">Cancel</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    </div>
  );
};

export default WarningModal;
