import { CreateInstallmentBody } from "@/modules/installments/installments.type";
import { GenerateInstallmentsForContractInput } from "./types";


// tipo objecto parametro para função


export function generateInstallmentsForContract(input: GenerateInstallmentsForContractInput): CreateInstallmentBody[] {
    const { id, totalAmount, installmentCount, startDate } = input;
    
    const installments: CreateInstallmentBody[] = [];

    const total: bigint = BigInt(totalAmount);

    const amountPerInstallment = total / BigInt(installmentCount);
    const remainder = total % BigInt(installmentCount);

    console.log("totalAmount: ", totalAmount);
    console.log("numberOfInstallments: ", installmentCount);
    console.log("remainder: ", remainder);

    for(let i = 1; i <= installmentCount; i++) {
        const amount = amountPerInstallment + (
            i === installmentCount
                ? remainder 
                : BigInt(0));

        // Calcular date de vencimento com base na frequência e data de início do contrato
        
        installments.push({
            contractId: id,
            installmentNumber: i,
            originalAmount: amount.toString(),
            remainingAmount: amount.toString(),
            dueDate: new Date(),
        });
    }
    
    console.log("RESULTADO PARCELAS : ", installments);

    return installments;
}
