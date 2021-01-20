import http from "../http-common";

class UserDataService {
    getAll() {
        return http.get("/user");
    }

    login(data){
        return http.post("/user/login", data)
    }

    logout(){
        localStorage.removeItem('user')
        return http.get("/user/login")
    }

}

export default new UserDataService();