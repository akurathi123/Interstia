# Interstia

Interstia is a community-driven platform designed to connect people and foster discussions around various technologies and interests. Users can join existing communities, create new ones, and engage in meaningful conversations.

## Features

- User authentication with email and password (signup, login, logout, password reset)
- User profiles with interests and community memberships
- Discover and join communities based on interests
- Create new communities
- Real-time community chat
- Responsive and modern UI built with React and Tailwind CSS
- Firebase backend for authentication and data storage

## Technologies Used

- React
- TypeScript
- Firebase Authentication
- Firebase Firestore
- Tailwind CSS
- React Router
- React Query

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account and project

### Installation

1. Clone the repository:

```bash
git clone https://github.com/akurathi123/Interstia.git
cd Interstia
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Configure Firebase:

- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable Authentication (Email/Password)
- Create Firestore database
- Copy your Firebase config and update `src/integrations/firebase/client.ts`

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open your browser at `http://localhost:3000`

### Build for Production

```bash
npm run build
# or
yarn build
```

### Deploy to Firebase Hosting

Make sure you have Firebase CLI installed and configured.

```bash
firebase login
firebase init hosting
npm run build
firebase deploy
```

## Project Structure

- `src/` - Source code
  - `components/` - Reusable UI components and modals
  - `hooks/` - Custom React hooks including authentication
  - `integrations/` - Firebase and Supabase client and helpers
  - `pages/` - Application pages (Index, Communities, Chat, etc.)
  - `lib/` - Utility functions
- `public/` - Static assets
- `dist/` - Production build output

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

## License

MIT License

## Contact

For questions or support, please open an issue or contact the maintainer.
