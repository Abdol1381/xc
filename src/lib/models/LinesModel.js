const { Schema, default: mongoose } = require("mongoose");




const LineSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    lines: {
        type: Array,
        items: {
            type: Object,
            properties: {
                total: {
                    type: Number
                },
                line: {
                    type: String
                },
                bonus: {
                    type: Number
                }
            }
        }
    }
})


const LineModel = mongoose.models.lines || mongoose.model('lines', LineSchema)

export default LineModel