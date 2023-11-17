import {MdLogout,MdDarkMode,MdLightMode} from 'react-icons/md';
import useChangeTheme from '../hooks/theme.hook';
import { useAuth } from '../hooks/auth.hook';

const Content = ({children}:any) => {
    const {theme,changeTheme} = useChangeTheme()
    const {authData,logout} = useAuth()
// shadow border border-slate-200  dark:border-slate-800
    return(
        <div className='flex items-start justify-center bg-background dark:bg-background-dark p-5 '>
            <div className='md:w-full lg:w-2/3 xl:w-1/2 h-screen rounded-lg px-5 py-5  w-full'>
                <div className={`flex items-center space-x-1 mb-5 ${authData?.fullname ? 'justify-end' : 'justify-end'}`}>
                {/* <div className={`flex items-center space-x-1 mb-5 ${authData?.fullname ? 'justify-between' : 'justify-end'}`}> */}
                        {/* {authData?.fullname  &&
                            <p className="font-extralight italic text-primary-text dark:text-primary-textDark">{authData.fullname}</p>
                        } */}
                        <div className='flex items-center justify-end space-x-5'>
                            <button className=" text-slate-900 dark:text-slate-100"  onClick={() => changeTheme()}>
                                {theme === "dark" 
                                    ? 
                                    <MdDarkMode className="xs:w-6 xs:h-6 md:w-7 md:h-7"/>
                                    :
                                    <MdLightMode className="xs:w-6 xs:h-6 md:w-7 md:h-7"/>   
                                }
                            </button>
                            {authData?.status &&
                                <button className='text-slate-900 dark:text-slate-100' onClick={() => logout() }><MdLogout className="xs:w-6 xs:h-6 md:w-7 md:h-7" /></button>
                            }
                        </div>
                    </div>
                {children}
            </div>
        </div>
    )

}

export default Content;