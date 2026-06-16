


/* 
name: string;
id: string;
balance: bigint;
phoneNumber: string;
createdAt: Date;
updatedAt: Date
*/


export interface PersonResponseDTO {
    name: string;
    id: string;
    balance: string;
    phoneNumber: string | null;
    createdAt: string;
    updatedAt: string;
}
