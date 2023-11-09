import * as Yup from 'yup';
import { withFormik, FormikProps, FormikErrors, Form, Field ,ErrorMessage} from 'formik';
import { loginRequest,UserCredentials } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';

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
  const { touched, errors, isSubmitting,status } = props;
  const navigate = useNavigate();


  if(status === true) navigate('/todos');

  return (
    <section className="h-screen w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
      <div className=" h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className=" h-full flex-row items-center justify-center">
              <h1 className="text-xl font-bold leading-tight  text-gray-900 md:text-2xl dark:text-white text-center m-10">
                  Sign in to your account
              </h1>
              <Form>
                <div className='flex flex-col gap-4'>
                  <Field type="text" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  <div>
                    <ErrorMessage name="username" component="div" className="text-slate-900 dark:text-slate-200" />
                  </div>
                </div>
                <div className='flex flex-col gap-4'>
                  <Field type="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  <div>
                    <ErrorMessage name="password" component="div" className="text-slate-900 dark:text-slate-200" />
                  </div>
                </div>
                  <div className="flex items-center justify-end">
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                      Forgot password?
                    </a>
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-orange-500 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800">
                    Sign in
                  </button>
                  {isSubmitting && 
                  <p>Loading...</p>
                  }
                  {status === true &&
                    <p> Giriş başarılı</p>
                  }
                  {status === false &&
                    <p> Giriş hatalı!</p>
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
      errors.username = 'Lütfen kullanıcı adını giriniz!';
    } 
    if(!values.password){
      errors.password = "Lütfen şifrenizi giriniz!"
    }

    return errors;
  },

  handleSubmit: async (values,actions) => {
    // do submitting things
    const credentials = values as UserCredentials;

    const res = await loginRequest(credentials)
    actions.setStatus(res.status)

  },
})(InnerForm);

// Use <MyForm /> wherevs
const Login = () => (
  // const [loginResult,setLoginResult] = useState(null);

  <MyForm />

);

export default Login;