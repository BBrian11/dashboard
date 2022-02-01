import { useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Icon from '@mui/material/Icon';
import { useState, useContext } from 'react';
import ProductContext from '_mysource/context/product/ProductContext';
import { useTranslation } from 'react-i18next';


const CartToolbar = () => {
    const { searchProducts } = useContext(ProductContext);
    const [searchText, setSearchText] = useState();
    const mainTheme = useSelector(selectMainTheme);
    const { t } = useTranslation('ecommercepage');

    const handleSearch = (e) => {
        searchProducts({ name: e.target.value })
    }

    return (
        <div className="flex flex-1 px-8 sm:px-12">
            <ThemeProvider theme={mainTheme}>
                <Paper
                    component={motion.div}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                    className="flex p-4 items-center w-full max-w-512 h-48 px-16 py-4 shadow"
                >
                    <Icon color="action">search</Icon>

                    <Input
                        placeholder={t('PRODUCTSEARCH')}
                        className="flex flex-1 px-16"
                        disableUnderline
                        fullWidth
                        value={searchText}
                        inputProps={{ 'aria-label': 'Search' }}
                        onChange={handleSearch}
                    />
                </Paper>
            </ThemeProvider>
        </div>
    )
}

export default CartToolbar;