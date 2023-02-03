import {Crud} from "./Crud";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL, CONFIG} from "../service/Api-Call";
import Swal from "sweetalert2";

export const BestUsers = () => {
    const [bestUsers, setBestUsers] = useState([]);

    function setToArray(data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            let tempArr = []
            tempArr.push(data[i][0])
            tempArr.push(data[i][3]+" "+data[i][4])
            tempArr.push(data[i][1])
            tempArr.push(data[i][9])
            arr.push(tempArr)
        }
        return arr;
    }

    useEffect(() => {
        axios.get(`${BASE_URL}/encherisseurs/desc`, CONFIG).then((response) => {
            console.log(response.data.data)
            const arr = setToArray(response.data.data)
            console.log(arr)
            setBestUsers(arr)
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Désolé...',
                text: error.response.data.code + ': ' + error.response.data.message,
            })
        }
        )
    },[])
    const headers = [
        "ID",
        "Utilisateur",
        "Montant dépensé",
        "Date d'intégration"
    ]
    const names = [
        "id",
        "utilisateur",
        "montantdepense",
        "dateintegration"
    ]
    const textValues =
        {
            ajouter: "Ajouter un utilisateur",
            modifier: "Accepter le utilisateur",
            supprimer: "Supprimer l'utilisateur",
            btnCreer: "Créer",
        }
    return (
        <Crud tableTitle={"Liste des meilleurs encherisseurs"} headers={headers} names={names} rows={bestUsers} textValues={textValues} crud={false} page_description={"Les encherisseurs classés par nombre d'enchère effectuée et le montant rapporté"}/>
    )
}