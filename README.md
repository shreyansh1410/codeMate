# CodeMate Frontend - Project Analysis

## Overview
CodeMate is a social networking platform designed for developers to connect, collaborate, and chat with other developers. The frontend is built using modern web technologies and follows a structured architecture for maintainability and scalability.

## Tech Stack
- **Framework**: React 19 with TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Styling**: Tailwind CSS with DaisyUI components
- **API Communication**: Axios
- **Real-time Communication**: Socket.IO
- **Notifications**: React Hot Toast
- **Build Tool**: Vite

## Project Structure
The codebase follows a modular structure:
- `/src/api`: API service functions for backend communication
- `/src/assets`: Static assets like images
- `/src/components`: Reusable UI components
- `/src/pages`: Page components for different routes
- `/src/store`: Redux store configuration and slices
- `/src/utils`: Utility functions and constants

## Key Features

### Authentication System
- Complete user authentication flow with login and registration
- Protected routes for authenticated users
- Session persistence with cookie-based authentication
- Profile management

### Social Networking
- User feed to discover potential connections
- Connection request system (send/accept/reject)
- User profiles with skills and bio information
- "Interested" and "Ignore" functionality similar to dating apps

### Real-time Chat
- Socket.IO integration for real-time messaging
- Private chat between connected users
- Message history persistence
- Chat UI with message bubbles and sender information

### User Interface
- Modern and responsive design using Tailwind CSS and DaisyUI
- Landing page with hero section and testimonials
- Toast notifications for user feedback
- Loading states and error handling

### State Management
- Redux store with separate slices for:
  - Authentication (authSlice)
  - User connections (connectionsSlice)
  - Feed management (feedSlice)
  - Connection requests (requestsSlice)

## Application Flow
1. Users land on the homepage with a hero section and testimonials
2. They can register or login to access the platform
3. Once authenticated, users are redirected to the feed page
4. Users can browse potential connections and express interest or ignore
5. Connection requests can be managed in the requests page
6. Accepted connections appear in the connections page
7. Users can chat with their connections in real-time

## Development Setup
- Development server with hot module replacement using Vite
- ESLint configuration for code quality
- TypeScript for type safety
- Environment variable handling for API URLs

## Deployment Configuration
- Production build setup with TypeScript compilation
- API URL configuration that adapts between development and production environments
- Socket.IO configuration for both local and production environments