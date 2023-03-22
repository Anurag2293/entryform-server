import express from "express";
import sendDataEmail from "../emails/account.js";
import Entry from "../models/Entry.js";

const router = new express.Router()

router.post('/sendmail', async (req, res) => {
    try {
        const Ids = req.body
        const allEntries = await Entry.find()

        const data = allEntries.filter((entry) => {
            return Ids.some((selectedEntry) => {
                return selectedEntry._id === entry._id.toString()
            })
        })

        await sendDataEmail(data)
        res.json({
            success: true,
            message: "Email sent successfully"
        })
    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
})

export default router