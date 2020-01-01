import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
    namespace: '/contacts'
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() private wss: Server;

    private logger: Logger = new Logger('AppGateway');

    afterInit(server: Server) {
        this.logger.log('Inizializzato!');
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected:    ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected:    ${client.id}`);
    }


    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, text: string): void {
        this.wss.emit('msgToClient', text)
        /* this.logger.log(text); */
        /* return { event: 'msgToClient', data: text }; */
    }
}
