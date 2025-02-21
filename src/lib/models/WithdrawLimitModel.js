const { Schema, default: mongoose } = require("mongoose");


const WithdrawLimitSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    currentTime: {
        type: String
    },
    currentDate: {
        type: String
    },
    hasLimit: {
        type: Boolean
    }
})


const WithdrawLimitModel = mongoose.models.withdrawLimit || mongoose.model('withdrawLimit', WithdrawLimitSchema)

export default WithdrawLimitModel