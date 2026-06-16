import { prisma } from "@/shared/database/prisma";

import { DatabaseService } from "@/shared/database/database.service";
import { PersonController } from './person.controller';
import { PersonRepository } from './person.repository';
import { PersonService } from './person.service';

export const databaseService = new DatabaseService(prisma);
export const personRepository = new PersonRepository();
export const personService = new PersonService(personRepository, databaseService);
export const personController = new PersonController(personService);

