import { DbClient } from "@/shared/database/database.types";
import { CreateInstallmentBody } from "./installments.type";
import { BatchPayload } from "@generated/prisma/internal/prismaNamespace";


export class InstallmentsRepository {
    public async createManyInstallments(db: DbClient, data: CreateInstallmentBody[]): Promise<BatchPayload>{
        return db.installment.createMany({
            data,
        });

        // return db.installment.createManyAndReturn({
        //     data,
        // });
    }
}
