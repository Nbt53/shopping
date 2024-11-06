import { ListItem } from "@/interfaces/ListTypes";


export const pushToList = (nameValue: string, quantityValue: number, itemsValue: ListItem[]) => {
    const item: ListItem = {
        name: nameValue,
        quantity: quantityValue,
        purchased: false,
    };
    itemsValue.push(item);
    nameValue = "";
    quantityValue = 0;
};