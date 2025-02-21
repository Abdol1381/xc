const { Schema, default: mongoose } = require("mongoose");


const TargetSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    targets: {
        type: Array,
        items: {
            type: Object,
            properties: {
                bonus: {
                    type: Number
                },
                isReceived: {
                    type: Boolean
                },
                hasTarget: {
                    type: Boolean
                }
            }
        }
    }
})


const TargetsModel = mongoose.models.targets || mongoose.model('targets', TargetSchema)

export default TargetsModel