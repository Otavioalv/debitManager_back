import { CreateInstallmentBody } from "./installments.type";


export function generateInstallmentsForContract(contractId: string, totalAmount: string, numberOfInstallments: number): CreateInstallmentBody[] {
    const installments: CreateInstallmentBody[] = [];
    
    const total: bigint = BigInt(totalAmount);

    const amountPerInstallment = total / BigInt(numberOfInstallments);
    const remainder = total % BigInt(numberOfInstallments);

    console.log("totalAmount: ", totalAmount);
    console.log("numberOfInstallments: ", numberOfInstallments);
    console.log("remainder: ", remainder);

    for(let i = 0; i < numberOfInstallments; i++) {
        const amount = amountPerInstallment + (
            i === numberOfInstallments - 1 
                ? remainder 
                : BigInt(0));
        
                
        installments.push({
            contractId,
            number: i+1,
            originalAmount: amount.toString(),
            remainingAmount: amount.toString(),
            dueDate: new Date(),
        });
    }
    
    console.log("RESULTADO PARCELAS : ", installments);

    return installments;
}
