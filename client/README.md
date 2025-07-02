# 🎮 Wordle Clone - Client

This is the React frontend for the Wordle Clone application, built with React, Tailwind CSS, and custom animations. This client-side application provides a responsive and interactive user interface for the Wordle game.

## 🚀 Features

- **Responsive UI**: Optimized for all device sizes
- **User Authentication**: Secure login and registration with consistent form components
- **Game Board**: Interactive game with letter animations
- **Virtual Keyboard**: Dynamic keyboard with color feedback
- **Statistics**: Track your game performance
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Toast Notifications**: Elegant feedback messages
- **How-to-play Guide**: Built-in instructions modal
- **Random Word Selection**: Words are chosen randomly for variety
- **Improved Word Validation**: Better handling of valid word submissions

## 📂 Project Structure

```
client/
├── public/            # Static files
│   ├── index.html     # HTML entry point
│   └── favicon.ico    # Site favicon
├── src/
│   ├── components/    # Reusable UI components
│   │   ├── DarkModeToggle.js  # Theme toggle component
│   │   ├── FormInput.js       # Reusable form input component
│   │   ├── GameBoard.js       # Main game board
│   │   ├── GameCell.js        # Individual letter cell
│   │   ├── GameRow.js         # Row of game cells
│   │   ├── Header.js          # App header with navigation
│   │   ├── HowToPlay.js       # Game instructions modal
│   │   ├── Keyboard.js        # Virtual keyboard
│   │   ├── PrivateRoute.js    # Route protection
│   │   └── Toast.js           # Notification component
│   │
│   ├── contexts/      # React Context providers
│   │   ├── AuthContext.js     # Authentication state
│   │   ├── GameContext.js     # Game state
│   │   └── ThemeContext.js    # Dark/light mode state
│   │
│   ├── pages/         # Main application views
│   │   ├── Home.js            # Game screen
│   │   ├── Login.js           # Login page
│   │   ├── Register.js        # Registration page
│   │   └── Stats.js           # Statistics page
│   │
│   ├── styles/        # Component-specific styles
│   │   ├── FormInput.css      # Shared form input styles
│   │   ├── Login.css          # Login page styles
│   │   ├── Register.css       # Register page styles
│   │   └── [Other styles]     # Component-specific styles
│   │
│   ├── utils/         # Utility functions
│   │
│   ├── App.js         # Main application component
│   ├── App.css        # Global styles
│   ├── index.js       # React entry point
│   └── index.css      # Tailwind imports and global styles
│
├── tailwind.config.js # Tailwind CSS configuration
├── postcss.config.js  # PostCSS configuration
└── package.json       # Project dependencies
```

## 🛠️ Setup and Installation

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the development server**

   ```bash
   npm start
   ```

3. **Open your browser** and navigate to http://localhost:3000

## 📦 Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000).

### `npm test`

Runs the test suite.

### `npm run build`

Builds the app for production in the `build` folder.

### `npm run eject`

**Note: this is a one-way operation!**
Ejects the app from Create React App configuration for advanced customization.

## 🎨 UI Improvements

### Form Components
The application now uses a shared `FormInput` component for consistency across login and registration forms with:
- Consistent styling and behavior
- Error handling
- Password visibility toggle
- Icon support
- Cross-browser compatibility

### Layout and Z-Index Management
- Proper z-index layering for header and forms
- Fixed header overlay issues with scrolling content
- Consistent spacing and padding across the application

### Dark Mode Support
- All components now properly support both light and dark themes
- Consistent color schemes throughout the application

## 🔒 Authentication

Authentication is handled through `AuthContext.js` which:

1. Manages user login state
2. Provides login/logout/register functions
3. Stores JWT token in localStorage
4. Protects routes using `PrivateRoute.js`
5. Provides context-aware header navigation (hiding login/register buttons on respective pages)

## 🎮 Game Logic

Game state is managed through `GameContext.js` which:

1. Handles random word generation and enhanced validation
2. Tracks current game state
3. Manages guess history and letter states
4. Updates statistics on game completion

## 🧩 Component Customization

The app is built with modular components that can be customized:

- `GameCell.js`: Individual letter cells with animation states
- `GameRow.js`: Rows of letter cells with validation
- `Keyboard.js`: Interactive keyboard that updates based on guesses
- `Toast.js`: Configurable notification component
- `FormInput.js`: Reusable form input component for consistent styling

## 📱 Responsive Design

The UI is fully responsive through:

1. Tailwind CSS breakpoints
2. Flexbox and Grid layouts
3. Mobile-first design approach
4. Properly positioned UI elements with appropriate z-index management

## 🚀 Deployment

To deploy the client:

1. **Build the production version**

   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to any static hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - Firebase Hosting
   - AWS S3

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.
