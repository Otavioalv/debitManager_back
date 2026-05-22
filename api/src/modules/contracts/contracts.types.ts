import z from "zod";
import { listContractsQuerySchema } from "./contracts.schema";


export type FilterListContractsParams = z.infer<typeof listContractsQuerySchema>;

