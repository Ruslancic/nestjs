import { Injectable } from '@nestjs/common';
import { JwtService } from  '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) { }

    signup(email: string, password: string) {
        console.log(email, password);
    }
}
