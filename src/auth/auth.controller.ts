import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './models/auth-dto';
import { ValidationPipe } from 'src/shared/validation.pipe';



@Controller('api/auth')
export class AuthController {

    constructor(private readonly authSrv: AuthService) { }


    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() data: LoginDTO) {        
        return this.authSrv.login(data);
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    register(@Body() data: RegisterDTO) {
        return this.authSrv.register(data);
    }


}
