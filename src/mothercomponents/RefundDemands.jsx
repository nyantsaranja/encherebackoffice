import {Crud} from "./Crud";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {BASE_URL, CONFIG} from "../service/Api-Call";

export const RefundDemands = () => {
    const [refund_requests, setRefundRequests] = useState([]);

    function setToArray(data) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            let tempArr = []
            tempArr.push(data[i].id)
            tempArr.push(data[i].customer_Id)
            tempArr.push(data[i].amount)
            let date = data[i].date_movement;
            date=date.split("T");
            date=date[0]+' '+date[1];
            date=date.slice(0,19)
            tempArr.push(date)
            arr.push(tempArr)
        }
        return arr;
    }

    useEffect(() => {
            axios.get(`${BASE_URL}/refund_requests`, CONFIG).then((response) => {
                console.log(response.data.data)
                const arr = setToArray(response.data.data)
                setRefundRequests(arr)
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Désolé...',
                    text: error.response.data.code + ': ' + error.response.data.message,
                })
            })
        }, []
    )
    const headers = [
        "ID",
        "Utilisateur",
        "Montant",
        "Date de mouvement"
    ]
    const names = [
        "id",
        "utilisateur",
        "montant",
        "datedemouvement"
    ]
    const textValues =
        {
            ajouter: "Ajouter un rechargement",
            modifier: "Accepter le rechargment",
            supprimer: "Supprimer le rechargment",
            btnCreer: "Créer",
        }
    const acceptRefund = (id) => {
        console.log(id)
        const obj = {
            id: id
        }
        axios.put(`${BASE_URL}/refund_request/${id}/accept`, obj, CONFIG).then((response) => {
            Swal.fire({
                    icon: 'success',
                    title: 'Bien...',
                    text: 'Le rechargement a été accepté',
                })
                window.location.href = "refund_demands"
            }
        ).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Désolé...',
                    text: error.response.data.code + ': ' + error.response.data.message,
                })
            }
        )
    }
    const userDefinedButton = {
        name: "Accepter",
        event: acceptRefund,
        className: "btn btn-success",
        value: "Accepter"
    }
    return (
        <Crud userDefinedButton={userDefinedButton} tableTitle={"Liste des demandes de rechargement"}
              headers={headers}
              names={names} rows={refund_requests} textValues={textValues} crud={false}
              page_description={"Acceptation des demandes de recharge"}/>
    )
}