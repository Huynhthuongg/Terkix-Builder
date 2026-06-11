# Terkix-Builder

A comprehensive IDE web platform with code editor, runtime environment, and build system. Similar to Replit but built with your own tech stack.

## Features

### 🎨 Frontend
- **Multiple Code Editors**: Monaco Editor (VS Code), CodeMirror, Ace
- **Responsive UI**: Modern IDE interface with file explorer, editor, terminal, and preview
- **Real-time Collaboration**: WebSocket support for live updates
- **Dark/Light Theme**: Customizable theme support

### ⚙️ Backend
- **Express Server**: RESTful API for project management
- **Next.js API Routes**: Serverless functions for code execution
- **WebSocket Support**: Real-time communication
- **Authentication**: Secure user authentication

### 🚀 Runtime & Build
- **JavaScript/TypeScript Support**: Full ES6+ support
- **Python Support**: Python 3.x execution
- **Docker Sandboxing**: Secure code execution in isolated containers
- **WebContainers**: Browser-based runtime environment
- **Build System**: Webpack/Vite integration for optimized builds

### 💾 Storage & Management
- **File Management**: Create, edit, delete files and folders
- **Project Storage**: Save and load projects
- **Version Control**: Git integration (optional)
- **Export/Import**: Download and upload projects

### 🔐 Security
- **Sandboxed Execution**: Isolated code execution environment
- **User Authentication**: Secure login and session management
- **Rate Limiting**: API rate limiting to prevent abuse
- **Input Validation**: Comprehensive input validation

## Project Structure

```
Terkix-Builder/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── projects/             # Project management APIs
│   │   ├── execute/              # Code execution APIs
│   │   ├── files/                # File management APIs
│   │   └── build/                # Build APIs
│   ├── (dashboard)/              # Dashboard layout
│   │   ├── page.tsx              # Dashboard home
│   │   ├── projects/             # Projects page
│   │   └── settings/             # Settings page
│   ├── (editor)/                 # Editor layout
│   │   ├── [projectId]/          # Project editor
│   │   └── layout.tsx            # Editor layout
│   └── layout.tsx                # Root layout
├── components/                   # React components
│   ├── editors/                  # Editor components
│   │   ├── MonacoEditor.tsx
│   │   ├── CodeMirrorEditor.tsx
│   │   └── AceEditor.tsx
│   ├── ide/                      # IDE components
│   │   ├── FileExplorer.tsx
│   │   ├── Terminal.tsx
│   │   ├── Preview.tsx
│   │   └── EditorPanel.tsx
│   ├── ui/                       # UI components
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   ├── Sidebar.tsx
│   │   └── Navbar.tsx
│   └── shared/                   # Shared components
├── lib/                          # Utility functions
│   ├── api.ts                    # API client
│   ├── storage.ts                # Storage utilities
│   ├── compiler.ts               # Compiler utilities
│   └── utils.ts                  # General utilities
├── hooks/                        # Custom React hooks
│   ├── useProject.ts
│   ├── useEditor.ts
│   ├── useFileSystem.ts
│   └── useExecutor.ts
├── store/                        # Zustand store
│   ├── projectStore.ts
│   ├── editorStore.ts
│   ├── fileStore.ts
│   └── executorStore.ts
├── types/                        # TypeScript types
│   ├── project.ts
│   ├── editor.ts
│   ├── file.ts
│   └── execution.ts
├── server/                       # Express server
│   ├── index.ts                  # Server entry point
│   ├── routes/                   # Route handlers
│   │   ├── projects.ts
│   │   ├── execute.ts
│   │   ├── files.ts
│   │   └── build.ts
│   ├── controllers/              # Business logic
│   ├── middleware/               # Custom middleware
│   ├── services/                 # External services
│   │   ├── docker.ts             # Docker service
│   │   ├── compiler.ts           # Compiler service
│   │   └── storage.ts            # Storage service
│   └── utils/                    # Server utilities
├── public/                       # Static files
├── styles/                       # Global styles
├── .env.example                  # Environment variables template
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## Getting Started

### Prerequisites
- Node.js 18+
- Docker (for sandboxed execution)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/Terkix-Builder.git
cd Terkix-Builder

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## Technology Stack

### Frontend
- **React 19**: UI library
- **Next.js 14**: React framework with API routes
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: Component library
- **Zustand**: State management

### Code Editors
- **Monaco Editor**: VS Code-like editor
- **CodeMirror 6**: Lightweight editor
- **Ace Editor**: Lightweight editor

### Backend
- **Express.js**: Web framework
- **Socket.io**: Real-time communication
- **Docker**: Container runtime
- **WebContainers**: Browser-based runtime

### Build & Compilation
- **Webpack**: Module bundler
- **Vite**: Build tool
- **Babel**: JavaScript compiler
- **TypeScript Compiler**: TypeScript compilation

## API Documentation

### Projects API
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Files API
- `GET /api/files/:projectId` - List project files
- `POST /api/files/:projectId` - Create file
- `PUT /api/files/:projectId/:fileId` - Update file
- `DELETE /api/files/:projectId/:fileId` - Delete file

### Execute API
- `POST /api/execute` - Execute code
- `POST /api/execute/build` - Build project

### Build API
- `POST /api/build/javascript` - Build JavaScript
- `POST /api/build/python` - Build Python

## Configuration

### Environment Variables

```env
# Database
DATABASE_URL=your_database_url

# Docker
DOCKER_HOST=unix:///var/run/docker.sock
DOCKER_SOCKET=/var/run/docker.sock

# API
API_PORT=3001
API_HOST=localhost

# Storage
STORAGE_PATH=/data/projects
MAX_FILE_SIZE=10485760

# Security
JWT_SECRET=your_jwt_secret
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

## Development

### Running Tests
```bash
npm run test
```

### Linting
```bash
npm run lint
```

### Formatting
```bash
npm run format
```

## Deployment

### Docker Deployment
```bash
docker build -t terkix-builder .
docker run -p 3000:3000 terkix-builder
```

### Vercel Deployment
```bash
vercel deploy
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@terkix.com or open an issue on GitHub.

## Roadmap

- [ ] Real-time collaboration
- [ ] Git integration
- [ ] Package management (npm, pip)
- [ ] Database integration
- [ ] AI-powered code suggestions
- [ ] Mobile app
- [ ] Advanced debugging tools
- [ ] Performance profiling
- [ ] Custom domains
- [ ] Team management

## Acknowledgments

- Inspired by Replit
- Built with React, Next.js, and Express
- Uses Monaco Editor, CodeMirror, and Ace Editor
