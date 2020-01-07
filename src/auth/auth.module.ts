import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from 'src/user/models/user.model';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGateway } from './gateway/auth.gateway';




@Module({
    imports: [ MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]) ],
    providers: [AuthService, AuthGateway],
    exports: [AuthService],
    controllers: [AuthController]
})
export class AuthModule { }
