import { FieldValue } from "firebase/firestore";
import { Icons } from "./Icons";

export interface ListItem {
    name: string;
    quantity: number;
    purchased: boolean;
}

export interface List {
    title: string;
    icon: Icons;
    readonly id: string;
    items: ListItem[];
    readonly createdAt: FieldValue;
}