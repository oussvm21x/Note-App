import mongoose from "mongoose";
import { Schema } from "mongoose";

const NoteSchema = new Schema({
    title: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    content: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    },
    updatedAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    },

}
);

export default mongoose.model("Note", NoteSchema);
;