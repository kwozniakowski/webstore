import http from "../http-common";

class CartDataService {
    getCart() {
        return http.get("/cart");
    }

    addItemToCart(jsonProductData) {
        return http.post("/cart", jsonProductData)
    }

}

export default new CartDataService();