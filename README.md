## ThinkNote

**ThinkNote** is a web Application. It allows users to save, manage, share and preview different types of content like documents, YouTube videos, Tweets, and external links in a beautifully designed interface.

##  Features

-  **JWT Authentication** (Login & Signup)
-  **Add & Manage Notes**
  - Document, YouTube, Twitter, Link
-  **Search Functionality**
-  **Tag Filtering** (future support)
-  **Content Deletion with Confirmation**
-  **Real-time UI Update**
-  **Light/Dark Mode Toggle**
-  **Content Sharing via Hash Link**
-  **Responsive UI with Theme Customization**
-  **Auto-dismissing Toast Alerts**
-  **MERN Stack with RESTful API**

---

# Screenshots
<img width="1905" height="885" alt="image" src="https://github.com/user-attachments/assets/babeba08-c8b7-40bc-9643-1b0aba02a213" />
<img width="1866" height="876" alt="image" src="https://github.com/user-attachments/assets/2c7f8ee0-9ba7-4a39-987b-245ef6136016" />
<img width="995" height="831" alt="image" src="https://github.com/user-attachments/assets/fe475b4e-d285-498d-9bea-0e30f4dc67ce" />
<img width="1894" height="781" alt="image" src="https://github.com/user-attachments/assets/fd61f939-8bd1-4234-9210-e336d7b1c70a" />


## 🛠️ Tech Stack

**Frontend:**
- React
- TypeScript
- Tailwind CSS
- ShadCN/UI Components
- Lucide Icons
- Framer Motion
---

## 📁 Folder Structure

```
thinkNote/
├── src/
│ ├── components/
│ ├── pages/
│ ├── hooks/
│ ├── icons/
│ ├── config/
│ └── App.tsx
├── public/
├── .env
└── README.md
```

## Getting Started
```
git clone https://github.com/your-username/thinkNote.git
cd thinkNote
npm install
npm run dev

```

# Author

Made with ❤ by Chandrashekher



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
