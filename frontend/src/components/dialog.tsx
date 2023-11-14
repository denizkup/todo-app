
import {MdClose} from "react-icons/md"

interface Props {
  children: React.ReactNode;
  open: boolean;
  onClose: Function;
}
export default function Dialog(props: Props) {
  const { open, onClose } = props;
  if (!open) {
    return (
      <>
      </>
    )
  }
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-transparent flex">
      <div className="relative p-8 w-full max-w-md m-auto flex-col flex rounded-lg
               bg-foreground dark:bg-foreground-dark shadow-2xl text-slate-500 dark:text-slate-100">
        <div>
          {props.children}
        </div>
        <span className="absolute top-0 right-0 p-1">     
          <button onClick={() => onClose()} className="rounded-full p-2 hover:bg-slate-400"><MdClose className="w-6 h-6"/></button>
        </span>
     </div>
   </div>
 );
}