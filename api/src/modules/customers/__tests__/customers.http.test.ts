import request from "supertest";
import app from "@/app";


describe("Customers API testing", () => {
    describe("GET /customers (status) - 200", () => {
        it("should return all customers", async () => {
            const res = await request(app).get("/api/customers");

            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({
                success: expect.any(Boolean),
                message: expect.any(String),
                data: expect.any(Array),
            });
        })
    })
})

//     describe("POST /customers (status) - 201", () => {
//         it("should create new customer", async () => {
//             const customer = {
//                 name: "Customer Test",
//                 document: "12345678900",
//                 email: "cust@test.local",
//                 phone: "+5511999999999",
//             };

//             const res = await request(app).post("/api/customers").send(customer);

//             expect(res.status).toBe(201);
//             expect(res.body.data).toMatchObject({
//                 id: expect.any(Number),
//                 name: expect.any(String),
//                 document: expect.any(String),
//                 email: expect.any(String),
//                 phone: expect.any(String),
//             });
//         });
//     });

//     describe("PUT /customers/:id (status) - 200", () => {
//         it("should update a customer", async () => {
//             const oldCustomer = {
//                 name: "Old Customer",
//                 document: "98765432100",
//                 email: "old@test.local",
//                 phone: "+5511988888888",
//             };

//             const createRes = await request(app).post("/api/customers").send(oldCustomer);

//             expect(createRes.status).toBe(201);
//             expect(createRes.body.data).toMatchObject({
//                 id: expect.any(Number),
//                 name: expect.any(String),
//                 document: expect.any(String),
//                 email: expect.any(String),
//                 phone: expect.any(String),
//             });

//             const customerId = createRes.body.data.id;
//             const newCustomer = {
//                 name: "New Customer",
//                 document: "11122233344",
//                 email: "new@test.local",
//                 phone: "+5511977777777",
//             };

//             const updateRes = await request(app).put(`/api/customers/${customerId}`).send(newCustomer);

//             expect(updateRes.status).toBe(200);
//             expect(updateRes.body.data).toEqual(
//                 expect.objectContaining({
//                     id: customerId,
//                     ...newCustomer,
//                 })
//             );
//         });
//     });

//     describe("DELETE /customers/:id (status) - 200", () => {
//         it("should delete customer", async () => {
//             const customer = {
//                 name: "Delete Customer",
//                 document: "55566677788",
//                 email: "del@test.local",
//                 phone: "+5511966666666",
//             };

//             const createRes = await request(app).post("/api/customers").send(customer);
            
//             expect(createRes.status).toBe(201);
//             expect(createRes.body.data).toMatchObject({
//                 id: expect.any(Number),
//                 name: expect.any(String),
//                 document: expect.any(String),
//                 email: expect.any(String),
//                 phone: expect.any(String),
//             });

//             const customerId = createRes.body.data.id;
//             const deleteRes = await request(app).delete(`/api/customers/${customerId}`);

//             expect(deleteRes.status).toBe(200);
//             expect(deleteRes.body.data).toEqual(
//             expect.objectContaining({
//                 id: customerId,
//                     ...customer,
//                 })
//             );
//         });
//     });
// });
