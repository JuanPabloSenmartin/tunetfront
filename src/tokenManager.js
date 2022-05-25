const TokenManager = {
    getToken: () => {
        const tokenString = sessionStorage.getItem('token');

        if (tokenString) {
            const userToken = JSON.parse(tokenString);
            return userToken.token
        }
    },
    removeToken: () => {
        sessionStorage.removeItem('token');
    },
    setToken: (userToken) => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
    }
};

const useTokenManager = () => TokenManager

export {useTokenManager};
