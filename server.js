const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
res.send('Hello MEAN Stack!');
});

const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://mv466_db_user:2005@cluster0.5idykdg.mongodb.net/?appName=Cluster0'

mongoose.connect(mongoUri)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

const itemSchema = new mongoose.Schema({
  name: String,
  createdAt: { type: Date, default: Date.now },
});

app.use(express.json()); 

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

app.post('/api/items', async (req, res) => {
  try {
    const item = new Item({ name: req.body.name });
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create item' });
  }
});

const Item = mongoose.model('Item', itemSchema);
app.listen(port, () => {
console.log('Server is running on port ${port}');
});
