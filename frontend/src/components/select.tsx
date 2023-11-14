type SelectProps = {
    name: string,
    label:string,
    errors?:any
    validationSchema?:any
    register?:any
    required?:boolean,
    options:Array<authLevelOption>
}

type authLevelOption = {
    value:string,
    name:string
  }
  

export default function Select(props:SelectProps) {
    const {name,label,options=[],errors,validationSchema,register,required} = props;
    console.log("options ",options)

    return (
        <div className="relative">
            <select defaultValue="Choose" placeholder="Auth Level"
                    {...register(name, validationSchema)}

                    className=' block text-center px-2.5 pb-2.5 pt-4 w-full text-md text-gray-900 bg-transparent rounded-lg border border-text-primary
                    dark:text-primary-textDark dark:border-primary-textDark dark:focus:border-primary-dark focus:outline-none focus:ring-0 focus:border-primary peer'>
                        <option value="" selected hidden>Please select</option>

                        {options.map((option) => {
                            return <option value={option?.value}>{option?.name}</option>
                        })
                        }
            </select>
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
    )

}