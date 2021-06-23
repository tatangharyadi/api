import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(
        @Inject('ORDERS_SERVICE') private readonly orderService: ClientProxy,
    ) {}

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        this.orderService.emit('order.create', createOrderDto);
    }
}
