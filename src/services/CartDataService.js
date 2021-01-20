import http from "../http-common";

class CartDataService {
    getCart() {
        return http.get("/cart");
    }

    addItemToCart(jsonData) {
        return http.post("/cart", jsonData)
    }
}

export default new CartDataService();