import http from "../http-common";

class ProductsDataService {
    getAll() {
        return http.get("/products");
    }

    getOne(id) {
        return http.get("/products/"+id.toString());
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