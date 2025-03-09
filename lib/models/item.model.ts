import * as mongoose from 'mongoose';
import Item from '../interfaces-OLD/item.interface';

const itemSchema = new mongoose.Schema({
  name: {type: String, required: true},
  amount: {type: Number},
  price: {type: Number},
  list_id: {type: String, required: true},
  checked: {type: Boolean},
});

const itemModel = mongoose.model<Item & mongoose.Document>('Item', itemSchema);

export default itemModel;
