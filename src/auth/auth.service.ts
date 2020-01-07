import { Model, Error } from 'mongoose';
import { Injectable, Logger, NotFoundException, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



import { User } from 'src/user/models/user.model';
import { AuthGateway } from './gateway/auth.gateway';
import { LoginAuthData, RegisterAuthData } from './models/auth.model';
import { LoginDTO, RegisterDTO } from './models/auth-dto';



@Injectable()
export class AuthService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>, private readonly gate: AuthGateway) { }

    async login(data: LoginDTO): Promise<LoginAuthData> {
        const provider = 'simpleLogin'

        const user = await this.userModel.findOne({ email: data.email });
        if (!user) {
            throw new HttpException('Email sbagliata o inesitente', HttpStatus.NOT_FOUND);
        }

        const passwordMatch = await bcrypt.compare(data.password, user.password);

        if (!passwordMatch) {
            throw new HttpException('Password sbagliata', HttpStatus.UNAUTHORIZED);
        }

        const token = jwt.sign(
            { provider, indentificativo: user._id },
            process.env.JWT_KEY,
            { expiresIn: '10h' }
        );

        const result: LoginAuthData = {
            token: token,
            expiresIn: 36000,
            userId: user._id,
            name: user.name,
            email: user.email,
            created: user.created
        }

        this.gate.login(result);
        return result;
    }

    async register(data: RegisterDTO) {
        const hashu = await bcrypt.hash(data.password, 10);
        let tempuser = await this.userModel.findOne({ email: data.email });
        Logger.log(tempuser);
        
        if (tempuser) throw new HttpException({ message: 'Utente gia registrato.'}, HttpStatus.BAD_REQUEST);
        
        const user = await new this.userModel({
            name: data.name,
            email: data.email,
            password: hashu,
            created: new Date
        }).save().then(res => {
            Logger.log(res);
            return { message: 'User created successfuly', res };
        }).catch(err => {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
            /* throw new Error(err); */
        });

        return user;
    }

    async showAllUsers() {
        const user = await this.userModel.find().exec();

        const res = user.map(u => {
            return {
                id: u._id,
                name: u.name,
                email: u.email,
                password: u.password,
                created: u.created
            }
        });
        this.gate.show(res);
        return res;

    }
}
