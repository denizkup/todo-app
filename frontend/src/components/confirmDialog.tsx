
import Dialog from './dialog';
import Button from './button';
interface Props {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: Function;
  onConfirm: Function; 
}
export default function ConfirmDialog(props: Props) {
  const { open, onClose, title, children, onConfirm } = props;
  if (!open) {
    return <></>;
  }
  
  return (
    <Dialog open={open} onClose={onClose}>
      <h2 className="text-xl">{title}</h2>
      <div className="py-5">{children}</div>
      <div className="flex justify-end">
        <div className="p-1">
          <Button
            onClick={() => onClose()}
            className="bg-secondary dark:bg-secondary-dark hover:bg-secondary-dark dark:hover:bg-secondary"
          >
            No
          </Button>
        </div>
        <div className="p-1">
          <Button
            onClick={() => {
              onClose();
              onConfirm();
            }}
            className='bg-primary dark:bg-primary-dark hover:bg-primary-dark dark:hover:bg-primary'
          >
            Yes
          </Button>
        </div>
      </div>
    </Dialog>
  );
}