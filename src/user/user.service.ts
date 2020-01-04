import { Model, Error } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
const bcrypt = require('bcryptjs');

import { LoginDto } from 'src/auth/login-dto';
import { User } from './models/user.model';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

    async login(data: LoginDto) {
        const userw = await this.userModel.findOne({ email: data.email }).then(user => {
            if (!user) {
                return { message: 'Auth failed' };
            }
            return bcrypt.compare(data.password, user.password);
        });
        return userw;
    }

    async register(data: LoginDto) {
        const result = await bcrypt.hash(data.password, 10);
        const user = await new this.userModel({
            email: data.email,
            password: result
        }).save().then(res => {
            console.log(res);
            return { message: 'User created successfuly', res };
        }).catch(err => {
            Logger.log(err.message);
            return err.message;
        });

        return user;
    }
}
