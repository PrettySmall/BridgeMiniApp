import ColorThief from 'colorthief'
import BigNumber from "bignumber.js";
import { PublicKey } from '@solana/web3.js';
import { isAddress } from 'web3-validator';
import axios from 'axios';

export const shortenAddress = (address, short = 6) => {
    if (address) {
        return `${address.slice(0, short)} ... ${address.slice(-short)}`;
    } else {
        return ''
    }
};

export const extractColors = (imageUrl) => {
    if (!imageUrl) return
    const img = new Image()
    img.crossOrigin = 'Anonymous' // Gestisce CORS
    img.src = imageUrl
    img.onload = () => {
        const colorThief = new ColorThief()
        const rgbColor = colorThief.getColor(img)
        console.log("pooh, rgbColor = ", rgbColor)
        // setRgbColor(rgbColor)
        // setHexColor(rgbToHex(rgbColor[0], rgbColor[1], rgbColor[2]))
        // setRgbaColor(
        //     `rgba(${rgbColor[0]}, ${rgbColor[1]}, ${rgbColor[2]}, ${opacity})`
        // )
    }
}

export const localizedNumber = (value, decimals = 2, locale = 'en-US') => {
    // Convert BigNumber to a string for formatting
    const formattedNumber = new Intl.NumberFormat(locale, {
        maximumFractionDigits: decimals, // Customize as needed
    }).format(new BigNumber(value).toNumber());

    return formattedNumber
}

export const isJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

export function validateSolAddress(address) {
    try {
        let pubkey = new PublicKey(address)
        let isSolana = PublicKey.isOnCurve(pubkey.toBuffer())
        return isSolana
    } catch (error) {
        return false
    }
}

export function validateEVMAddress(address) {
    try {
        return isAddress(address)
    } catch (error) {
        return false
    }
}
export async function validateTronAddress(address) {
    try {
        let response = await axios.post('https://api.trongrid.io/wallet/validateaddress', { address })
        if (response && response.data) {
            return response.data.result
        }
    } catch(error) {
        console.log(error)
    }
    return false
}