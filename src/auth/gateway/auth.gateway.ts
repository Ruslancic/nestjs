import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { AUTH_ACTIONS } from '../actions/auth.actions';
import { LoginAuthData, RegisterAuthData } from '../models/auth.model';

@WebSocketGateway()
export class AuthGateway {

    @WebSocketServer() private server: Server;

    login(auth: LoginAuthData) {
        console.log('AUTH-GATEWAY: login', auth, AUTH_ACTIONS.LOGIN_RESULT);
        this.server.emit(AUTH_ACTIONS.LOGIN_RESULT, auth);
    }

    register(auth: RegisterAuthData) {
        console.log('AUTH-GATEWAY: register', auth, AUTH_ACTIONS.REGISTER_RESULT);
        this.server.emit(AUTH_ACTIONS.REGISTER_RESULT, auth);
    }

    @SubscribeMessage('message')
    handleMessage(client: any, payload: any): string {
        return 'Hello world!';
    }
}
