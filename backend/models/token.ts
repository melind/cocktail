import {Schema, model, Document} from 'mongoose';


export interface IToken extends Document {
    userId: { type: String, required: true, ref: 'User' };
    token: { type: String, required: true };
    createdAt:  Date ;
  }
  
  export const tokenSchema = new Schema({
    userId: { type: String, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }//msecondes 12 hours
  });
  
  export const Token = model<IToken>('Token', tokenSchema, 'tokens');