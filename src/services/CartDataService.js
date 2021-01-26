import http from "../http-common";

class CartDataService {
    getCart(userId) {
        console.log(userId)
        return http.post("/cart", userId);
    }

    addItemToCart(jsonData) {
        return http.post("/cart/add", jsonData)
    }
    createCart(jsonData) {
        return http.post("/cart/create", jsonData)
    }
}

export default new CartDataService();