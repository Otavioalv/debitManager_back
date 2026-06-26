import { DbClient } from "@/shared/database/database.types";
import { CreateInstallmentBody } from "./installments.type";
import { BatchPayload } from "@generated/prisma/internal/prismaNamespace";
import { FilterListInstallmentsParams } from "./installments.types";
import { EnumMap } from "@/shared/types";
import { Installment, Prisma } from "@generated/prisma/client";
import { buildPaginatedResponse } from "@/shared/utils/pagination.utils";
import { DataWithPagination } from "@/shared/http/response.types";


export class InstallmentsRepository {

    public async listAllInstallments(db: DbClient, filter: FilterListInstallmentsParams):Promise<DataWithPagination<Installment[]>> {
        const {order} = filter;

        const orderByMap: EnumMap<
            FilterListInstallmentsParams["sortBy"],
            Prisma.InstallmentOrderByWithRelationInput
        > = {
            dueAt: {
                dueAt: order
            }
        };

        const whereMap: EnumMap<
            FilterListInstallmentsParams["filter"],
            () => Prisma.InstallmentWhereInput
        > = {
            all: () => ({}),
            dueToday: () => {
                const start = new Date();
                start.setHours(0, 0, 0, 0);

                const end = new Date();
                end.setHours(23, 59, 59, 999);

                return {
                    dueAt: {
                        lt: end,
                        gte: start,
                    }
                };
            },
            late: () => {
                const now = new Date();
                return {
                    dueAt: {
                        lt: now,
                    }
                }
            }
        }
        
        const dataPaginated = await db.installment.findMany({
            orderBy: [
                orderByMap[filter.sortBy],
                {
                    id: "asc",
                }
            ],
            where: whereMap[filter.filter](),
            ...(filter.cursor && {
                cursor: {
                    id: filter.cursor,
                },
                skip: 1,
            }),
            take: filter.limit + 1
        });

        return buildPaginatedResponse(dataPaginated, filter.limit, filter.cursor);
    }

    public async createManyInstallments(db: DbClient, data: CreateInstallmentBody[]): Promise<BatchPayload>{
        return db.installment.createMany({
            data,
        });

        // return db.installment.createManyAndReturn({
        //     data,
        // });
    }
}
