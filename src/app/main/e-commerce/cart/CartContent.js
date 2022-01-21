import { useEffect, useContext, useState } from "react";
import ProductContext from '_mysource/context/product/ProductContext';
import ProductItemCard from './ProductItemCard';
import Masonry from 'react-masonry-css';
import Typography from '@mui/material/Typography';


const CartContent = () => {
    const { loading, retrieve, filtered_products } = useContext(ProductContext);

    useEffect(() => {
        retrieve();
    }, []);

    if (filtered_products.length === 0) {
        return (
            <div className="flex flex-1 items-center justify-center h-full">
                <Typography color="textSecondary" variant="h5">
                    There are no products!
                </Typography>
            </div>
        );
    }

    return (
        <div className="flex flex-1 px-8 sm:px-12">
            <Masonry
                breakpointCols={{
                    default: 6,
                    1920: 5,
                    1600: 4,
                    1366: 3,
                    1280: 4,
                    960: 3,
                    600: 2,
                    480: 1,
                }}
                className="my-masonry-grid flex w-full"
                columnClassName="my-masonry-grid_column flex flex-col p-0 md:p-8"
            >
                {filtered_products.map(p =>
                    <ProductItemCard
                        key={`${p.id}${p.name}`}
                        product={p}
                        className="w-full rounded-20 shadow mb-16"
                        variateDescSize={false} />
                )}
            </Masonry>
        </div>
    )
}

export default CartContent;