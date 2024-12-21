const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const port = 3000;

app.use(bodyParser.json());
dotenv.config();

const mongoURI = process.env.DB_URL;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});
const Item = mongoose.model('Item', itemSchema);

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items', error: err });
  }
});

// GET a single item by ID
app.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching item', error: err });
  }
});

// POST a new item
app.post('/items', async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
      description: req.body.description,
    });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: 'Error creating item', error: err });
  }
});

// PUT (update) an item by ID
app.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
      },
      { new: true, runValidators: true }
    );
    if (updatedItem) {
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Error updating item', error: err });
  }
});

// DELETE an item by ID
app.delete('/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (deletedItem) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting item', error: err });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
