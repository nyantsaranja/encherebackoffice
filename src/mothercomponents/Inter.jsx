import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export const Inter = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const myParam = query.get('role');
    useEffect(() => {
        myParam === "50" ? sessionStorage.setItem("role", "admin") : sessionStorage.setItem("role", "user")
        myParam === "50" ? navigate("login/admin") : navigate("login/user")
        // window.location.href="login"
    }, []);

    return (
        <></>
    );
}