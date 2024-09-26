import request from 'supertest';
import express from 'express';
import customerRouter from '../router/router.js';
import { CustomerMethod } from '../schema/customers.js';

// Mô phỏng (mock) Customer model để tránh truy cập cơ sở dữ liệu thực trong khi test
jest.mock('../schema/customers.js', () => ({
    CustomerMethod: {
        getAll: jest.fn(),
        getOne: jest.fn(),
        createOne: jest.fn(),
        updateOne: jest.fn(),
        deleteOne: jest.fn(),
    },
}));

const app = express();
app.use(express.json());
app.use('/api/customers', customerRouter);

describe('Customer API', () => {
    afterAll(() => {
        console.log('Test finished')
    });

    test('GET /api/customers should return all customers', async () => {
        // Giả lập dữ liệu trả về
        const mockData = [
            {
                CustomerID: 1,
                Gender: 'Male',
                Age: 30,
                AnnualIncome: 50000,
                SpendingScore: 70,
                Profession: 'Engineer',
                WorkExperience: 5,
                FamilySize: 3,
            },
            {
                CustomerID: 2,
                Gender: 'Female',
                Age: 25,
                AnnualIncome: 60000,
                SpendingScore: 80,
                Profession: 'Designer',
                WorkExperience: 3,
                FamilySize: 2,
            },
        ];

        // Mô phỏng phương thức getAll để trả về dữ liệu mock
        CustomerMethod.getAll.mockResolvedValue(mockData);

        const response = await request(app).get('/api/customers');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockData);
    });

    test('GET /api/customers/:id should return a customer by id', async () => {
        const mockData = {
            CustomerID: 1,
            Gender: 'Male',
            Age: 30,
            AnnualIncome: 50000,
            SpendingScore: 70,
            Profession: 'Engineer',
            WorkExperience: 5,
            FamilySize: 3,
        };

        // Mô phỏng phương thức getOne để trả về dữ liệu mock
        CustomerMethod.getOne.mockResolvedValue(mockData);

        const response = await request(app).get('/api/customers/1');

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockData);
    });

    test('GET /api/customers/:id should return 404 if customer is not found', async () => {
        require('../schema/customers.js').CustomerMethod.getOne.mockResolvedValue(null);

        const response = await request(app).get('/api/customers/999999999999999');

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('NOT FOUND CUSTOMER');
    });

    test('POST /api/customers should create a new customer', async () => {
        const newCustomer = {
            CustomerID: 3,
            Gender: 'Female',
            Age: 28,
            AnnualIncome: 70000,
            SpendingScore: 90,
            Profession: 'Teacher',
            WorkExperience: 4,
            FamilySize: 2,
        };

        CustomerMethod.createOne.mockResolvedValue(newCustomer);

        const response = await request(app)
            .post('/api/customers')
            .send(newCustomer);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(newCustomer);
    });

    test('PUT /api/customers/:id should update a customer', async () => {
        const updatedCustomer = {
            CustomerID: 1,
            Gender: 'Male',
            Age: 31,
            AnnualIncome: 55000,
            SpendingScore: 75,
            Profession: 'Engineer',
            WorkExperience: 6,
            FamilySize: 3,
        };

        CustomerMethod.updateOne.mockResolvedValue(updatedCustomer);

        const response = await request(app)
            .put('/api/customers/1')
            .send(updatedCustomer);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(updatedCustomer);
    });

    test('PUT /api/customers/:id should should return 404 if customer not found', async () => {
        const updatedCustomer = {
            CustomerID: 1,
            Gender: 'Male',
            Age: 31,
            AnnualIncome: 55000,
            SpendingScore: 75,
            Profession: 'Engineer',
            WorkExperience: 6,
            FamilySize: 3,
        };

        CustomerMethod.updateOne.mockResolvedValue(null);

        const response = await request(app)
            .put('/api/customers/999999999999999')
            .send(updatedCustomer);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('NOT FOUND CUSTOMER');
    });

    test('DELETE /api/customers/:id should delete a customer', async () => {
        const deletedCustomer = {
            CustomerID: 1,
            Gender: 'Male',
            Age: 30,
            AnnualIncome: 50000,
            SpendingScore: 70,
            Profession: 'Engineer',
            WorkExperience: 5,
            FamilySize: 3,
        };

        CustomerMethod.deleteOne.mockResolvedValue(deletedCustomer);

        const response = await request(app).delete('/api/customers/1');

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual(deletedCustomer);
    });

    test('DELETE /api/customers/:id should return 404 if customer not found', async () => {
        require('../schema/customers.js').CustomerMethod.deleteOne.mockResolvedValue(null);

        const response = await request(app).delete('/api/customers/999999999999999');

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('NOT FOUND CUSTOMER');
    });
});
