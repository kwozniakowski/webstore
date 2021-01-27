import http from "../http-common";

class OrdersDataService {
    create(data) {
        return http.post("/orders",data)
    }

    getAll() {
        return http.get("/orders");
    }

    getOne(id) {
        return http.get("/orders/"+id.toString());
    }

    update(jsonData) {
        return http.put("/orders", jsonData)
    }

    delete(id) {
        return http.delete("/products/"+id.toString())
    }

    getRecentOrder(jsonData) {
        return http.get("/orders/by-user", jsonData)
    }
}

export default new OrdersDataService();