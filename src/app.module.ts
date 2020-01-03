import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
const db = 'mongodb+srv://liberdesign-socket:CgA0HiQmS99waogZ@cluster0-yclhk.mongodb.net/test?retryWrites=true&w=majority'

@Module({
  imports: [ProductsModule, MongooseModule.forRoot(db, { useNewUrlParser: true, useUnifiedTopology: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
