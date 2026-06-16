import request from "supertest";
import app from "@/app";
import { CreatePersonInputBody } from "../person.type";
import { dataSuccessResponseSchema } from "./schemas/personDataResponse.schema";


describe("Person API testing", () => {
    describe("GET api/person (status) - 200", () => {
        it("should return all person", async () => {
            const res = await request(app).get("/api/person");

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

    describe("GET api/person/:id (status) - 200", () => {
        it("should return a person by id", async () => {
            const list = await request(app).get("/api/person");
            const id = list.body.data.data[0].id;


            const res = await request(app).get(`/api/person/${id}`);

            expect(res.status).toBe(200);
            
            dataSuccessResponseSchema.parse(res.body);

            expect(res.body.data.id).toBe(id);
        });
    });

    describe("POST api/person (status) - 201", () => {
        it("should create new person", async () => {
            const person:CreatePersonInputBody = {
                name: "teste criando user",
                phoneNumber: "91923343",
                secondaryPhoneNumber: "teste secondaryPhoneNumber",
                cpf: "teste cpf",
                cnpj: "teste cnpj",
                rg: "teste rg",
                cnh: "teste cnh",
                stateRegistration: "teste stateRegistration",
                municipalRegistration: "teste municipalRegistration",
            };

            const res = await request(app).post("/api/person").send(person);
                
            expect(res.status).toBe(201);

            dataSuccessResponseSchema.parse(res.body);
        });
    });

    describe("PUT api/person/:id (status) - 200", () => {
        it("should update a person", async () => {
            const oldPerson:CreatePersonInputBody = {
                name: "teste antigo user",
                phoneNumber: "91923343",
                secondaryPhoneNumber: "teste secondaryPhoneNumber",
                cpf: "teste cpf",
                cnpj: "teste cnpj",
                rg: "teste rg",
                cnh: "teste cnh",
                stateRegistration: "teste stateRegistration",
                municipalRegistration: "teste municipalRegistration"
            }

            const createRes = await request(app).post("/api/person").send(oldPerson);

            expect(createRes.status).toBe(201);

            dataSuccessResponseSchema.parse(createRes.body);

            const personId = createRes.body.data.id;
            const newPerson:CreatePersonInputBody = {
                name: "New Person",
                phoneNumber: "+5511977777777",
            };

            const updateRes = await request(app).put(`/api/person/${personId}`).send(newPerson);

            expect(updateRes.status).toBe(200);
            dataSuccessResponseSchema.parse(updateRes.body);

        })
    });

    describe("DELETE api/person/:id (status) - 200", () => {
        it("should delete a person", async () => {
            const person:CreatePersonInputBody = {
                name: "teste criando user",
                phoneNumber: "91923343",
                secondaryPhoneNumber: "teste secondaryPhoneNumber",
                cpf: "teste cpf",
                cnpj: "teste cnpj",
                rg: "teste rg",
                cnh: "teste cnh",
                stateRegistration: "teste stateRegistration",
                municipalRegistration: "teste municipalRegistration",
            };

            const createRes = await request(app).post("/api/person").send(person);

            expect(createRes.status).toBe(201);
            dataSuccessResponseSchema.parse(createRes.body);

            const personId = createRes.body.data.id;
            // console.log("AAAAAAAAA: ", personId);

            const deleteRes = await request(app).delete(`/api/person/${personId}`);

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

    describe("DELETE /api/person (status - 200)", () => {
        it("should delete many person", async () => {

            const person: CreatePersonInputBody = {
                name: "teste criando user",
                phoneNumber: "91923343",
                secondaryPhoneNumber: "teste secondaryPhoneNumber",
                cpf: "teste cpf",
                cnpj: "teste cnpj",
                rg: "teste rg",
                cnh: "teste cnh",
                stateRegistration: "teste stateRegistration",
                municipalRegistration: "teste municipalRegistration",
            };

            const created = await Promise.all([
                request(app).post("/api/person").send(person),
                request(app).post("/api/person").send(person),
                request(app).post("/api/person").send(person),
            ]);

            const ids = created.map((res) => res.body.data.id);
            const deleteRes = await request(app).delete("/api/person").send({ids});

            expect(deleteRes.status).toBe(200);

            expect(deleteRes.body,).toMatchObject({
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
