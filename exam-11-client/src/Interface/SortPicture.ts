export interface SortPicture {
    title: string
    description:string
    item: ItemPicture[]
}

export interface ItemPicture {
    id:string
    theme: string;
    arrPicture: string[]
}