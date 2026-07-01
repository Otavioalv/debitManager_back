import { Person, Prisma } from "@generated/prisma/client";
import { CreatePersonBody, FilterListPersonParams, PersonCreateParams, PersonUpdateParams, UpdatePersonBody } from "./person.type";
import { DbClient, ExtendedPrismaClient } from "@/shared/database/database.types";
import { buildPaginatedResponse } from "@/shared/utils/pagination.utils";
import { DataWithPagination } from "@/shared/http/response.types";
import { EnumMap } from "@/shared/types";


export class PersonRepository {

    public async listPerson(db: DbClient, filter:FilterListPersonParams): Promise<DataWithPagination<Person[]>>{

        const orderByMap: EnumMap<
            FilterListPersonParams["sortBy"],
            Prisma.PersonOrderByWithRelationInput
        > = {
            name: {
                name: filter.order,
            },
            // balance: {
            //     balance: filter.order,
            // },
        }

        const dataPaginated = await db.person.findMany({
            where: {
                ...(filter.search && {
                    name: {
                        contains: filter.search,
                        mode: "insensitive",
                    }
                }),
            },
            ...(filter.cursor && {
                cursor: {
                    id: filter.cursor,
                },
                skip: 1,
            }),
            orderBy: [
                orderByMap[filter.sortBy ?? "name"],
                {
                    id: "asc",
                }
            ],
            take: filter.limit + 1, 
        });

        return buildPaginatedResponse(dataPaginated, filter.limit, filter.cursor);
    }

    public async getPersonById(db: DbClient, id: string): Promise<Person | null> {
        return db.person.findUnique({
            where: {
                id,
            },
        });
    }

    public async createPerson(db: DbClient, data: PersonCreateParams): Promise<Person> {
        return db.person.create({
            data
        });
    }

    public async updatePerson(db: DbClient, id: string, data: PersonUpdateParams): Promise<Person> {
        return db.person.update({
            where: {
                id,
            },
            data
        });
    }

    public async deletePerson(db: DbClient, id: string): Promise<void> {
        await db.person.delete({
            where: {
                id,
            },
        });
    }

    public async deleteManyPerson(db: DbClient, ids: string[]): Promise<number> {
        const result = await db.person.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            }
        });

        return result.count;
    }

    // public async countPerson(): Promise<number>
}
