import {FormChild} from "../childcomponents/FormChild";
import axios from "axios";
import {BASE_URL} from "../service/Api-Call";
import Swal from "sweetalert2";
import {useNavigate, useParams} from "react-router-dom";

export const LoginComponent = () => {
    const {role} = useParams();
    console.log(role)
    const loginUrl=role==="admin"? BASE_URL+"/admin/login":BASE_URL+"/driver/login";
    const navigate=useNavigate();
    const connection = (email, password) => {
        console.log(email, password)
        const obj = {
            email: email,
            password: password
        }
        axios.post(loginUrl,obj).then((response) => {
                sessionStorage.setItem("person_id",response.data.data.entity.id)
                localStorage.setItem("token",response.data.data.token)
                // window.location.href="/home"+role
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
        subtitle: "Se connecter comme un "+ (role==="admin" ? "Administrateur" : "Utilisateur"),
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
            value:"ranja@gmail.com"
        },
        {
            label: "Mot de passe",
            type: "password",
            placeholder: "Entrez votre mot de passe",
            name: "password",
            className: "form-control myform",
            value: "ranja"
        }
    ]

    return (
        <FormChild parameters={parameters} inputs={inputs}/>
    )
}