import axios from "axios";

const instance = axios.create({
  baseURL:'http://localhost:8000',
  timeout:5000
});
instance.interceptors.request.use(res=>{
    return res;
  }
);
instance.interceptors.response.use(res=>{
  return res;
},function (error){
  // console.log("响应失败");
})
export  default instance;
