import { useEffect, useState } from "react";


function useChangeTheme(){
    const dark_system_theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    const [theme,setTheme] = useState(localStorage.getItem("theme") || (dark_system_theme ? "dark" : "light"));


    useEffect(() => {
        setTheme(theme);
        localStorage.setItem("theme",theme);
        document.documentElement.classList.toggle('dark', theme === "dark");
    },[])

    function changeTheme(){
        if(theme === "light"){
            setTheme("dark");
            localStorage.setItem("theme","dark")
        }
        else{
            setTheme("light");
            localStorage.setItem("theme","light")

        }
        
        document.documentElement.classList.toggle('dark', theme !== "dark");

    }

    return {theme,changeTheme}
}

export default useChangeTheme;