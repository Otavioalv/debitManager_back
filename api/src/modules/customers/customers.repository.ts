import { Customer, PrismaClient } from "@generated/prisma/client";


export class CustomersRepository {
    constructor(
        private prisma: PrismaClient
    ) {}

    public async listCustomers(filter:FilterListCustomerParams): Promise<Customer[]>{

        // const nomes = ["Ana", "Carlos", "João", "Maria", "Pedro", "Julia", "Lucas", "Mariana"];
        // const sobrenomes = ["Silva", "Souza", "Oliveira", "Santos", "Rodrigues", "Ferreira"];

        // await this.prisma.customer.createMany({
        //     data: Array.from({ length: 100 }).map(() => {
        //         const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];
        //         const sobrenomeAleatorio = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];

        //         return {
        //             name: `${nomeAleatorio} ${sobrenomeAleatorio}`, // Ex: "Ana Silva", "Carlos Santos"
        //             phoneNumber: `+55119${Math.floor(10000000 + Math.random() * 90000000)}`,
        //             balance: BigInt(Math.floor(Math.random() * 5000)),
        //         };
        //     })
        // });


        return await this.prisma.customer.findMany({
            where: {
                ...(filter.name && {
                    name: {
                        contains: filter.name,
                        mode: "insensitive"
                    }
                })
            },
            orderBy: {
                name: "asc"
            }
        });
    }
}
