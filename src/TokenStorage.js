const USER_TOKEN = 'USER_TOKEN';
export default{
    name :"TokenStorage",
    setToken: (token)=>{
        localStorage.setItem(USER_TOKEN, token);
    },
    getToken:()=>{
        return localStorage.getItem(USER_TOKEN);
    },
    removeToken(){
        localStorage.removeItem(USER_TOKEN)
    }
}