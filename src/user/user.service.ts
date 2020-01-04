import { Model, Error } from 'mongoose';
import { Injectable, Logger, NotFoundException, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

import { LoginDto } from 'src/auth/login-dto';
import { User } from './models/user.model';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async login(data: LoginDto) {
        const user = await this.userModel.findOne({ email: data.email });
        if (!user) {
            throw new HttpException('Email non esitente', HttpStatus.NOT_FOUND);
        }

        const passwordMatch = await bcrypt.compare(data.password, user.password);

        if (!passwordMatch) {
            throw new HttpException('Password sbagliata', HttpStatus.UNAUTHORIZED);
        }

        /* const result = !user ? { msg: 'Email non esitente' } : bcrypt.compare(data.password, user.password); */
        const token = jwt.sign(
            { email: user.email, userId: user._id },
            process.env.JWT_KEY,
            { expiresIn: '10h' }
        );

        return {
            token: token,
            expiresIn: 36000,
            userId: user._id,
            email: user.email,
            created: user.created
        };
    }

    async register(data: LoginDto) {
        const hashu = await bcrypt.hash(data.password, 10);
        const user = await new this.userModel({
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
}
