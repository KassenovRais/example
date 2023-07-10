export interface ITheme {
    id:string
    theme: string;
}

export interface ItemPicture {
    id:string
    theme_id :string
    picture: File 
}

export interface SortPicture {
    
    lessons: {
        theme: ITheme[]
        arrPicture : ItemPicture[]
    },
}


