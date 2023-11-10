import { useState } from "react";


function useChangeTheme(){
    const [theme,setTheme] = useState("light");

    function changeTheme(){
        if(theme === "light"){
            setTheme("dark");
            document.documentElement.classList.toggle('dark', true);
        }
        else{
            setTheme("light");
            document.documentElement.classList.toggle('dark', false);

        }
    }

    return {theme,changeTheme}
}

export default useChangeTheme;