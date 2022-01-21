import numeral from "numeral";
import moment from 'moment';


class Format {
    static instance;

    static getInstance = () => {
        if (!Format.instance) {
            Format.instance = new Format();
        }
        return Format.instance;
    }

    price = (value) => {
        const priceFormat = '$0,0.00';
        const n = numeral(value);
        return n.format(priceFormat);
    }

    limited = (value = '') => {
        const maxTextSize = 20;
        return (value.length > maxTextSize) ? value.substring(0, maxTextSize) + '...' : value;
    }

    datetime = (value) => {
        const m = moment(value);
        return m.format('LLL');
    }
}

export default Format;