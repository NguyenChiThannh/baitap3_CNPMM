import { Router } from "express";
import { CustomerMethod as Customer } from '../schema/customers.js';


const router = Router()

router.get('/', async (req, res) => {
    try {
        const data = await Customer.getAll()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params?.id
        const data = await Customer.getOne(id)
        data ? res.status(200).json(data) : res.status(404).json({
            message: 'NOT FOUND CUSTOMER'
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

router.post('/', async (req, res) => {
    try {
        const data = await Customer.createOne(req.body)
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params?.id
        const data = await Customer.updateOne(id, req.body)
        data ? res.status(201).json(data) : res.status(404).json({
            message: 'NOT FOUND CUSTOMER'
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params?.id
        const data = await Customer.deleteOne(id)
        data ? res.status(201).json(data) : res.status(404).json({
            message: 'NOT FOUND CUSTOMER'
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
})

export default router