import * as mongoose from 'mongoose';
import List from '../interfaces/list.interface';

const listSchema = new mongoose.Schema({
    name: {type: String, required: true},
    items: {type: Array, required: true},
    user_id: {type: String},
    assigned_id: {type: Array},
    finished: {type: Boolean},
});

const listModel = mongoose.model<List & mongoose.Document>('List', listSchema);

export default listModel;
