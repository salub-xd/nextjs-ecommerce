export interface Billboard {
    id: string;
    label: string;
    imageUrl: string;
}

export interface Category {
    id: string;
    name: string;
    billboard: Billboard;
}

export interface Product {
    id: string;
    name: string;
    price: string;
    isFeatured:boolean;
    category:Category;
    images: Image[];
    size: Size;
    color: Color;
}

export interface Image {
    id: string;
    url: string;
}

export interface Size {
    id: string;
    name:string;
    value: string;
}

export interface Color {
    id: string;
    name:string;
    value: string;
} 