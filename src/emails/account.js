import sgMail from '@sendgrid/mail';
import { prettyPrintJson } from 'pretty-print-json';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendDataEmail = async (data) => {
    const html = `<pre>${prettyPrintJson.toHtml(data)}</pre>`;

    const msg = {
        to : 'anuragdhote392@gmail.com',
        from : 'anuragrdhote@gmail.com',
        subject : 'Data',
        html: html
    }

    try {
        await sgMail.send(msg)

        console.log(data)
        console.log("Email sent successfully")
    } catch (error) {
        throw new Error(error.message)
    }
}

export default sendDataEmail