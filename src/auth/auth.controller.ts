import { Controller, Post, Body, UsePipes, Get, UseGuards, Logger, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './models/auth-dto';
import { ValidPipe } from 'src/shared/validation.pipe';
import { AuthGuard } from './auth.guard';



@Controller('api/auth')
export class AuthController {

    constructor(private readonly authSrv: AuthService) { }

    @Get('users')
    @UseGuards(new AuthGuard)
    @UsePipes(new ValidPipe())
    showUsers() {

        return this.authSrv.showAllUsers();
    }

    @Post('login')
    @UsePipes(new ValidPipe())
    login(@Body() data: LoginDTO) {        
        return this.authSrv.login(data);
    }

    @Post('register')
    @UsePipes(new ValidPipe())
    register(@Body() data: RegisterDTO) {
        return this.authSrv.register(data);
    }


}
