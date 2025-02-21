const { Schema, default: mongoose } = require("mongoose");



const TransactionSchema = new Schema({
    trackId: {
        type: String
    },
    status: {
        type: String
    },
    date: {
        type: String
    },
    address: {
        type: String
    },
    amount: {
        type: Number
    },
    transactionType: {
        type: String
    },
    time: {
        type: String
    }
})


const TransactionModel = mongoose.models.transactions || mongoose.model('transactions', TransactionSchema)


export default TransactionModel