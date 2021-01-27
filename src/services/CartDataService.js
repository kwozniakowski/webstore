import http from "../http-common";

class CartDataService {
    getCart(userId) {
        console.log(userId)
        return http.post("/cart", userId);
    }

    addItemToCart(jsonData) {
        return http.post("/cart/add", jsonData)
    }
    updateCart(jsonData) {
        return http.put("/cart/update", jsonData)
    }

    removeFromCart(jsonData) {
        return http.put("/cart/delete", jsonData)
    }

    emptyCart(jsonData) {
        return http.put("/cart/empty-cart",jsonData)
    }
}

export default new CartDataService();