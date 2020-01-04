import { Schema, Document } from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');

export const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created: { type: Date }
});
UserSchema.plugin(uniqueValidator);

export interface User extends Document {
    id: string;
    email: string;
    password: string;
    created: Date;
} 