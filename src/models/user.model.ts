import { Schema, model } from "mongoose";

// import { IPokemon } from "../interfaces/pokemon.interface";
// https://github.com/puntotech/pokeAPI/blob/be68b8ecfdbce64109310d7264b96c17147f7d89/src/models/pokemon.model.ts

export const userSchema = new Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String
        }
    },
  { collection: 'users' }
);

const schema_User = model("User", userSchema);

export default schema_User;
