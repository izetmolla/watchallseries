export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.tokens && user.tokens.access_token) {
        return {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.tokens.access_token
        };
    } else {
        return {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
    }
}