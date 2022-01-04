function logout() {
    localStorage.removeItem('token')
}

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            // cerramos sesión si llega un 401
            // esto es si el token está expirado o 
            if (response.status === 401) {
                localStorage.removeItem('token')
                // logout();
                // location.reload(true);
            }

            if (response.status === 303) {
                localStorage.setItem('info', text)
            }

            if (response.status !== 200) {
                localStorage.setItem('error', data.error)
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
