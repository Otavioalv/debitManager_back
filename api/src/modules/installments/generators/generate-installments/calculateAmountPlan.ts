
export interface CalculateAmountParams {
    totalAmount: string;
    installmentCount: number;
};

export interface CalculateAmountResult {
    amountPerInstallment: bigint;
    remainder: bigint;
    total: bigint;
};

export function calculateAmountPlan({
    totalAmount,
    installmentCount,
}: CalculateAmountParams): CalculateAmountResult {

    const total: bigint = BigInt(totalAmount);
    const amountPerInstallment = total / BigInt(installmentCount);
    const remainder = total % BigInt(installmentCount);

    return {
        amountPerInstallment, 
        remainder, 
        total,
    };
};
