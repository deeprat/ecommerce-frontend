import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom"

const styles = {
    position: "fixed",
    left: "30%",
    top: "25%"
}

const EmptyWishList = () => {
    return(
        <Box sx={styles}>
            <h1>No items saved to your wish list.</h1>
            <Link to="/"><Button variant="contained">Continue Shopping</Button></Link>      
        </Box>
    )
}

export default EmptyWishList;