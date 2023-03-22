import express from "express";
import { body, validationResult  } from 'express-validator'

import Entry from "../models/Entry.js";
const router = new express.Router()

// Create an Entry
router.post('/createentry', 
    body('name').isLength({ min: 1 }),
    body('phoneNumber').isMimeType(Number),
    body('email').isEmail(),

    async (req, res) => {
        try {
            console.log(req.body)
            const createdEntry = new Entry(req.body)
            await createdEntry.save()

            res.json({
                success : true,
                message : "Entry created successfully.",
                createdEntry
            })
        } catch (error) {
            res.status(501).json({
                success : false,
                message : error.message
            })
        }
})

// Read an entry by Email
router.get('/getentrybyemail', async (req, res) => {
    try {
        const entry = await Entry.findOne({ email: req.body.email })

        if (!entry) {
            return res.status(400).json({
                success: false,
                message: `No Entry exists with email ${req.body.email}`
            })
        }

        return res.json({
            success: true,
            entry
        })
    } catch (error) {
        res.status(501).json({
            success : false,
            message : error.message
        })
    }
})

// Read all entries
router.get('/getallentries', async (req, res) => {
    try {
        const results = await Entry.find()

        if (results.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No Entry exists. Add Entries to see them here."
            })
        }

        res.status(200).json({
            success: true,
            results
        })
    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
})

// Update an Entry by Email
router.put('/updateentrybyemail', async (req, res) => {
    try {
        const { name, email, phoneNumber, hobbies } = req.body
        const updatedEntry = await Entry.findOneAndUpdate({ email }, {
            name, email, phoneNumber, hobbies
        }, {
            new : true
        })

        res.status(200).json({
            success: true,
            message: "Entry successfully updated",
            updatedEntry
        })
    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
})

// Delete Entry by Email
router.delete('/deleteentrybyemail', async (req, res) => {
    try {
        const { email } = req.body

        const deletedEntry = await Entry.findOneAndDelete({ email })

        res.status(200).json({
            succces: true,
            message: "Entry deleted successfully",
            deletedEntry
        })
    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
})

export default router