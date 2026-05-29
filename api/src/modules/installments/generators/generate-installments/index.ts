import { CreateInstallmentBody } from "@/modules/installments/installments.type";
import { GenerateInstallmentsForContractInput } from "./types";


// tipo objecto parametro para função


export function generateInstallmentsForContract(input: GenerateInstallmentsForContractInput): CreateInstallmentBody[] {
    const { contractId, totalAmount, installmentCount } = input;
    
    const installments: CreateInstallmentBody[] = [];

    const total: bigint = BigInt(totalAmount);

    const amountPerInstallment = total / BigInt(installmentCount);
    const remainder = total % BigInt(installmentCount);

    console.log("totalAmount: ", totalAmount);
    console.log("numberOfInstallments: ", installmentCount);
    console.log("remainder: ", remainder);

    for(let i = 0; i < installmentCount; i++) {
        const amount = amountPerInstallment + (
            i === installmentCount - 1 
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
