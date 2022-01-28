import mongoose, { Schema } from 'mongoose';

export const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        cpf: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        cupom: {
            name: {
                type: String,
            },
            generationDate: {
                type: Date,
            },
            expirationDate: {
                type: Date,
            }
        }
        
    },
    {timestamps: true},
)

const User = mongoose.model('User', UserSchema);

export default User;


