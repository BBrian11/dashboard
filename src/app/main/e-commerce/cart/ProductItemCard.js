import Card from '@mui/material/Card';
import Format from '_mysource/Format';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Config from '_mysource/config/Config';
import IconButton from '@mui/material/IconButton';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import { useContext } from 'react';
import CartContext from '_mysource/context/cart/CartContext';


const ProductItemCard = (props) => {
    const { addToCart } = useContext(CartContext);
    const { product } = props;

    const handleAddToCart = () => {
        addToCart(product);
    }

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }} >
            <Card className={clsx('cursor-pointer', props.className)} >
                {product.image_list.length > 0 && (
                    <img src={Config.getInstance().getApiBasePath() + '/' + product.image_list[0].url} className="w-full block" alt="product" />
                )}
                <Typography className="px-20 my-16 text-14 font-semibold">{product.name}</Typography>
                <Typography className="px-20 my-16 text-12 font-semibold">{Format.getInstance().price(product.price)}</Typography>
                <Typography className="px-20 my-16 text-12">{Format.getInstance().limited(product.description)}</Typography>
                <div className="text-center">
                    <IconButton onClick={handleAddToCart}><AddShoppingCart /></IconButton>
                </div>
            </Card>
        </motion.div>
    )
}

export default ProductItemCard;