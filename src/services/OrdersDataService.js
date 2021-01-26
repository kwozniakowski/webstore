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
        return http.put("/orders/"+jsonData["id"], jsonData)
    }

    delete(id) {
        return http.delete("/products/"+id.toString())
    }
}

export default new OrdersDataService();