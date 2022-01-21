import Hidden from '@mui/material/Hidden';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import useProviders from './../../../../_mysource/hooks/useProviders';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CartContext from '_mysource/context/cart/CartContext';
import { useMemo, useContext, useState } from "react";


const CartHeader = ({ pageLayout }) => {
    const [provider, setProvider] = useState({});
    const { providers } = useProviders();
    const { setOrderProvider } = useContext(CartContext);

    const handleChange = (ev) => {
        setOrderProvider(ev.target.value);
        setProvider(ev.target.value);
    }

    const renderProviderSelect = () => {
        return (
            <Box className="flex items-center w-full max-w-512 px-8 py-4">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Proveedor</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={provider}
                        label="Proveedor"
                        onChange={handleChange} >
                        {providers.map(p => (
                            <MenuItem key={`${p.id}${p.name}`} value={p}>{p.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        )
    }

    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex items-center p-24 px-12">
                <Hidden lgDown><Icon>shopping_cart</Icon></Hidden>
                <Typography
                    component={motion.span}
                    initial={{ x: -20 }}
                    animate={{ x: 0, transition: { delay: 0.2 } }}
                    delay={300}
                    className="sm:flex text-16 md:text-24 mx-12 font-semibold">
                    Place Order
                </Typography>

                <Hidden lgUp>
                    <IconButton
                        onClick={(ev) => pageLayout.current.toggleRightSidebar()}
                        aria-label="open right sidebar"
                        size="large"
                    >
                        <Icon>menu</Icon>
                    </IconButton>
                </Hidden>
            </div>

            <div className="flex flex-1 items-center justify-center px-12">
                {renderProviderSelect()}
            </div>
        </div>
    )
}

export default CartHeader;