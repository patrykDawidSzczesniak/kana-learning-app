Kana learning app

A fullstack app inspired by Tofugu quiz, extended with auth features and saving progress.

Features:
- Quiz mode with level progression,
- Free play mode for custom practice,
- Easy switch between Hiragana and Katakana practice,
- Animated UI & Toast notifications,
- User authentication (JWT),
- Highscore tracking (by score and time),

Stack:
Frontend (`client/`):
- React + TypeScript,
- Tailwind CSS,
- React Router DOM,
- React Query,
- Framer Motion,
- React Hot Toast,

Backend (`src/`):
- Node.js + TypeScript,
- Express.js,
- SQLite,
- JWT Authentication,

Setup Instructions:
Prerequisites
- Node.js,
- npm,

Steps:
1. Unzip project
2. Open terminal in root folder
3. Run: 'npm install'
4. Run: 'cd client'
5. Run: 'npm install'
6. Run: 'cd..'
7. Create .env file in root folder and create following variables there:
  JWT_SECRET = your secret key
  JWT_EXPIRATION = expiration time (in "number"h format)
8. Run: 'npm run reset-db'
9. Run: 'npm run dev'
10. Enjoy! 
