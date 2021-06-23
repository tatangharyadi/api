import { IsNegative, IsNumber, IsPositive, IsString } from 'class-validator';

export class OrderLineDto {
    @IsString()
    SKU: string;

    @IsPositive()
    qtyOrder: number;

    @IsPositive()
    unitPrice: number;

    @IsNegative()
    unitDiscount: number;

    @IsPositive()
    lineTotal: number;
}
