# 🖥️ Wordle Clone - Server

This is the backend server for the Wordle Clone application, built with Node.js, Express, and MongoDB. It provides API endpoints for user authentication, game state management, word validation, and statistics tracking.

## 🚀 Features

- **RESTful API**: Clean and organized endpoints
- **User Authentication**: JWT-based secure authentication
- **Enhanced Word Generation**: Truly random word selection from database
- **Improved Word Validation**: Accepts any valid 5-letter word for better gameplay
- **Game Logic**: Word validation and game state management
- **Statistics**: Track and store user performance metrics
- **MongoDB Integration**: Efficient data storage and retrieval
- **Middleware**: Request validation and authentication checks
- **Error Handling**: Comprehensive error responses

## 📂 Project Structure

```
server/
├── controllers/            # Request handlers
│   ├── authController.js   # Authentication logic
│   └── wordleController.js # Game logic
│
├── middleware/             # Express middleware
│   └── auth.js             # JWT authentication
│
├── models/                 # MongoDB schemas
│   ├── Game.js             # Game state schema
│   ├── User.js             # User account schema
│   └── Word.js             # Word database schema
│
├── routes/                 # API routes
│   ├── auth.js             # Authentication routes
│   └── wordle.js           # Game routes
│
├── utils/                  # Utility functions
│   ├── seedDatabase.js     # Database seeding script
│   └── wordList.js         # Word list for seeding
│
├── .env                    # Environment variables (create this)
├── index.js                # Server entry point
└── package.json            # Project dependencies
```

## ⚙️ Environment Setup

Create a `.env` file in the server directory with the following variables:

```dotenv
# Server Configuration
PORT=5000                  # Port the server will run on

# MongoDB Connection
# Replace username, password, and cluster information with your MongoDB Atlas credentials
# Or use mongodb://localhost:27017/wordledb for local MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/wordledb?retryWrites=true&w=majority

# Authentication
# Use a strong random string for JWT_SECRET (at least 32 characters)
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRY=7d              # Token expiration (7 days)

# Game Settings
WORDS_PER_DAY=1            # Number of daily words
WORD_LENGTH=5              # Length of words to use in the game
MAX_ATTEMPTS=6             # Maximum number of guesses allowed

# Optional Settings
NODE_ENV=development       # Environment (development, production)
ALLOW_CORS=true            # Enable CORS for development
```

### Important Notes About Environment Variables:

1. **JWT_SECRET**: This should be a long, random string used to sign JWT tokens. Never share this value and don't commit it to version control.

2. **MONGO_URI**: For security, use environment-specific connection strings and never commit database credentials to your repository.

3. **NODE_ENV**: Set to 'production' when deploying to hide error details in responses.

4. **Game Settings**: You can adjust word length and max attempts to change the difficulty of the game.

## 📦 MongoDB Setup

### Option 1: MongoDB Atlas (Cloud)

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas/register
2. Create a new cluster (the free tier is sufficient)
3. Click "Connect" on your cluster
4. Choose "Connect your application"
5. Copy the connection string
6. Replace `<username>`, `<password>`, and the cluster information in the MONGO_URI
7. Create a database named `wordledb`

### Option 2: Local MongoDB

1. Install MongoDB Community Edition on your machine
2. Start the MongoDB service
3. Set your MONGO_URI to `mongodb://localhost:27017/wordledb`

## 🚀 Installation & Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Seed the database with words**

   ```bash
   node utils/seedDatabase.js
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **For production**

   ```bash
   npm start
   ```

## 📦 Available Scripts

### `npm start`

Starts the server in production mode.

### `npm run dev`

Starts the server with nodemon for development (auto-reloads on changes).

### `npm test`

Runs the test suite.

## 🔌 API Endpoints

### Authentication

- **POST `/api/auth/register`** - Register a new user

  - Request: `{ username, email, password }`
  - Response: `{ token, user: { id, username, email } }`

- **POST `/api/auth/login`** - Login an existing user

  - Request: `{ email, password }`
  - Response: `{ token, user: { id, username, email } }`

- **GET `/api/auth/user`** - Get current user information
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ user: { id, username, email } }`

### Game

- **GET `/api/wordle/current`** - Get current daily word (masked)

  - Headers: `Authorization: Bearer <token>`
  - Response: `{ wordLength, maxAttempts, attempts: [] }`

- **POST `/api/wordle/guess`** - Submit a guess

  - Headers: `Authorization: Bearer <token>`
  - Request: `{ guess: "words" }`
  - Response: `{ correct, feedback: [...], attempts, gameOver }`

- **GET `/api/wordle/stats`** - Get user statistics
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ gamesPlayed, winRate, currentStreak, maxStreak, guessDistribution }`

## 🔒 Authentication Flow

1. User registers/logs in and receives a JWT token
2. Token is included in the `Authorization` header for subsequent requests
3. The `auth` middleware validates the token for protected routes
4. Token expiration is handled by JWT verification

## 🎮 Game Logic

The game logic has been improved with the following enhancements:

1. **Truly Random Word Selection**: Words are now selected completely randomly from the database instead of by usage count, providing a more varied gameplay experience
2. **Enhanced Word Validation**:
   - Accepts any valid 5-letter word as a guess, even if not in the target word database
   - Provides appropriate feedback for valid words that aren't the target
   - Improves user experience by allowing a wider range of valid guesses
3. Game state is updated and saved to the database
4. Statistics are updated when the game concludes

## 🔄 Error Handling

The server uses consistent error responses:

```json
{
  "error": {
    "message": "Error message description",
    "code": "ERROR_CODE"
  }
}
```

Common error codes:

- `AUTH_INVALID_CREDENTIALS`: Invalid email or password
- `AUTH_USER_EXISTS`: Email already registered
- `GAME_INVALID_GUESS`: Invalid word or format
- `GAME_TOO_MANY_ATTEMPTS`: Maximum attempts reached

## 🚀 Deployment

The server can be deployed to:

- Heroku
- Railway
- Render
- AWS Elastic Beanstalk
- Digital Ocean
- Any Node.js hosting platform

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.
