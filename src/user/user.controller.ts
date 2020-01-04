import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from 'src/auth/login-dto';

@Controller('api/user')
export class UserController {

    constructor(private userSrv: UserService) {}

    @Get()
    show() {}

    @Post('login')
    login(@Body() data: LoginDto) {        
        return this.userSrv.login(data);
    }

    @Post('register')
    register(@Body() data: LoginDto) {
        return this.userSrv.register(data);
    }

}

