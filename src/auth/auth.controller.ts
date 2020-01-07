import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './models/auth-dto';
import { ValidPipe } from 'src/shared/validation.pipe';



@Controller('api/auth')
export class AuthController {

    constructor(private readonly authSrv: AuthService) { }


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
