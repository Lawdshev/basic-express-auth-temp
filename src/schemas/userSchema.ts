import crypto from 'crypto';
import mongoose from 'mongoose';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

type IUser  = {
  // Define your user schema fields here
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    bio: string;
    location: string;
    skills: string[];
    portfolio: string[];
    ratings: number;
    reviews: string[];
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // User's chosen username (REQUIRED)
    unique: true, // Ensure usernames are unique
  },
  email: {
    type: String,
    required: true, // User's email address (REQUIRED)
    unique: true, // Ensure emails are unique
  },
  password: {
    type: String,
    required: true, // User's hashed password (REQUIRED)
  },
    firstName: {
        type: String,
        required: true
  }, // User's first name
    lastName: {
        type: String,
        required: true
  }, // User's last name
  profilePicture: String, // URL to the user's profile picture
  bio: String, // A brief bio or description of the user
  location: String, // User's location (city, state, etc.)
  skills: {
    type: [String],
    required: true, // List of artisan skills (REQUIRED)
  },
  portfolio: [String], // URLs to the user's portfolio or previous work
  ratings: {
    type: Number,
    default: 0,
    }, // Average rating
  reviews: {
    type: [String],
    default: [],
    }, // Reviews
  role: {
    type: String,
    enum: ['artisan', 'user'],
    required: true, // Role can be 'artisan' or 'user' (REQUIRED)
  },
  createdAt: {
    type: Date,
    default: Date.now, // Date when the user account was created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Date when the user account was last updated
  },
   refreshToken: String,
  // Other fields as needed for your app's specific features
});

userSchema.pre<IUser>('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});


userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};


userSchema.methods.generateTokens = function (): { accessToken: string; refreshToken: string } {
  // Generate an access token
  const accessToken = jwt.sign({ userId: this._id }, 'your_access_token_secret', { expiresIn: '15m' });

  // Generate a refresh token
  const refreshToken = crypto.randomBytes(64).toString('hex');
  this.refreshToken = refreshToken;
  this.save();

  return { accessToken, refreshToken };
};


const User = mongoose.model("User", userSchema);
export default User;
