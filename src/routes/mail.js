import express from "express";
import sendDataEmail from "../emails/account.js";

const router = new express.Router()

router.post('/sendmail', async (req, res) => {
    try {
        await sendDataEmail(req.body)
        res.json({
            message: "Email sent successfully"
        })
    } catch (error) {
        res.status(501).json({
            message: error.message
        })
    }
})

export default router