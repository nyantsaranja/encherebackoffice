import {useEffect} from "react";

export const Inter = () => {
    useEffect(() => {
        sessionStorage.removeItem("admin")
        window.location.href="login"
    }, []);

    return (
        <></>
    );
}