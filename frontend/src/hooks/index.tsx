import { PropsWithChildren } from 'react';

import { UserProvider } from "./auth.hook";


function AppProvider({ children }: PropsWithChildren<{}>){
    return(
        <>
            <UserProvider>{children}</UserProvider>
        </>

    )
}

export default AppProvider;