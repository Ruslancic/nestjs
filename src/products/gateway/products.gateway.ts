import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';


import { PRODUCTS_ACTIONS } from '../actions/products.actions';
import { Product } from '../models/product.model';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    namespace: '/products'
})
export class ProductsGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

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
}