import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { UserGateway } from './user.gateway';


@Module({
    imports: [
        ProductsModule,
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }),
        AuthModule,
        SharedModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService, UserGateway],
})
export class AppModule { }
