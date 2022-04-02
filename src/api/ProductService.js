import client from './HttpClient';
import AuthService from "./AuthService";
import authHeader from "./AuthHeader";

class ProductService {
    // Get new products
    getRecentlyAddedProducts() {
        return client.get("/products/latest", {mode: 'no-cors'})
            .then(response => response.data);
    }

    // get popular products
    getMostViewedProducts() {
        return client.get("/products/most-visited", {mode: 'no-cors'})
            .then(response => response.data);
    }

    // get product by id
    getProductDetails(product_id) {
        return client.get(`/products/${product_id}`).then(response => response.data);
    }

    // Check if product in wishlist
    async productInWishlist(product_id) {
        // get wishlist from storage
        let wishlist = new Set();

        await this.getWishList()
            .then(result => {
                wishlist = new Set(result.map(r => r._id))
            })
            .catch(error => {
                wishlist = new Set();
            });

        // check item is in wishlist
        return new Promise((resolve, reject) => {
            if (wishlist.has(product_id)) {
                resolve("Product in wishlist");
            } else {
                reject("Product not in wishlist");
            }
        });
    }

    // Add to wishlist
    addToWishList(product_id) {
        return client.post('/wish-list/add', {
            token: AuthService.getUserDetails().token,
            productId: product_id,
        }, {
            headers: authHeader()
        })
            .then(response => {
                return response.data.message;
            });
    }

    // remove from wishlist
    removeToWishList(product_id) {
        return client.delete('/wish-list/remove', {
            headers: authHeader(),
            data: {
                token: AuthService.getUserDetails().token,
                productId: product_id,
            }
        })
            .then(response => {
                return response.data.message;
            });
    }

    // Get wishlist
    async getWishList() {
        // empty list;
        let wishlist = [];

        // get list
        await client.get(`/wish-list/display`, {headers: authHeader()})
            .then(response => {
                wishlist = response.data;
            })
            .catch(error => {
                wishlist = error.response;
            })

        return new Promise(resolve => resolve(wishlist));
    }

    // For badge
    async getWishListLength() {
        let wishlist = [];

        await this.getWishList().then(result => {
            wishlist = result
        });

        return new Promise(resolve => resolve(wishlist.length))
    }

    // Add to cart
    addToCart(product_id) {
        return client.post('/shopping-cart/add', {
            token: AuthService.getUserDetails().token,
            productId: product_id,
        }, {
            headers: authHeader()
        })
            .then(response => {
                return response.data.message;
            });
    }
}

export default new ProductService();