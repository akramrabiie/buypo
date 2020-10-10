const USER_TOKEN = 'USER_TOKEN';
export default{
    name :"store",
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