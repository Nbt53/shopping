import { ListItem } from "@/interfaces/ListTypes";


export const pushToList = (nameValue: string, quantityValue: number, itemsValue: ListItem[]) => {
    const item: ListItem = {
        name: nameValue.toUpperCase(),
        quantity: quantityValue,
        purchased: false,
    };
    itemsValue.push(item);
    nameValue = "";
    quantityValue = 0;
};