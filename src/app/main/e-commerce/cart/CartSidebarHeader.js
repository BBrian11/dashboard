import { useTranslation } from 'react-i18next';


const CartSidebarHeader = () => {
    const { t } = useTranslation('ecommercepage');

    return (
        <div className="p-24">
            <h4>{t('MYCARTTITLE')}</h4>
        </div>
    )
}

export default CartSidebarHeader;