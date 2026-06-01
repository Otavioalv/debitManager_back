import request from "supertest";
import app from "@/app";

import { contractDataApiResponseSchema } from "./schemas/contractDataResponse.schema";
import { CreateContractInputBody } from "../contracts.types";

describe("Contracts HTTP Tests", () => {
    describe("GET api/contracts/ (status) - 200", () => {
        it("should return a list of contracts", async () => {
            const res = await request(app).get("/api/contracts");

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

    describe("GET /api/contracts/:id (status) - 200", () => {
        it("should return a contract by id", async() => {
            const list = await request(app).get("/api/contracts");

            const id = list.body.data.data[0].id;

            const res = await request(app).get(`/api/contracts/${id}`);

            expect(res.status).toBe(200);

            contractDataApiResponseSchema.parse(res.body);
        })
    });

    describe("POST /api/contracts (status) - 201", () => {
        it("should create a nuw contract", async () => {
            const resCustomer = await request(app).get("/api/customers");
            const customerId = resCustomer.body.data.data[0].id;

            const contract:CreateContractInputBody = {
                customerId: customerId,
                title: "titulo",
                totalAmount: "123234",
                installmentCount: 21,
                installmentFrequency: "BIWEEKLY",
                interestRate: "21",
                interestPeriod: "ANNUALLY",
                startDate: "2026-09-05T00:00:00.000Z",
                description: "descrição",
                skipSaturday: true,
                skipSunday: true
            };

            const res = await request(app).post("/api/contracts").send(contract);

            expect(res.status).toBe(201);
            contractDataApiResponseSchema.parse(res.body);
        });
    });

    describe("PUT /api/contracts/:id (status) - 200", () => {
        it("should update a contract", async () => {
            const resCustomer = await request(app).get("/api/customers");
            const customerId = resCustomer.body.data.data[0].id;

            const oldContract: CreateContractInputBody = {
                customerId: customerId,
                title: "old title",
                totalAmount: "123234",
                installmentCount: 21,
                installmentFrequency: "BIWEEKLY",
                interestRate: "21",
                interestPeriod: "ANNUALLY",
                startDate: "2026-09-05T00:00:00.000Z",
                description: "old descrição",
                skipSaturday: true,
                skipSunday: true
            };

            const createRes = await request(app).post("/api/contracts").send(oldContract);
            const id = createRes.body.data.id;

            const updateData:CreateContractInputBody = {
                customerId: customerId,
                title: "new title",
                totalAmount: "123234",
                installmentCount: 45,
                installmentFrequency: "MONTHLY",
                interestRate: "20",
                interestPeriod: "MONTHLY",
                startDate: "2026-09-05T00:00:00.000Z",
                description: "new descrição",
                skipSaturday: false,
                skipSunday: false
            };

            const res = await request(app).put(`/api/contracts/${id}`).send(updateData);

            expect(res.status).toBe(200);
            contractDataApiResponseSchema.parse(res.body);
        });
    });
    
    // describe("DELETE /api/contracts/:id (status) - 200", () => {
    //     it("should delete a contract", async () => {
    //         const resCustomer = await request(app).get("/api/customers");
    //         const customerId = resCustomer.body.data.data[0].id;

    //         const contract: CreateContractInputBody = {
    //             customerId: customerId,
    //             title: "contract to delete",
    //             totalAmount: "123234",
    //             installmentCount: 21,
    //             installmentFrequency: "BIWEEKLY",
    //             interestRate: "21",
    //             interestPeriod: "ANNUALLY",
    //             startDate: "2026-09-05T00:00:00.000Z",
    //             description: "descrição",
    //             skipSaturday: true,
    //             skipSunday: true
    //         };

    //         const createRes = await request(app).post("/api/contracts").send(contract);
    //         const id = createRes.body.data.id;

    //         const res = await request(app).delete(`/api/contracts/${id}`);

    //         console.log(res.body);
    //         expect(res.status).toBe(200);
    //         expect(res.body).toMatchObject({
    //             success: true,
    //             message: expect.any(String),
    //             data: null,
    //             meta: null,
    //             error: null,
    //         });

    //         const getRes = await request(app).get(`/api/contracts/${id}`);
    //         expect(getRes.status).toBe(404);
    //     });
    // });

    // describe("DELETE /api/contracts/ (status) - 200", () => {
    //     it("should delete many contracts", async () => {
    //         const contract1: CreateContractInputBody = {
    //             customerId: "6e25d18d-2862-4b76-9ac9-54dc7791638d",
    //             title: "contract to delete 1",
    //             totalAmount: "123234",
    //             installmentCount: 21,
    //             installmentFrequency: "BIWEEKLY",
    //             interestRate: "21",
    //             interestPeriod: "ANNUALLY",
    //             startDate: "2026-09-05T00:00:00.000Z",
    //             description: "descrição",
    //             skipSaturday: true,
    //             skipSunday: true
    //         };
            
    //         const created = await Promise.all([
    //             request(app).post("/api/contracts").send(contract1),
    //             request(app).post("/api/contracts").send(contract1),
    //             request(app).post("/api/contracts").send(contract1),
    //         ]);

    //         const ids = created.map((res) => res.body.data.id);

    //         const res = await request(app).delete("/api/contracts").send({ids});

    //         expect(res.status).toBe(200);
    //         expect(res.body).toMatchObject({
    //             success: true,
    //             message: expect.any(String),
    //             data: {
    //                 deleted: ids.length,
    //             },
    //             meta: null,
    //             error: null,
    //         });

    //         for(const id of ids){
    //             const getRes = await request(app).get(`/api/contracts/${id}`);
    //             expect(getRes.status).toBe(404);
    //         }
    //     });
    // }); 
});
