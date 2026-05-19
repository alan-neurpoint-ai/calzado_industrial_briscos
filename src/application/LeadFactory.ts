import { LeadUseCase } from "./usecases/LeadUseCase";
import { LeadRepository } from "../infrastructure/adapters/LeadRepository";

const leadRepository = new LeadRepository();
export const leadUseCase = new LeadUseCase(leadRepository);
