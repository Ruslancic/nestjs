import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login-dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authSrv: AuthService) { }

    @Post()
    async signup(@Body() data: LoginDto) {
        console.log(data);
        
        /* const product = await this.authSrv.signup(
            email,
            password
        ); */
        /* return product; */
    }


}
