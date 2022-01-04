export function authHeader() {
    // return authorization header with jwt token

    if (localStorage.getItem('token')) {
        return { 'Authorization': 'Bearer ' + localStorage.getItem('token') };
    } else {
        return {};
    }
}