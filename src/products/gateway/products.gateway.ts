import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';


import { PRODUCTS_ACTIONS } from '../actions/products.actions';
import { Product } from '../models/product.model';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ProductsService } from '../products.service';

@WebSocketGateway({
    namespace: '/products'
})
export class ProductsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

    constructor(private readonly productsService: ProductsService) { }

    @WebSocketServer() private server: Server;

    private logger: Logger = new Logger('ProductsGateway');

    afterInit() {
        this.logger.log('ProductsGateway Inizializzato!');
    }

    handleConnection(client: Socket) {
        this.logger.log(`Client connected:    ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected:    ${client.id}`);
    }

    productCreated(product: any) {
        console.log('PROD-GATEWAY: product created', product, PRODUCTS_ACTIONS.LIVE_CREATED);
        this.server.emit(PRODUCTS_ACTIONS.LIVE_CREATED, product);
    }

    productUpdated(product: Product) {
        console.log('PROD-GATEWAY: product updated', product);
        this.server.emit(PRODUCTS_ACTIONS.LIVE_UPDATED, product);
    }

    productDeleted(id: number) {
        console.log('PROD-GATEWAY: product deleted', id);
        this.server.emit(PRODUCTS_ACTIONS.LIVE_DELETED, id);
    }

    @SubscribeMessage('products')
    handleEvent(@MessageBody() data: any) {
        this.productsService.addProduct(data.title, data.description, data.price)
            .then(result => {
                const product = {
                    id: result._id,
                    title: result.title,
                    description: result.description,
                    price: result.price
                }
                this.productCreated(product)
            });
        /* console.log(data); */
    }
}