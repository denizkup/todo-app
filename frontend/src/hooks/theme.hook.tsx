import { useEffect, useState } from "react";


function useChangeTheme(){
    const [theme,setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        if(theme === "light"){
            setTheme("light");
            localStorage.setItem("theme","light")
            document.documentElement.classList.toggle('dark', false);
        }
        else{
            setTheme("dark");
            localStorage.setItem("theme","dark")
            document.documentElement.classList.toggle('dark', true);
        }
    },[])

    function changeTheme(){
        if(theme === "light"){
            setTheme("dark");
            localStorage.setItem("theme","dark")
            document.documentElement.classList.toggle('dark', true);
        }
        else{
            setTheme("light");
            localStorage.setItem("theme","light")
            document.documentElement.classList.toggle('dark', false);

        }
    }

    return {theme,changeTheme}
}

export default useChangeTheme;