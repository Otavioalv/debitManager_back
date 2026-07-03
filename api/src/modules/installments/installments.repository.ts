import { DbClient } from "@/shared/database/database.types";
import { CreateInstallmentBody } from "./installments.types";
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
            },
            installmentNumber: {
                installmentNumber: order
            }
        };

        const whereMap: EnumMap<
            FilterListInstallmentsParams["filter"],
            () => Prisma.InstallmentWhereInput
        > = {
            all: () => ({}),
            overdue: () => {
                return  {
                    status: "OVERDUE",
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
            // Separar isso em uma unica variavel, juntar os filtros
            where: {
                ...whereMap[filter.filter](),
                dueAt: {
                    gte: filter.from,
                    lte: filter.to,
                },
                ...(filter.contractId && {
                    contractId: filter.contractId,
                })
            },

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

    public async getInstallmentById(db: DbClient, id: string): Promise<Installment | null>{
        return db.installment.findUnique({
            where: {
                id
            }
        });
    }

    public async createManyInstallments(db: DbClient, data: CreateInstallmentBody[]): Promise<BatchPayload>{
        return db.installment.createMany({
            data,
        });

        // return db.installment.createManyAndReturn({
        //     data,
        // });
    }
    
    public async hasPaidInstallments(db: DbClient, contractId: string): Promise<boolean>{
        const installment = await db.installment.findFirst({
            where: {
                contractId, 
                status: "PAID"
            },
            select: {
                id: true,
            }
        });

        return installment !== null;
    }
}
