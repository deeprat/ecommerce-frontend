import React, {useState} from 'react';
import {Box, Paper, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {Add, Close, Favorite, Remove} from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import client from "../../api/HttpClient";

const WishListItem = ({product, order, wishlist, cart}) => {
    // States
    const [cartDisabled, setCartDisabled] = useState(false);

    // Cart Handler
    function increaseCart() {
        setCartDisabled(true);
    }

    function decreaseCart() {
        setCartDisabled(true);
    }

    return (
        <Stack
            component={Paper}
            direction="row"
            fullWidth
            sx={{p: 1}}
        >
            <Stack sx={{flexGrow: 1, p: 1, justifyContent: 'space-between'}}>
                <Box
                    sx={{
                        width: "70%",
                        "display": "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        "overflow": "clip",
                        textOverflow: "ellipsis",
                    }}
                >
                    <Typography variant="subtitle1">
                        {product.name}
                    </Typography>
                </Box>
                <Stack direction="row">
                    <Box sx={{flexGrow: 1}}>
                        <Box>
                            <Typography variant="subtitle2">
                                Price: <strong> {product.price.toLocaleString('en-IN', {
                                style: 'currency',
                                currency: 'INR',
                            })}
                            </strong>
                            </Typography>
                        </Box>
                        {
                            order &&
                            <Box>
                                <Typography variant="subtitle2">
                                    Quantity: <b>{product.quantity}</b>
                                </Typography>
                            </Box>
                        }
                        {
                            cart &&
                            <>
                                <Stack
                                    direction="row"
                                    sx={{
                                        alignItems: 'center',
                                        mt: 1
                                    }}
                                >
                                    <Stack direction="row" spacing={1} sx={{alignItems: 'center'}}>
                                        <IconButton
                                            disabled={cartDisabled}
                                            sx={{width: 25, height: 25}}
                                            onClick={decreaseCart}
                                        >
                                            <Remove/>
                                        </IconButton>
                                        <TextField
                                            value={product.quantity}
                                            disabled
                                            size="small"
                                            sx={{
                                                minWidth: 50,
                                                maxWidth: 40,
                                                p: 0,
                                                m: 0,
                                            }}
                                        />
                                        <IconButton
                                            disabled={cartDisabled}
                                            sx={{width: 25, height: 25}}
                                            onClick={increaseCart}
                                        >
                                            <Add/>
                                        </IconButton>
                                    </Stack>
                                    {
                                        cart &&
                                        <IconButton sx={{ml: 2}}>
                                            <Favorite fontSize="small"/>
                                        </IconButton>
                                    }
                                </Stack>
                            </>
                        }
                    </Box>
                    {
                        (cart || order) &&
                        <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                alignItems: 'flex-end'
                            }}
                        >
                            <Typography variant="subtitle2">
                                SubTotal: <b>{(product.price * product.quantity).toLocaleString('en-IN', {
                                style: 'currency',
                                currency: 'INR',
                            })}</b>
                            </Typography>
                        </Box>
                    }
                </Stack>
            </Stack>
            <Stack
                sx={{
                    width: wishlist ? 100 : 150,
                    height: wishlist ? 100 : 170,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    component='img'
                    src={`${client.defaults.baseURL}/products/image/${product.id}`}
                    sx={{
                        p: 2,
                        height: wishlist ? 90 : 150,
                        width: wishlist ? 90 : 150,
                        objectFit: "scale-down"
                    }}/>
            </Stack>
            {
                (wishlist || cart) &&
                <Stack sx={{justifyContent: 'space-between'}}>
                    <IconButton>
                        <Close/>
                    </IconButton>
                </Stack>
            }
        </Stack>
    );
};

export default WishListItem;
