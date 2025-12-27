const qrService = require('./qrService');
const sendGrid = require('@sendgrid/mail');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();
sendGrid.setApiKey(process.env.SENDGRID_API);

const sendQREmail = async (toEmail, token) => {

    const qrPath = await qrService.generateQR(token);

    const attachmentContent = fs.readFileSync(qrPath).toString('base64');

    const messageData = {
        to: toEmail,
        from: "ngx@nishantguvvada.co.in",
        subject: "Membership Activated - Use the QR at check-in",
        text: "Text Message",
        html: `<strong>Hello!</strong><br><p>Use the QR at check-in:</p>
            <img src="cid:${token}" alt="QR code" style="display: block; border: 0;" />`,
        attachments: [
            {
                content: attachmentContent,
                filename: 'qr-image.jpg',
                type: 'image/jpeg',
                disposition: 'inline',
                content_id: token
            }
        ]
    };

    await sendGrid.send(messageData);
    console.log(`QR sent`);

}

const sendLinkEmail = async (adminEmail, plinkId) => {

    const messageData = {
        to: adminEmail,
        from: "ngx@nishantguvvada.co.in",
        subject: "Payment Initiated - Use the link ID for manual override",
        text: "Text Message",
        html: `<strong>Hello!</strong><br><p>Use the link ID for manual override:</p>
            <p>${plinkId}</p>`
    };

    await sendGrid.send(messageData);
    console.log(`Link sent`);

}

module.exports = {
    sendQREmail: sendQREmail,
    sendLinkEmail: sendLinkEmail
}