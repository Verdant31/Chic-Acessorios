import mongoose, { Schema } from 'mongoose';

export const CupomSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true
        },
        cupons: [
          {
            name: {
              type: String,
              unique: true
            },
            generationDate: {
              type: String,
              unique: true
            },
            expirationDate: {
              type: String,
              unique: true
            }
          }
        ]
    },
    {timestamps: true},
)

const Cupom = mongoose.model('Cupons', CupomSchema);

export default Cupom;


