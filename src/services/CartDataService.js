import http from "../http-common";

class CartDataService {
    getCart() {
        return http.get("/cart");
    }

    addItemToCart(jsonData) {
        return http.post("/cart", jsonData)
    }
    createCart(jsonData) {
        return http.post("/cart/create", jsonData)
    }
}

export default new CartDataService();