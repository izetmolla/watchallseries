import env from "../../env";

const AuthControllers = {
    getLogin,
    logout
}


function getLogin(data) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
        
    };
    return fetch(env.url+`/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.isLogged) {
                localStorage.setItem('user', JSON.stringify(user));
                window.location.replace("/")
            }
            // store user details and jwt token in local storage to keep user logged in between page refreshes

            return user;
        });



}



function logout() {
    // localStorage.removeItem("user")
    // window.location.replace("/login")
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log(response)
        if (!response.ok) {
            if (response.status === 401) {
                alert("error")
                // auto logout if 401 response returned from api

            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}


export default AuthControllers