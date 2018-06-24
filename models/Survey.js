const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: String,
    subject: String,
    body: String,
    recipients: [RecipientSchema],
    dateSent: Date,
    lastResponded: Date,
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 }
});

mongoose.model('surveys', surveySchema);
