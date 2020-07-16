import { authHeader } from "../config/helpers";
import AuthControllers from "./AuthControllers";
import env from "../../env"

const DashboardControllers = {
    getDashboardData
}


function getDashboardData(data) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({})
    };

    return fetch(env.adminUrl + `/dashboard`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.isLogged) {

                localStorage.setItem('user', JSON.stringify(user.tokens));
                window.location.replace("/")
            }
            // store user details and jwt token in local storage to keep user logged in between page refreshes

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


export default DashboardControllers