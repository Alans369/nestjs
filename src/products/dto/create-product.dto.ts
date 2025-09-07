import { IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    title:string;
    @IsNotEmpty()
    descripcion:string;
    @IsNotEmpty()
    price:number;
    @IsNotEmpty()
    @IsNumber()
    categoryId:number;
    @IsArray()
     images: string[];
}
