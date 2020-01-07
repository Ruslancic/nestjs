import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from 'src/user/models/user.model';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGateway } from './gateway/auth.gateway';
import { ValidPipe } from 'src/shared/validation.pipe';
import { APP_PIPE } from '@nestjs/core';




@Module({
    imports: [ MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]) ],
    providers: [AuthService, AuthGateway,
        {
      provide: APP_PIPE,
      useClass: ValidPipe,
    },],
    exports: [AuthService],
    controllers: [AuthController]
})
export class AuthModule { }
