type Props = {
  warningMessage: string;
  handleDelete?: () => void;
  onCancel?: () => void;
};

const WarningModal = ({ warningMessage }: Props) => {
  return <div className="space-y-2">{warningMessage}</div>;
};

export default WarningModal;
