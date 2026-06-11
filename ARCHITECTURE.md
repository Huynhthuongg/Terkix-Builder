# Terkix-Builder Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (Browser)                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            React 19 + Next.js 14                     │  │
│  │  ┌─────────────────────────────────────────────┐    │  │
│  │  │  Dashboard | Editor | Settings | Preview    │    │  │
│  │  └─────────────────────────────────────────────┘    │  │
│  │  ┌─────────────────────────────────────────────┐    │  │
│  │  │  Monaco | CodeMirror | Ace Editors         │    │  │
│  │  └─────────────────────────────────────────────┘    │  │
│  │  ┌─────────────────────────────────────────────┐    │  │
│  │  │  Zustand Store | Custom Hooks              │    │  │
│  │  └─────────────────────────────────────────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────┬────────────────────────────────────────────┘
                 │ HTTP + WebSocket
┌────────────────▼────────────────────────────────────────────┐
│                  Backend (Node.js)                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Express.js + Next.js API Routes          │  │
│  │  ┌─────────────────────────────────────────────┐    │  │
│  │  │  Projects | Files | Execute | Build APIs   │    │  │
│  │  └─────────────────────────────────────────────┘    │  │
│  │  ┌─────────────────────────────────────────────┐    │  │
│  │  │  Socket.io WebSocket Server                │    │  │
│  │  └─────────────────────────────────────────────┘    │  │
│  │  ┌─────────────────────────────────────────────┐    │  │
│  │  │  Middleware: CORS, Rate Limit, Error       │    │  │
│  │  └─────────────────────────────────────────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Services Layer                           │  │
│  │  ┌──────────────┬──────────────┬────────────────┐   │  │
│  │  │ JS Executor  │ Py Executor  │ Docker Exec    │   │  │
│  │  └──────────────┴──────────────┴────────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────┬────────────────────────────────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
┌───▼──┐  ┌─────▼────┐  ┌────▼────┐
│ DB   │  │  Docker  │  │  Redis  │
│ PG   │  │ Sandbox  │  │  Cache  │
└──────┘  └──────────┘  └─────────┘
```

## Component Architecture

### Frontend (Client-Side)

#### Pages
- **Dashboard** (`/`) - Project listing and management
- **Editor** (`/editor/[projectId]`) - Main IDE interface

#### Components
- **Editors**
  - `MonacoEditor` - VS Code-like editor
  - `CodeMirrorEditor` - Lightweight editor
  - `AceEditor` - Classic editor
  
- **IDE Components**
  - `EditorPanel` - Main code editor with tabs
  - `FileExplorer` - File tree navigation
  - `Terminal` - Command output display
  - `Preview` - Live preview iframe
  - `Navbar` - Header with actions

#### State Management (Zustand)
- `projectStore` - Project data and operations
- `editorStore` - Editor settings and code state

#### Custom Hooks
- `useProject()` - Project management
- `useExecutor()` - Code execution
- `useEditor()` - Editor state
- `useFileSystem()` - File operations

### Backend (Server-Side)

#### API Routes (Next.js)
```
/api/
├── projects/
│   ├── GET    - List projects
│   ├── POST   - Create project
│   ├── [id]/
│   │   ├── GET    - Get project
│   │   ├── PUT    - Update project
│   │   └── DELETE - Delete project
├── files/
│   ├── GET    - List files
│   ├── POST   - Create file
│   ├── [id]/
│   │   ├── PUT    - Update file
│   │   └── DELETE - Delete file
├── execute/
│   ├── POST   - Execute code
│   └── build/ - Build project
└── build/
    ├── javascript/ - Build JS
    └── python/     - Build Python
```

#### Express Routes
- Same as Next.js API routes
- Additional WebSocket handlers

#### Services Layer
- **JavaScriptExecutor** - Safe JS execution
- **PythonExecutor** - Python subprocess execution
- **DockerExecutor** - Sandboxed execution
- **FileService** - File operations
- **ProjectService** - Project management

#### Middleware
- **CORS** - Cross-origin requests
- **RateLimiter** - Request throttling
- **ErrorHandler** - Centralized error handling
- **AsyncHandler** - Async route wrapper

### Data Flow

#### Code Execution Flow
```
1. User writes code in editor
2. Clicks "Run" button
3. Code sent to backend via POST /api/execute
4. Backend selects executor (JS/Python/Docker)
5. Code executed in isolated environment
6. Output streamed back to client
7. Result displayed in Terminal tab
```

#### File Management Flow
```
1. User creates/edits file in FileExplorer
2. Changes sent to backend via WebSocket
3. Backend updates file in storage
4. Other clients notified of changes
5. UI updated in real-time
```

#### Project Creation Flow
```
1. User clicks "New Project"
2. Form submitted to POST /api/projects
3. Backend creates project record
4. Database updated
5. Project added to user's list
6. Redirect to editor
```

## Technology Stack

### Frontend
- **React 19** - UI library
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Framer Motion** - Animations
- **Lucide Icons** - Icons

### Code Editors
- **Monaco Editor** - VS Code editor
- **CodeMirror 6** - Lightweight editor
- **Ace Editor** - Classic editor

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **Socket.io** - Real-time communication
- **Docker** - Container runtime
- **PostgreSQL** - Database
- **Redis** - Caching

### Build & Deployment
- **Webpack** - Module bundler
- **Vite** - Build tool
- **Docker** - Containerization
- **Docker Compose** - Multi-container setup

## Security Architecture

### Code Execution Security
```
User Code
    ↓
Input Validation
    ↓
Pattern Detection (block dangerous patterns)
    ↓
Sandboxed Execution
    ├── Option 1: Function() API (JS only)
    ├── Option 2: Subprocess (Python)
    └── Option 3: Docker Container (both)
    ↓
Output Sanitization
    ↓
Return to Client
```

### API Security
- **CORS** - Restrict cross-origin requests
- **Rate Limiting** - Prevent abuse
- **Input Validation** - Validate all inputs
- **Error Handling** - Don't expose internals
- **JWT** - Secure authentication (future)

### Docker Security
- **Memory Limits** - 128MB per container
- **CPU Limits** - 50% CPU quota
- **Timeout** - 10 second execution limit
- **Isolation** - Separate filesystem

## Scalability Considerations

### Horizontal Scaling
- Stateless API servers
- Load balancer (nginx/HAProxy)
- Shared database (PostgreSQL)
- Cache layer (Redis)

### Performance Optimization
- Code splitting
- Lazy loading
- Database indexing
- Query optimization
- Connection pooling

### Monitoring & Logging
- Application logs
- Docker logs
- Database query logs
- Performance metrics

## Future Enhancements

1. **Real-time Collaboration**
   - Operational Transformation (OT)
   - Conflict resolution
   - User presence

2. **Advanced Features**
   - Git integration
   - Package management
   - Database integration
   - API integration

3. **Performance**
   - WebWorkers for heavy computation
   - Service Workers for offline
   - Progressive Web App (PWA)

4. **Deployment**
   - One-click deployment
   - Custom domains
   - SSL certificates
   - CDN integration

5. **AI Integration**
   - Code suggestions
   - Error detection
   - Performance analysis
   - Documentation generation
