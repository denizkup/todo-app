import { useEffect, useState } from "react";
import { addUserService, deleteUserService, getUserListService } from "../../services/users.service";
import {userDataType} from "../../types/userData.type"
import {MdPersonAddAlt1,MdOutlineDelete,MdLogout,MdDarkMode,MdLightMode} from "react-icons/md"
import ConfirmDialog from "../../components/confirmDialog";
import UserAddDialog from "./userAddDialog";
import {useAuth} from "../../hooks/auth.hook"
import useChangeTheme from '../../hooks/theme.hook';
import UserAddForm from "./userAddForm";

const UserRow = ({idx,user,deleteAction}) => {
    return (
        <tr key={idx}>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">{user.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">{user.lastname}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">{user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800 dark:text-gray-200">{user.auth_level}</td>
            {user.auth_level === "USER" &&
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button type="button" 
                            className="bg-secondary dark:bg-secondary-dark rounded-lg p-2 text-slate-900 hover:bg-secondary-dark dark:hover:bg-secondary"
                            onClick={() => {deleteAction(user._id)}}>
                            <MdOutlineDelete className="w-5 h-5"/>
                    </button>
                </td>
            }
    </tr>
    )

}

type userDeleteDialogType = {
    open:boolean,
    user:userDataType | any
}

const Users = () => {
    const [users,setUsers] = useState<userDataType[]>([])
    const [sync,setSync] = useState(false)
    const [deleteUserDialog,setDeleteUserDialog] = useState<userDeleteDialogType>({open:false,user:null})
    const [addUserDialog,setAddUserDialog] = useState(false)
    const {logout} = useAuth()
    const {theme,changeTheme} = useChangeTheme()



    async function fetchUsers(){
        try{
            const result = await getUserListService()
            if(result.status){
                setUsers(result.payload)
            }
        }
        catch(error){
            console.log("Error while getting user list!")
        }
    }

    async function deleteUser(){
        if(deleteUserDialog.user._id){
            try{
                await deleteUserService(deleteUserDialog.user._id)
                setSync(current => !current)
            }
            catch(error){
                console.log("Error occured while deleting user => ",error)
            }

        }
    }

    async function addUser(user:any){
        try{
            delete user["cpassword"]
            await addUserService(user)
            setSync(current => !current)
            setAddUserDialog(false)
        }
        catch(error){
            console.log("Error occured while adding user => ",error)
        }
    }

    useEffect(() => {
        fetchUsers()
    },[sync])

    return (
        <div className='flex flex-col items-center justify-start h-screen bg-background dark:bg-background-dark p-5'>
            <div className="flex mb-5 space-x-2">
                <p className="text-3xl text-slate-900 dark:text-slate-100">Users</p>
            </div>
            <div className="flex flex-col">
                <div className="flex items-center justify-end space-x-3 mb-2">
                    <button className=" text-slate-900 dark:text-slate-100"  onClick={() => changeTheme()}>
                            {theme === "dark" 
                                ? 
                                <MdDarkMode className="sm:w-5 sm:h-5 md:w-7 md:h-7"/>
                                :
                                <MdLightMode className="sm:w-5 sm:h-5 md:w-7 md:h-7"/>   
                            }
                    </button>
                    <button className="rounded-full p-1.5 hover:dark:bg-slate-500 hover:bg-slate-600 " onClick={() => setAddUserDialog(true)} ><MdPersonAddAlt1 className="text-slate-900 dark:text-slate-100 sm:w-5 sm:h-5 md:w-7 md:h-7"/></button>
                    <button className=' rounded-full p-1.5 hover:dark:bg-slate-500 hover:bg-slate-600' onClick={() => logout() }><MdLogout className=" text-slate-900 dark:text-slate-100 sm:w-5 sm:h-5 md:w-7 md:h-7" /></button>
                </div>
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Lastname</th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Type</th>
                                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {users.map((user,idx) => {
                                        return (
                                            <UserRow key={idx} idx={idx} user={user} deleteAction={() => setDeleteUserDialog({open:true,user:user})}/>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmDialog title="Delete user" open={deleteUserDialog.open} 
                            onClose={() => setDeleteUserDialog({open:false,user:null})} 
                            onConfirm={deleteUser}>
                Please confirm to delete user "{deleteUserDialog.user?.name}"
            </ConfirmDialog>
            <UserAddDialog title="Add user" open={addUserDialog} onClose={()=>setAddUserDialog(false)}>
                {/* <div className="flex flex-col items-center justify-center space-y-2 "> */}
                    <UserAddForm addUserHandler={addUser}/>
                    {/* <input name="name" className='text-center bg-slate-50 border border-slate-300 text-slate-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-slate-100 dark:border-slate-600' placeholder="Name"></input>
                    <input name="lastname" className='text-center bg-slate-50 border border-slate-300 text-slate-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-slate-100 dark:border-slate-600' placeholder="Lastname"></input>
                    <input name="email" type="email" className='text-center bg-slate-50 border border-slate-300 text-slate-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-slate-100 dark:border-slate-600'placeholder="Email"></input>
                    <input name="username" className='text-center bg-slate-50  border border-slate-300 text-slate-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-slate-100 dark:border-slate-600' placeholder="Username"></input>
                    <input name="passowrd" type="password" className='text-center bg-slate-50  border border-slate-300 text-slate-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-slate-100 dark:border-slate-600' placeholder="Password"></input>

                    <select defaultValue="Choose" placeholder="Auth Level" className=' text-center bg-slate-50 border border-slate-300 text-slate-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-slate-100 dark:border-slate-600'>
                        <option value={"USER"}>USER</option>
                        <option value={"ADMIN"}>ADMIN</option>
                    </select> */}

                {/* </div> */}

            </UserAddDialog>
            {/* <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-center text-sm font-light border- ">
                                <thead className="bg-slate-100 dark:text-slate-900 ">
                                    <tr>
                                    <th scope="col" className=" px-6 py-4">Name</th>
                                    <th scope="col" className=" px-6 py-4">Lastname</th>
                                    <th scope="col" className=" px-6 py-4">Email</th>
                                    <th scope="col" className=" px-6 py-4">Auth Level</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {users.map((user,idx) => {
                                    return (
                                        <tr key={idx} className="border-b dark:border-neutral-500 ">
                                            <td className="whitespace-nowrap  px-6 py-4 font-medium">{user.name}</td>
                                            "<td className="whitespace-nowrap  px-6 py-4">{user.lastname}</td>
                                            <td className="whitespace-nowrap  px-6 py-4">{user.email}</td>
                                            <td className="whitespace-nowrap  px-6 py-4">{user.auth_level}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Users;