import {Crud} from "./Crud";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL, CONFIG} from "../service/Api-Call";
import Swal from "sweetalert2";

export const Refunds = () => {
    const [refunds, setRefunds] = useState([]);

    function setToArray(data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            let tempArr = []
            tempArr.push(data[i].id)
            tempArr.push(data[i].type)
            tempArr.push(data[i].customer_Id)
            tempArr.push(data[i].amount)
            let date = data[i].date_movement;
            date=date.split("T");
            date=date[0]+' '+date[1];
            date=date.slice(0,19)
            tempArr.push(date)
            let dateValidation = data[i].validation_Date;
            dateValidation=dateValidation.split("T")
            dateValidation=dateValidation[0]+' '+dateValidation[1];
            dateValidation=dateValidation.slice(0,19)
            tempArr.push(dateValidation)
            arr.push(tempArr)
        }
        return arr;
    }

    useEffect(() => {
            axios.get(`${BASE_URL}/accepted_refund_requests`, CONFIG).then((response) => {
                console.log(response.data.data)
                const arr = setToArray(response.data.data)
                setRefunds(arr)
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Désolé...',
                    text: error.response.data.code + ': ' + error.response.data.message,
                })
            })
        },[]
    )
    const headers = [
        "ID",
        "Type de mouvement",
        "Auteur",
        "Prix",
        "Date de demande",
        "Date de validation"
    ]
    const names = [
        "id",
        "typemouvement",
        "auteur",
        "prix",
        "datedemande",
        "datevalidation"
    ]
    const textValues =
        {
            ajouter: "Ajouter un rechargement",
            modifier: "Accepter le rechargment",
            supprimer: "Supprimer le rechargment",
            btnCreer: "Créer",
        }
    return (
        <Crud tableTitle={"Liste des rechargements"} headers={headers} names={names} rows={refunds} textValues={textValues}
              crud={false} page_description={"Recharges acceptées"}/>
    )
}