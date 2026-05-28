import { CreateInstallmentBody } from "./installments.type";


export function generateInstallmentsForContract(contractId: string, totalAmount: bigint, numberOfInstallments: number): CreateInstallmentBody[] {
    const installments: CreateInstallmentBody[] = [];
    const amountPerInstallment = totalAmount / BigInt(numberOfInstallments);
    const remainder = totalAmount % BigInt(numberOfInstallments);

    for (let i = 0; i < numberOfInstallments; i++) {
        const amount = amountPerInstallment + (i === numberOfInstallments - 1 ? remainder : BigInt(0));
        
        installments.push({
            contractId,
            number: i+1,
            originalAmount: amount,
            remainingAmount: amount,
            dueDate: new Date(),
        });
    }

    console.log("RESULTADO PARCELAS : ", installments);

    return installments;
}
