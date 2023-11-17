import { useEffect, useState } from "react";
import { addUserService, deleteUserService, getUserListService } from "../../services/users.service";
import {userDataType} from "../../types/userData.type"
import {MdPersonAddAlt1,MdDelete} from "react-icons/md"
import ConfirmDialog from "../../components/confirmDialog";
import UserAddDialog from "./userAddDialog";
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
                            className="text-secondary dark:text-secondary-dark"
                            onClick={() => {deleteAction(user._id)}}>
                            <MdDelete className="w-6 h-6"/>
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
        <>
            <p className='text-5xl xs:text-3xl text-center text-primary-text dark:text-primary-textDark'> Users </p>
            <div className="flex flex-col mb-4 mt-4">
                <div className="flex flex-row justify-end mb-2">
                    <button className="rounded-full p-1.5 hover:dark:bg-slate-500 hover:bg-slate-600 " onClick={() => setAddUserDialog(true)} >
                        <MdPersonAddAlt1 className="text-slate-900 dark:text-slate-100 sm:w-5 sm:h-5 md:w-7 md:h-7"/>
                    </button>

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
                <UserAddForm addUserHandler={addUser}/>
            </UserAddDialog>
        </>
    )
}

export default Users;