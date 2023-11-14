
type InputProps = {
    name: string,
    label:string,
    type?: 'text' | 'password' | 'email',
    errors?:any
    validationSchema?:any
    register?:any
    required?:boolean
}
export default function Input(props:InputProps) {
    const {name,label,type = 'text',errors,validationSchema,register,required} = props;
    return(
        <div>   
            <div className="relative">
                <input type={type} 
                       id={name}
                       name={name}
                       {...register(name, validationSchema)}
                       className="block text-center px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border border-text-primary appearance-none 
                                dark:text-primary-textDark dark:border-primary-textDark dark:focus:border-primary-dark focus:outline-none focus:ring-0 focus:border-primary peer" placeholder="" />
    
                <label htmlFor={name}
                       className={`absolute text-md text-primary-text duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-foreground dark:bg-foreground-dark px-2 
                                  peer-focus:px-2 
                                  peer-focus:text-primary
                                  peer-focus:dark:text-primary-dark
                                  peer-placeholder-shown:scale-100 
                                  peer-placeholder-shown:-translate-y-1/2 
                                  peer-placeholder-shown:top-1/2 
                                  peer-focus:top-1
                                  peer-focus:scale-75 
                                  peer-focus:-translate-y-4
                                  rtl:peer-focus:translate-x-1/4 
                                  rtl:peer-focus:left-auto 
                                  start-1
                                  ${errors[name] ? "text-red-600 dark:text-red-500" : "text-primary-text dark:text-primary-textDark"}
                                  `}>
                        {required && "* "}
                        {label}
    
                </label>
            </div>
            {errors[name] && 
                <p  className="mt-2 text-xs text-red-600 dark:text-red-500">
                    <span className="font-medium">*</span> {errors[name]?.message}</p>
            }

        </div>
    )
    
}