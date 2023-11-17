
import Dialog from '../../components/dialog';

interface Props {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: Function;
}
export default function UserAddDialog(props: Props) {
  const { open, onClose, title, children } = props;
  if (!open) {
    return <></>;
  }
  
  return (
    <Dialog open={open} onClose={onClose}>
      <h2 className="text-3xl mb-2">{title}</h2>
      <div className="py-5">{children}</div>
    </Dialog>
  );
}