import request from "supertest";
import app from "@/app";

import { contractDataApiResponseSchema } from "./schemas/contractDataResponse.schema";

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
        it("should returl a contract by id", async() => {
            const list = await request(app).get("/api/contracts");

            const id = list.body.data.data[0].id;

            const res = await request(app).get(`/api/contracts/${id}`);

            expect(res.status).toBe(200);
            
            contractDataApiResponseSchema.parse(res.body);
        })
    });
})
