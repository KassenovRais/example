import Tutorial from "./Tutorial"


export interface SortPicture  extends Tutorial {
    lesson: {
        theme: ITheme[]
        arrPicture : ItemPicture[]
    },
    
}

export interface ITheme {
    id:string
    theme: string;
}

export interface ItemPicture {
    id:string
    theme_id :string
    picture: File 
}