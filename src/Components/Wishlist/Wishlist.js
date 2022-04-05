import React, {useEffect, useState} from 'react';
import WishListService from "../../api/WishListService";
import EmptyWishList from './EmptyWishList';
import WishListItem from './WishListItem';


const testItems = [
  {
    "_id": "624adbbcfe293e30b80382e0",
    "name": "Sony LinkBuds Truly Wireless Earbud Headphones with an Open-Ring Design for Ambient Sounds and Alexa Built-in, Gray",
    "image": "624adbbcfe293e30b80382e0.jpeg",
    "price": 13979.23
  },
  {
    "_id": "624ad8cdfe293e30b80382df",
    "name": "Sony LinkBuds Truly Wireless Earbud Headphones with an Open-Ring Design for Ambient Sounds and Alexa Built-in, Gray",
    "image": "624ad8cdfe293e30b80382df.jpeg",
    "price": 13979.23
  },
  {
    "_id": "6245bffb7e9d68485deed7b6",
    "name": "APPLE Watch Series 7 GPS MKN63HN/A 45 mm Aluminium Case  (White Strap, Regular)",
    "image": "APPLE Watch Series 3-2.jpeg",
    "price": 44850.0
  },
]

const Wishlist = () => {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        WishListService.getWishList()
            .then(cart => {
                setCartItems(cart);
                console.log(cart)
            })
            .catch(error => console.log(error))
    }, []);
    return (
        <div>
            {
                testItems.length === 0 ? <EmptyWishList />: 
                testItems.map(product => <WishListItem key={product._id} product={product} />)
            }
        </div>
    );
};

export default Wishlist;
