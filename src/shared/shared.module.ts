import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './utils/http-error.filter';

@Module({
    providers: [{
        provide: APP_FILTER,
        useClass: HttpErrorFilter
    }]
})
export class SharedModule {}
