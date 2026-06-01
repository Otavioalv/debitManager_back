


/* 
name: string;
id: string;
balance: bigint;
phoneNumber: string;
createdAt: Date;
updatedAt: Date
*/


export interface CustomerResponseDTO {
    name: string;
    id: string;
    balance: string;
    phoneNumber: string | null;
    createdAt: string;
    updatedAt: string;
}
