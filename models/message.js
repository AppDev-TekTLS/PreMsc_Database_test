import mongoose, { Schema, version } from 'mongoose';

const schema = Schema({
    message: {
        type: String,
        required: true
    }
}, { versionKey: false, timestamps: true });

const MessageDB = mongoose.model('messages', schema);

export default MessageDB;