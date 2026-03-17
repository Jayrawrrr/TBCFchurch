# True Bread Christian Fellowship Website

A modern, aesthetic Christian church website for True Bread Christian Fellowship, with a TBTI Bible school login, built with React and Tailwind CSS.

## Features

- ✨ Modern, clean design (TBCF: navy/gold/teal; TBTI: maroon/antique gold)
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast and optimized with Vite
- 🎨 Beautiful animations and transitions
- 📝 Contact form with validation
- 🎯 Smooth scrolling navigation
- 🌟 Intersection Observer animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

### TBTI Portal & Firebase

The TBTI student portal uses **Firebase Auth** (email + Google) and **Firestore** for user profiles and enrollment.

1. **Create a `.env.local`** in the project root (copy from `.env.example`) and add your Firebase web app config from [Firebase Console](https://console.firebase.google.com) → Project settings → Your apps.
2. **Enable Auth providers**: Authentication → Sign-in method → enable **Email/Password** and **Google**.
3. **Deploy Firestore rules** (from project root, if you use Firebase CLI):
   ```bash
   firebase deploy --only firestore:rules
   ```
   Or paste the contents of `firestore.rules` into Firebase Console → Firestore → Rules.
4. **Enrollment**: Each user has a document at `users/{uid}` with `isEnrolled: true/false`. Set `isEnrolled: true` in Firestore (or via a future admin panel) to grant access to the Lessons module.

## Project Structure

```
Church/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Events.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Technologies Used

- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Playfair Display & Inter)

## Customization

You can easily customize:
- Colors in `tailwind.config.js`
- Content in each component file
- Styles in `src/index.css`
- Fonts by updating the Google Fonts link in `index.html`

## License

This project is open source and available for use.
