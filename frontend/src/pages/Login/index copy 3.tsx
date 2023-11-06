import React,{useState} from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, FormikErrors, Form, Field ,ErrorMessage} from 'formik';
import { loginRequest,UserCredentials } from '../../services/auth.service';

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
  const { touched, errors, isSubmitting } = props;
  return (
    <section className="w-100 bg-gray-50 dark:bg-gray-900  ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
            Flowbite    
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <Form>
                <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                  <Field type="text" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  <div>
                    <ErrorMessage name="username" />
                  </div>
                </div>
                <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <Field type="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  <div>
                    <ErrorMessage name="password" />
                  </div>
                </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-justify">
                        <div className="flex items-center h-5">
                          <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
                        </div>
                        <div className="ml-3 text-sm">
                          <label  className="text-gray-500 dark:text-gray-300">
                            Remember me
                          </label>
                        </div>
                    </div>
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Forgot password?
                    </a>
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
                    Sign in
                  </button>
                  {isSubmitting && 
                  <p>Loading...</p>
                  }
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
              </Form>
          </div>
        </div>
        </div>
    </section>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  initialUsername?: string;
  message?: string; // if this passed all the way through you might do this or make a union type
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
      errors.username = 'Required';
    } 
    if(!values.password){
      errors.password = "Required"
    }

    return errors;
  },

  handleSubmit: async (values,actions) => {
    // do submitting things
    console.log("Login => ",values)
    const credentials = values as UserCredentials;
    console.log("credentials => ",credentials)

    const res = await loginRequest(credentials)
    console.log("Res => ",res)
    // if(res.status === false){

    // }
    // actions.setSubmitting(false)

  },
})(InnerForm);

// Use <MyForm /> wherevs
const Login = () => (
  // const [loginResult,setLoginResult] = useState(null);

      <MyForm />

);

export default Login;