import { DbClient } from "@/shared/database/database.types";
import { CreateInstallmentBody } from "./installments.type";
import { BatchPayload } from "@generated/prisma/internal/prismaNamespace";
import { FilterListInstallmentsParams } from "./installments.types";
import { OrderByMap } from "@/shared/types";
import { Installment, Prisma } from "@generated/prisma/client";
import { buildPaginatedResponse } from "@/shared/utils/pagination.utils";
import { DataWithPagination } from "@/shared/http/response.types";


export class InstallmentsRepository {

    public async listAllInstallments(db: DbClient, filter: FilterListInstallmentsParams):Promise<DataWithPagination<Installment[]>> {
        const {order} = filter;

        const orderByMap: OrderByMap<
            FilterListInstallmentsParams["sortBy"],
            Prisma.InstallmentOrderByWithRelationInput
        > = {
            dueDate: {
                dueDate: order
            }, 
            dueToday: {
                dueDate: order
            },
            late: {
                dueDate: order
            }
        };

        const dataPaginated = await db.installment.findMany({
            orderBy: [
                orderByMap[filter.sortBy ?? "dueDate"],
                {
                    id: "asc",
                }
            ],
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
