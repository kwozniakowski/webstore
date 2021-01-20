import http from "../http-common";

class ProductsDataService {
    getAll() {
        return http.get("/products");
    }
    updateProduct(jsonData) {
        return http.put("/products", jsonData)
    }

    deleteProduct(jsonData) {
        return http.delete("/products", jsonData)
    }

    createProduct(jsonData) {
        return http.post("/products",jsonData)
    }

}

export default new ProductsDataService();