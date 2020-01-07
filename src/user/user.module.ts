import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';

@Module({
    imports: [ ],
    providers: [UserService],
    exports: [UserService],
    controllers: [UserController]
})
export class UserModule { }
