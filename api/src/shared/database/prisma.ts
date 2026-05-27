import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({
    connectionString,
});


export const prisma = new PrismaClient({
    adapter,
     log: [
        "query",
        "info",
        "warn",
        "error",
    ],
});


// Log every query made by Prisma
prisma.$on("query", (e) => {
    console.log("\nSQL:");
    console.log(e.query);

    console.log("\nPARAMS:");
    console.log(e.params);

    console.log("\nDURATION:");
    console.log(e.duration);
});

