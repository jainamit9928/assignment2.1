import React from 'react'
import axios from 'axios'
axios.defaults.headers.common['Content-type'] = "application/json";

/*
export const updateData = (id,updatedObject) => {
    return fetch('http://localhost:3000/items/'+id, {
        method: 'put',
        body: JSON.stringify(updatedObject),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => response)
    .then(response => response.json);

}; 
*/
export const getData = () => {
     return new Promise(function (resolve, reject) {
        fetch("http://localhost:3000/items").then(response => response.json()).then(res => {
            console.log("in api",res)
                let techies = res.techies
                setTimeout(() => resolve(techies),500)
            })
            .catch(error => {
                reject(error);
            });
       
    });
}

export const getFilteredData = (id) => {
     return new Promise(function (resolve, reject) {
        fetch("http://localhost:3000/items/"+id).then(response => response.json()).then(res => {
            console.log("in api",res)
                let techies = res.data
                setTimeout(() => resolve(techies),500)
            })
            .catch(error => {
                reject(error);
            });
       
    });
}

export const updateData = (id, updatedObject) => {
    console.log("id in update data in api", id, "object", updatedObject)
    console.log("ID LENGTH " + id.length);
    return new Promise(function (resolve, reject) {
        axios.put('http://localhost:3000/items/' + id, updatedObject)
            .then(function (response) {
                console.log("in api",response);
                 setTimeout(() => resolve(response.data),500)
            })
            .catch(function (error) {
                console.log("in api",error);
                reject(error);
            });
    });
}





