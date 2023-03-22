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
            const createdEntry = new Entry(req.body)
            await createdEntry.save()

            res.json({
                success : true,
                message : "Entry created successfully.",
                createdEntry
            })
        } catch (error) {
            res.status(501).json({
                success
                
                : false,
                message : error.message
            })
        }
})

// Read an entry by Email
router.get('/getentrybyid', async (req, res) => {
    try {
        const foundEntry = await Entry.findOne({ _id: req.body.id })

        if (!foundEntry) {
            return res.status(400).json({
                success: false,
                message: `No Entry exists with email ${req.body.email}`
            })
        }

        return res.json({
            success: true,
            foundEntry
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
            return res.status(200).json({
                success: true,
                message: "No Entry exists. Add Entries to see them here.",
                entries: []
            })
        }

        res.status(200).json({
            success: true,
            message: "Here are all the Entries",
            entries: results
        })
    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
})

// Update an Entry by Email
router.put('/updateentry', async (req, res) => {
    try {
        const { id, name, email, phoneNumber, hobbies } = req.body
        const updatedEntry = await Entry.findByIdAndUpdate(id, {
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
router.delete('/deleteentry', async (req, res) => {
    try {
        const { id } = req.body

        const deletedEntry = await Entry.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
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