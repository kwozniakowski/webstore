import http from "../http-common";

class CategoriesDataService {
    getAll() {
        return http.get("/category");
    }
}

export default new CategoriesDataService();