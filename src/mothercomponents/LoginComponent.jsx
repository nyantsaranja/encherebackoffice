import {FormChild} from "../childcomponents/FormChild";
import axios from "axios";
import {BASE_URL} from "../service/Api-Call";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

export const LoginComponent = () => {
    const navigate=useNavigate();
    const connection = (email, password) => {
        console.log(email, password)
        const obj = {
            email: email,
            password: password
        }
        axios.post(`${BASE_URL}/admin/login`,obj).then((response) => {
                sessionStorage.setItem("admin",response.data.data.users_Id)
                localStorage.setItem("token",response.data.data.value)
                window.location.href="categories"
            }
        ).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Désolé...',
                text: error.response.data.code+': '+error.response.data.message,
            })
            }
        )
    }
    const parameters = {
        title: "Connexion",
        subtitle: "Se connecter en tant qu'administrateur",
        button: {
            value: "Se connecter"
        },
        event: connection,
        signupUrl: "/signup",
        imageUrl: "assets/img/covers/auction-bg1.jpg"
    }
    const inputs = [
        {
            label: "Email",
            type: "email",
            placeholder: "Entrez votre email",
            name: "email",
            className: "form-control myform",
            value:"admin@gmail.com"
        },
        {
            label: "Mot de passe",
            type: "password",
            placeholder: "Entrez votre mot de passe",
            name: "password",
            className: "form-control myform",
            value: "admin"
        }
    ]

    return (
        <FormChild parameters={parameters} inputs={inputs}/>
    )
}