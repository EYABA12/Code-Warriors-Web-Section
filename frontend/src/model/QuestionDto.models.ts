import { User } from "./User.model";

export interface QuestionDto{
    id: number;
    question: string;
    idUser: number;
    idCatalogue: number;
    file:string;

}