import http from "../http-common";

class UserDataService {
    getAll() {
        return http.get("/user");
    }

    login(data){
        return http.post("/user/login", data)
    }


}

export default new UserDataService();