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
  const { touched, errors, isSubmitting, message } = props;
  return (
    <Form>
      <h1>{message}</h1>
      <div style={{marginBottom:"10px"}}>
        <Field type="text" name="username" />
        {touched.username && errors.username && <div>{errors.username}</div>}
      </div>
      <div style={{marginBottom:"10px"}}>
        <Field type="password" name="password" />
        {/* {touched.password && errors.password && <div>{errors.password}</div>} */}
        <div>
          <ErrorMessage name="password" />
        </div>

      </div>

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
      {isSubmitting && 
        <p>Loading...</p>
      }
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
    const res = await loginRequest(credentials)
    console.log("Res => ",res)
    if(res.status === false){

    }
    // actions.setSubmitting(false)

  },
})(InnerForm);

// Use <MyForm /> wherevs
const Login = () => (
  // const [loginResult,setLoginResult] = useState(null);

    <div>
      <MyForm message="Sign up" initialUsername='asdkasd' />
    </div>

);

export default Login;