import express from "express";
import sendDataEmail from "../emails/account.js";
import Entry from "../models/Entry.js";

const router = new express.Router()

router.post('/sendmail', async (req, res) => {
    try {
        const Ids = req.body
        const allEntries = await Entry.find()
        const data = [];

        for (let i=0; i<allEntries.length; i++) {
            const ID = allEntries[i]._id.toString();
            for (let j=0; j<Ids.length; j++) {
                if (Ids[j] === ID) {
                    data.push(allEntries[i])
                }
            }
        }

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