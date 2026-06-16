
/* 
id String @id @default(uuid()) @db.Uuid
name String

phoneNumber String
secondaryPhoneNumber String?

cpf String?
cnpj String?

rg String?
cnh String?

stateRegistration String?
municipalRegistration String?

contracts Contract[]

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
*/


export interface PersonResponseDTO {
    id: string;
    name: string;
    // balance: string;
    phoneNumber: string;
    secondaryPhoneNumber: string | null;
    cpf: string | null;
    cnpj: string | null;
    rg: string | null;
    cnh: string | null;
    stateRegistration: string | null;
    municipalRegistration: string | null;
    createdAt: string;
    updatedAt: string;
}
