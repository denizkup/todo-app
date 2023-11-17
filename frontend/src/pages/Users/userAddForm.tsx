import { useForm } from "react-hook-form";
import Input from "../../components/input";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../components/button";
import Select from "../../components/select";


const formSchema = Yup.object().shape({

    email: Yup.string()
        .email("Wrong email format!")
        .required("Email is required"),


    name:Yup.string()
        .required("Name is requiered")
        .min(2, "Name length should be at least 2 characters"),

    lastname:Yup.string()
        .required("Lastname is requiered")
        .min(2, "Lastname length should be at least 2 characters"),

    password: Yup.string()
      .required("Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters"),

    cpassword: Yup.string()
      .required("Confirm Password is required")
      .min(4, "Password length should be at least 4 characters")
      .max(12, "Password cannot exceed more than 12 characters")
      .oneOf([Yup.ref("password")], "Passwords do not match"),

    auth_level:Yup.string()
      .required("Auth level is requiered")
      .oneOf(["ADMIN","USER"], "Auth level not valid!"),
});

export default function UserAddForm(props:any) {
    const { register, handleSubmit, formState: { errors },reset} = useForm({ mode: "onBlur",
                                                                         resolver: yupResolver(formSchema)});

    const {addUserHandler} = props;
                                                                    

  const onSubmit = (data:any) => {
    addUserHandler(data)
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4 px-5">
            <Input name="email" label="Email" type="email" errors={errors} register={register} required={true}/>
            <Input name="name" label="Name" type="text" errors={errors} register={register} required={true}/>
            <Input name="lastname" label="Lastname" type="text" errors={errors} register={register} required={true}/>
            <Input name="password" label="Password" type="password" errors={errors} register={register} required={true}/>
            <Input name="cpassword" label="Password Confirm" type="password" errors={errors} register={register} required={true}/>
            <Select name="auth_level" label="Auth Level" errors={errors} register={register} required={true} options={[{value:"USER",name:"User"},{value:"ADMIN",name:"Administrator"}]}/>
            <Button type="submit" disabled={Object.keys(errors).length > 0}>
                Add
            </Button> 
        </div>
      
    </form>
  );
}