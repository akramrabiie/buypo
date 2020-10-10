export default{
    name :"store",
    setToken: (token)=>{
        localStorage.setItem('USER_TOKEN', token);
    },
    getToken:()=>{
        return localStorage.getItem('USER_TOKEN');
    }
}