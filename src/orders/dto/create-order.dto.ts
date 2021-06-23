import { Type } from 'class-transformer';
import {
    IsArray,
    IsDate,
    IsDateString,
    IsNegative,
    IsPositive,
    IsString,
    ValidateNested,
} from 'class-validator';
import { OrderLineDto } from './orderline.dto';

export class CreateOrderDto {
    @IsString()
    orderNumber: string;

    @IsDate()
    @Type(() => Date)
    orderDate: Date;

    @IsString()
    orderBy: string;

    @IsString()
    shippingAddress: string;

    @IsNegative()
    discountTotal: number;

    @IsPositive()
    orderTotal: number;

    @IsPositive()
    paymentTotal: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderLineDto)
    orderLines: OrderLineDto[];
}
