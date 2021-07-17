import {TodoStatus} from "./todo-status";

export interface ToDo {
    "id": string;
    "title": string;
    "data": string;
    "checked": boolean;
    "status": TodoStatus;
    "desc": string | null;
    "userId": string | null;
}
