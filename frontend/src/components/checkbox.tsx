
import { ComponentProps } from "react";
// type CheckboxProps =  {
//     color?:string
// };

// const defaultProps = {
//     color : "primary",
// }
// CheckboxProps & typeof defaultProps & 
const Checkbox = ({...props}:ComponentProps<"input">)=> {
    return(
    <div className=" flex justify-center items-center">
        <input type="checkbox" 
               {...props}
               className={`appearance-none border-2 rounded-md w-6 h-6 border-primary-light dark:border-primary-dark checked:bg-primary-light dark:checked:bg-primary-dark`} 
               
            />
        <svg className="fill-current hidden w-4 h-4 text-white pointer-events-none absolute" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
    </div>  
    )
}
// Checkbox.defaultProps = defaultProps;
export default Checkbox;