import { Schema, Document, Model } from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator');

export const UserSchema = new Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
    email: { type: String, required: true, minlength: 5, maxlength: 255, unique: true },
    password: { type: String, required: true, minlength: 3, maxlength: 255 },
    isAdmin: Boolean,
    created: { type: Date }
});

UserSchema.plugin(uniqueValidator);

export interface User extends Document {
    id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: Boolean;
    created: Date;
} 