import {Schema, model, Document} from 'mongoose';

export interface IUser extends Document {
  pseudo: {type: string, unique: true};
  mail: {type: string, unique: true};
  password: string;
  date: Date;
  admin: boolean;
  isVerified: boolean;
  passwordResetToken: String;
  passwordResetExpires: Date;
 
}

export const userSchema = new Schema({
  pseudo: {type: String, unique: true},
  mail: {type: String, unique: true},
  password: String,
  date: Date,
  admin: Boolean,
  isVerified: {type: Boolean, default: false},
  passwordResetToken: String,
  passwordResetExpires: Date
});

export const User = model<IUser>('User', userSchema, 'users');

//export {User, IUser};
