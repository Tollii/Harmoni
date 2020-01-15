const axios = require("axios");
let url: string = "localhost:";
let port: number = 8080;

class files{
  postProfilePicture(data:any,token:String){
      let formData=new FormData();
      formData.append('image',data);
      return axios.post('http:/'+url+port+token,formData,{
          headers:{
              'Content-Type': 'multipart/form-data'
          }
      }).then((response: { data: JSON}) => response.data);
  }


  postContracts(){
      //todo:Sprint 2
  }


  postEventPicture(){
      //todo:Sprint 2
  }


}

export default new files();
