import { authHeader } from "../config/helpers";
import AuthControllers from "./AuthControllers";
import env from "../../env"

const SerialsController = {
    importList,
    postToDb,
    getAllSerials
}



function getAllSerials(data) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({})
    };

    return fetch(env.adminUrl + `/serials/getAllSerials?page=` + data, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}


function importList(data) {
    return fetch(env.nodeServer + "/" + data)
        .then(handleResponse)
        .then(thedata => {

            return thedata;
        });
}




function postToDb(data) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };
    return fetch(env.adminUrl + `/serials/import`, requestOptions)
        .then(handleResponse)
        .then(user => {
            return user;
        });
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                AuthControllers.logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}


export default SerialsController