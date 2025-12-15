const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const saveBase64Image = (base64, filename) => {

    const base64Data = base64.replace(/^data:image\/png;base64,/, "");

    const filePath = path.join("qr-codes", `${filename}.png`);

    fs.writeFileSync(filePath, base64Data, "base64");

    return filePath;

}

const generateQR = async (token) => {

    const qrImage = await QRCode.toDataURL(token);
        
    const qrPath = saveBase64Image(qrImage, token);
    console.log("Saved QR at:", qrPath);

    return qrPath;

}

module.exports = {
    saveBase64Image: saveBase64Image,
    generateQR: generateQR
}