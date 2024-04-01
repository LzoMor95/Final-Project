const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/social-media', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  profilePicture: String,
  bio: String,
  contactInfo: String,
});

const postSchema = new mongoose.Schema({
  content: String,
  image: String,
  video: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const friendRequestSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const privateMessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);
const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);
const PrivateMessage = mongoose.model('PrivateMessage', privateMessageSchema);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get('/api/user', async (req, res) => {
});