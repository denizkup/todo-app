
// import React from 'react'
// import { Form,Field,Formik,ErrorMessage } from "formik"
// import { loginRequest } from '../../services/auth.service'
// import { useMutation } from '@tanstack/react-query'

// // const checkFormikError = (formik:any) => {
// //     if(formik.touched.username && formik.errors.password) return true;
// //     return false;
// // }

// // function translator(error:string){
// //     console.log("translator => ",translator)

// //     switch (error) {
// //         case "Username Required":
// //             return error
// //         case "Password Requeired":
// //             return error
// //         case "User not found!":
// //             return "Kullanıcı bulunamadı!"
// //         default:
// //             return error;
// //             break;
// //     }
// // }


// const Login = () => {
//     const mutation = useMutation({
//         mutationFn: loginRequest,
//         onSuccess: (res) => {
//             if(res.status){
//                 console.log("Login succeeded!")
//             }
//             else{
//                 console.log(res.message)
//             }
//         },
//         onError:(e)=>{
//             console.log("errr" ,e)
//         }
//     })

//     return (
//         <div>
//             <div>
//                 <h1>
//                     Log in to your account 
//                 </h1>

//                 <Formik
//                     initialValues={{
//                         username: '',
//                         password: '',
//                     }}
//                     onSubmit={values => {
//                         mutation.mutate({
//                             username:values.username,
//                             password:values.password
//                         })
//                     }}
//                     >
//                         <Form>
//                         <div>
//                             <Field name="username"  />
//                         </div>
                
//                          {/* <ErrorMessage username="username" /> */}
//                         <div style={{marginTop:"10px"}}>
//                             <Field name="password" type="password" />
//                             <ErrorMessage name="password">{msg => <div>{msg}</div>}</ErrorMessage>


//                         </div>
                    
//                         {/* <ErrorMessage name="password" /> */}
//                         <button type="submit">Submit</button>
//                         </Form>
//                     </Formik>

//                 {/* <form onSubmit={formik.handleSubmit}>
//                     <div>
//                         <label>Username</label>
//                         <input id="username" name="username" error={checkFormikError(formik)} 
//                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username} 
//                         />
//                     </div>
//                     <div>
//                         <label>Password</label>
//                         <input id="password" name="password" type="password" error={checkFormikError(formik)} 
//                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} 
//                         />
//                     </div>
//                     {checkFormikError(formik) &&
//                         <div>
//                                 <p>
//                                     {formik.errors.username && translator(formik.errors.username)}
//                                 </p>
//                                 <p>
//                                     {formik.errors.username && translator(formik.errors.username)}
//                                 </p>
//                         </div>
//                     }

//                     <div>
//                         <button type="submit" disabled={mutation.isLoading} style={{backgroundColor:"magenta"}}>
//                             Login
//                         </button>
//                         {mutation.isLoading && 
//                             <p>Loading</p>
//                         }
//                         {mutation.isError &&
//                             <p>Login failed</p>
//                         }
//                     </div>
//                 </form> */}
//             </div>
//         </div>
//     );
// }

// export default Login;


import React from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import { loginRequest } from '../../services/auth.service'
import { useMutation } from '@tanstack/react-query'

 // Shape of form values
 interface FormValues {
   username: string;
   password: string;
 }
 
 interface OtherProps {
   message: string;
 }
 
 // Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
 const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
   const { touched, errors, isSubmitting, message } = props;
   return (
     <Form>
       <h1>{message}</h1>
       <div style={{marginTop:"10px"}}>
        <Field type="username" name="username" />
        {touched.username && errors.username && <div>{errors.username}</div>}
        </div>
        <div style={{marginTop:"10px"}}>
        
            <Field type="password" name="password" />
            {touched.password && errors.password && <div>{errors.password}</div>}
        </div>
        <div style={{marginTop:"10px"}}>
            <button type="submit" disabled={isSubmitting}>
                Submit
            </button>
        </div>
    </Form>
   );
 };


 
 // The type of props MyForm receives
 interface MyFormProps {
   initialUsername?: string;
   message: string; // if this passed all the way through you might do this or make a union type
 }
 
 // Wrap our form with the withFormik HoC
 const MyForm = withFormik<MyFormProps, FormValues>({

   // Transform outer props into form values
   mapPropsToValues: props => {
     return {
       username: props.initialUsername || '',
       password: '',
     };
   },
 
   // Add a custom validation function (this can be async too!)
   validate: (values: FormValues) => {
     let errors: FormikErrors<FormValues> = {};
     if (!values.username) {
       errors.username = 'Lütfen kullanıcı adınızı giriniz!';
     } 
     if (!values.password) {
        errors.password = 'Lütfen kullanıcı şifrenizi giriniz!';
      } 
     return errors;
   },
 
   handleSubmit: (values,actions) => {
    console.log("vaule",values,actions)
    actions.setSubmitting(false)
   },

 })(InnerForm);
 
 // Use <MyForm /> wherevs
 const Login = () => (
   <div>
     <h1>My App</h1>
     <p>This can be anywhere in your application</p>
     <MyForm message="Sign up" />
   </div>
 );
 
 export default Login;