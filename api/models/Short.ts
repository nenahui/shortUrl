import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ShortSchema = new Schema({
	shortUrl: String,
	originalUrl: {
		type: String,
		required: true
	}
});

const Short = mongoose.model('Short', ShortSchema);

export default Short;