import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsService } from './products.service';
import { ProductSchema } from './models/product.model';
import { ProductsController } from './products.controller';
import { ProductsGateway } from './gateway/products.gateway';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}])],
    controllers: [ProductsController],
    providers: [ProductsService, ProductsGateway]
})
export class ProductsModule {}
