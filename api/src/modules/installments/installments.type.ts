

/* 
contractId String @db.Uuid
number Int                          // Número da parcela (1, 2, 3, ...)
originalAmount BigInt               // Valor original da parcela
dueDate DateTime         // Data de vencimento da parcela
// payments Payment[]

contractId,
number,
originalAmount
dueDate,
remainingAmount,
*/

export interface CreateInstallmentBody {
    contractId: string;
    number: number;
    originalAmount: bigint;
    dueDate: Date;
    remainingAmount: bigint;
    
    // payments Payment[]
}

