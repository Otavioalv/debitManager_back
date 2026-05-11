import app from "./app.js";

const PORT:number = Number(process.env["API_PORT"]) || 3333;
const HOST:string = String(process.env["API_HOST"]) || "0.0.0.0";

app.listen(PORT, HOST, () => {
    console.log(`Server running on url http://${HOST}:${PORT}`);
});
