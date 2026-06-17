import z from "zod";
import { listInstallmentsQuerySchema } from "./installmnets.schema";


export type FilterListInstallmentsParams = z.infer<typeof listInstallmentsQuerySchema>;
