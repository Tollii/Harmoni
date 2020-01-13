const axios=require('axios');
let url:string="localhost:";
let port:number=8080;

class LoginUser{
    getLogin(credentials:JSON){
        return axios.put('http://'+url+port+'/login',credentials).then((response: { data: JSON; }) => response.data);
    };
}

let loginExport=new LoginUser();

export default loginExport;