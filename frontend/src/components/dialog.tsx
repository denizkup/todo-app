
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
      <div className="relative w-full max-w-lg m-auto flex-col flex rounded-lg
               bg-foreground dark:bg-foreground-dark shadow-2xl text-primary-text dark:text-primary-textDark">
        <div className="p-8">
          {props.children}
        </div>
        <span className="absolute top-0 right-0 p-3">     
          <button onClick={() => onClose()} className="rounded-full p-2 hover:bg-slate-400"><MdClose className="w-7 h-7"/></button>
        </span>
     </div>
   </div>
 );
}