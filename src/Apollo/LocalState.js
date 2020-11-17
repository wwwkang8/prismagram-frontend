
/**
 * defaults의 용도
 * localStorage에서 token을 가져와서 로그인 여부를 확인한다.
 * localStorage : 기본적으로 브라우저에서 지원하는 저장소.
 * 이 저장소는 application 전역에서 접근 가능. localStorage는 직접 지우기 전까지 저장된다.
 */
export const defaults = {
    // key, value 형태로 데이터를 저장하고 불러온다
    isLoggedIn : localStorage.getItem("token") !== null ? true : false
};

export const resolvers = {
    Mutation : {
        logUserIn: (_, {token}, {cache}) => {
            // 토큰을 저장한다
            localStorage.setItem("token", token);

            // 캐시에 로그인 성공 데이터 저장
            cache.writeData({
                data: {
                    isLoggedIn : true
                }
            });
            return null;
        },
        logUserOut: (_, _, { cache }) => {

            // 로그아웃시 토큰 삭제
            localStorage.removeItem("token");

            //이건 무슨용도?
            window.location.reload();
            return null;
        }
    }
}