# Kuvaka - Real-time Chat Application

A modern, real-time ai-chat application built with Next.js 14, featuring phone authentication, theme customization, and a clean user interface.

## Features

- 📱 **Phone Authentication**: Secure OTP-based phone number authentication
- 💬 **Real-time Chat**: Instant messaging with real-time updates
- 🌓 **Theme Toggle**: Switch between light and dark modes
- 🔍 **Search Functionality**: Search through chats
- 🌍 **Country Selection**: International phone number support
- 🎨 **Modern UI**: Built with Tailwind CSS for a beautiful, responsive design
- 🔐 **Protected Routes**: Secure routing with authentication middleware

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: Zustand
- **Authentication**: Custom phone auth implementation
- **TypeScript**: For type safety and better developer experience

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd kuvaka
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```env
   # Add your environment variables here
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
src/
├── app/                    # App router pages
│   ├── auth/              # Authentication pages
│   ├── chat/              # Chat interface
│   └── dashboard/         # User dashboard
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── chat/             # Chat-related components
│   ├── dashboard/        # Dashboard components
│   └── ui/               # Reusable UI components
├── providers/        # Context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and constants
├── store/               # Zustand store definitions
└── types/               # TypeScript type definitions
```

## Key Components

- `AuthProvider`: Manages authentication state and user sessions
- `ChatContainer`: Main chat interface component
- `ThemeToggle`: Handles theme switching functionality
- `ChatroomList`: Displays available chat rooms
- `UserMenu`: User profile and settings menu

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint
- `npm run type-check`: Run TypeScript compiler check

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the terms of the license included in the repository.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- All contributors who have helped shape this project