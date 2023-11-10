import { PropsWithChildren } from 'react';

import { UserProvider } from "../hooks/auth.hook";


function AppProvider({ children }: PropsWithChildren<{}>){
    return(
        <>
            <UserProvider>{children}</UserProvider>
        </>

    )
}

export default AppProvider;