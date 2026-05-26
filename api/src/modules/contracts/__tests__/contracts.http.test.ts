import request from "supertest";
import app from "@/app";

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
})