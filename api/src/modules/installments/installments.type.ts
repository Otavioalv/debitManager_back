

/* 
contractId String @db.Uuid
installmentNumber Int                          // Número da parcela (1, 2, 3, ...)
originalAmount BigInt               // Valor original da parcela
dueDate DateTime         // Data de vencimento da parcela
// payments Payment[]

contractId,
installmentNumber,
originalAmount
dueDate,
remainingAmount,
*/

export interface CreateInstallmentBody {
    contractId: string;
    installmentNumber: number;
    originalAmount: string;
    dueAt: Date;
    remainingAmount: string;
    
    // payments Payment[]
}

