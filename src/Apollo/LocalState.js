export const defaults = {
    //token이 있다면 True, 없다면 False 반환
    isLoggedIn: Boolean(localStorage.getItem("token")) || false
};

export const resolvers = {
    Mutation:   {
        logUserIn: (_, {token}, {cache}) => {
            localStorage.setItem("token", token);
            cache.writeData({
                data: {
                    isLoggedIn: true
                }
            });
            return null;
        },
        logUserOut: (_, __, { cache }) => {
            localStorage.removeItem("toekn");
            window.location.reload();
            return null;
        }
    }
};