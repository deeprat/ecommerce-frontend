import React, {useEffect, useState} from 'react';
import Stack from "@mui/material/Stack";
import ProductService from "../../api/ProductService";
import ProductCard from "../commons/ProductCard";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const NewProducts = () => {
    // Products
    const [products, setProducts] = useState(null);
    const [errorData, setErrorData] = useState(null);

    const getProducts = () => {
        // For Loading
        setProducts(null);
        setErrorData(null);

        // Product Request
        ProductService.getRecentlyAddedProducts()
            .then((newProducts) => {
                setProducts(newProducts.slice(0, -1));
            })
            .catch(error => {
                setErrorData({
                    message: error.message,
                    statusCode: error.statusCode
                });
            })

    };

    // Init
    useEffect(() => {
        getProducts();
    }, []);


    return (
        <>
            <Typography variant="h5" gutterBottom>Recently Added Products</Typography>
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    justifyContent: "space-around",
                    alignItems: 'center',
                }}
            >
                {
                    !products && !errorData &&
                    <CircularProgress sx={{m: 5}}/>
                }
                {
                    products &&
                    products.map((product, idx) => <ProductCard key={idx} product={product}/>)
                }
                {
                    errorData &&
                    <Alert severity="error" sx={{m: 2, flexGrow: 1}}>
                        <AlertTitle>Error : <strong>{errorData.statusCode}</strong></AlertTitle>
                        {errorData.message} — <strong onClick={() => getProducts()}>Reload</strong>
                    </Alert>
                }
            </Stack>
        </>
    );
};

export default NewProducts;