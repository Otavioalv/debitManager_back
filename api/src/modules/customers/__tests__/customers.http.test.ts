import request from "supertest";
import app from "@/app";
import { CreateCustomerInputBody } from "../customers.type";


describe("Customers API testing", () => {
    describe("GET api/customers (status) - 200", () => {
        it("should return all customers", async () => {
            const res = await request(app).get("/api/customers");

            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({
                success: true,
                message: expect.any(String),
                data: {
                    data: expect.any(Array),
                    pagination: expect.any(Object),
                },
                meta: null, 
                error: null,
            });
        })
    });

    describe("GET api/customers/:id (status) - 200", () => {
        it("should return a customer by id", async () => {
            const list = await request(app).get("/api/customers");

            const id = list.body.data.data[0].id;


            const res = await request(app).get(`/api/customers/${id}`);

            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({
                success: true,
                message: expect.any(String),
                data: {
                    id: expect.any(String),
                    name: expect.any(String),
                    balance: expect.any(String),
                    phoneNumber: expect.any(String),
                },
                meta: null,
                error: null,
            });

           expect(res.body.data.id).toBe(id);
        });
    });

    describe("POST api/customers (status) - 201", () => {
        it("should create new customer", async () => {
            const customer:CreateCustomerInputBody = {
                balance: "12334",
                name: "Customer Test",
                phoneNumber: "+5511999999999",
            };

            const res = await request(app).post("/api/customers").send(customer);
                
            expect(res.status).toBe(201);
            expect(res.body).toMatchObject({
                success: true,
                message: expect.any(String),
                data: {
                    id: expect.any(String),
                    name: expect.any(String),
                    balance: expect.any(String),
                    phoneNumber: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                },
                meta: null,
                error: null,
            });
        });
    });

    describe("PUT api/customers/:id (status) - 200", () => {
        it("should update a customer", async () => {
            const oldCustomer:CreateCustomerInputBody = {
                balance: "12334",
                name: "Customer Test",
                phoneNumber: "+5511999999999",
            };

            const createRes = await request(app).post("/api/customers").send(oldCustomer);

            expect(createRes.status).toBe(201);
            expect(createRes.body).toMatchObject({
                success: true,
                message: expect.any(String),
                data: {
                    id: expect.any(String),
                    name: expect.any(String),
                    balance: expect.any(String),
                    phoneNumber: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                },
                meta: null,
                error: null,
            });

            const customerId = createRes.body.data.id;
            const newCustomer:CreateCustomerInputBody = {
                name: "New Customer",
                balance: "4321",
                phoneNumber: "+5511977777777",
            };

            const updateRes = await request(app).put(`/api/customers/${customerId}`).send(newCustomer);

            expect(updateRes.status).toBe(200);
            expect(updateRes.body).toMatchObject({
                success: true,
                message: expect.any(String),
                data: {
                    id: expect.any(String),
                    name: expect.any(String),
                    balance: expect.any(String),
                    phoneNumber: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                },
                meta: null,
                error: null,
            });

        })
    });

    describe("DELETE api/customers/:id (status) - 200", () => {
        it("should delete a customer", async () => {
            const customer:CreateCustomerInputBody = {
                balance: "12334",
                name: "Customer Test",
                phoneNumber: "+5511999999999",
            };

            const createRes = await request(app).post("/api/customers").send(customer);

            expect(createRes.status).toBe(201);
            expect(createRes.body).toMatchObject({
                success: true,
                message: expect.any(String),
                data: {
                    id: expect.any(String),
                    name: expect.any(String),
                    balance: expect.any(String),
                    phoneNumber: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                },
                meta: null,
                error: null,
            });

            const customerId = createRes.body.data.id;

            const deleteRes = await request(app).delete(`/api/customers/${customerId}`);

            expect(deleteRes.status).toBe(200);
            expect(deleteRes.body).toMatchObject({
                success: true,
                message: expect.any(String),
                data: null,
                meta: null,
                error: null,
            });
        });
    });

    describe("DELETE /api/customers (status - 200)", () => {
        it("should delete many customers", async () => {

            const customer: CreateCustomerInputBody = {
                balance: "12334",
                name: "Customer Test",
                phoneNumber: "+5511999999999",
            };

            const created = await Promise.all([
                request(app)
                    .post("/api/customers")
                    .send(customer),

                request(app)
                    .post("/api/customers")
                    .send(customer),

                request(app)
                    .post("/api/customers")
                    .send(customer),
            ]);

            const ids = created.map(
                (res) => res.body.data.id,
            );

            const deleteRes =
                await request(app)
                    .delete("/api/customers")
                    .send({
                        ids,
                    });

            expect(
                deleteRes.status,
            )
            .toBe(200);

            expect(
                deleteRes.body,
            )
            .toMatchObject({
                success: true,
                message: expect.any(String),
                data: {
                    deleted: 3
                },
                meta: null,
                error: null,
            });
        });
    });
});
