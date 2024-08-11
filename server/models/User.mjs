import { profile } from "console";
import { name } from "ejs";
import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
    googleId: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    displayName: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    familyName: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    givenName: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    profilePhoto: {
        type: mongoose.Schema.Types.String,
        required: true
    },

})


export default mongoose.model("User", UserSchema);