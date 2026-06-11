import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';
import { executeCode, buildProject } from './server/controllers/executeController';
import { rateLimiter } from './server/middleware/rateLimiter';
import { errorHandler, asyncHandler } from './server/middleware/errorHandler';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(rateLimiter(15 * 60 * 1000, 100)); // 100 requests per 15 minutes

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Projects Routes
app.get('/api/projects', (req, res) => {
  res.json({ success: true, data: [] });
});

app.post('/api/projects', (req, res) => {
  const { name, description, language } = req.body;
  res.json({
    success: true,
    data: {
      id: Date.now().toString(),
      name,
      description,
      language,
      createdAt: new Date(),
    },
  });
});

app.get('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    success: true,
    data: {
      id,
      name: 'My Project',
      description: 'A sample project',
      language: 'javascript',
      createdAt: new Date(),
    },
  });
});

app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  res.json({
    success: true,
    data: {
      id,
      name,
      description,
      updatedAt: new Date(),
    },
  });
});

app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  res.json({ success: true, message: 'Project deleted' });
});

// Files Routes
app.get('/api/files/:projectId', (req, res) => {
  const { projectId } = req.params;
  res.json({ success: true, data: [] });
});

app.post('/api/files', (req, res) => {
  const { projectId, name, content } = req.body;
  res.json({
    success: true,
    data: {
      id: Date.now().toString(),
      projectId,
      name,
      content,
      createdAt: new Date(),
    },
  });
});

app.put('/api/files/:fileId', (req, res) => {
  const { fileId } = req.params;
  const { content } = req.body;
  res.json({
    success: true,
    data: {
      id: fileId,
      content,
      updatedAt: new Date(),
    },
  });
});

app.delete('/api/files/:fileId', (req, res) => {
  const { fileId } = req.params;
  res.json({ success: true, message: 'File deleted' });
});

// Execute Routes
app.post('/api/execute', asyncHandler(executeCode));
app.post('/api/execute/build', asyncHandler(buildProject));

// Build Routes
app.post('/api/build/javascript', (req, res) => {
  const { projectId, files } = req.body;
  res.json({
    success: true,
    output: 'Build completed',
    buildId: Date.now().toString(),
  });
});

app.post('/api/build/python', (req, res) => {
  const { projectId, files } = req.body;
  res.json({
    success: true,
    output: 'Build completed',
    buildId: Date.now().toString(),
  });
});

// WebSocket Events
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('code-change', (data) => {
    socket.broadcast.emit('code-change', data);
  });

  socket.on('file-change', (data) => {
    socket.broadcast.emit('file-change', data);
  });

  socket.on('execute-code', async (data) => {
    try {
      const result = await executeCode(
        { body: data } as any,
        { json: (data: any) => socket.emit('execute-result', data) } as any,
        () => {}
      );
    } catch (error) {
      socket.emit('execute-error', { error: 'Execution failed' });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.API_PORT || 3001;
const HOST = process.env.API_HOST || '0.0.0.0';

httpServer.listen(PORT, HOST as any, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
  console.log(`📡 WebSocket server running on ws://${HOST}:${PORT}`);
  console.log(`🏥 Health check: http://${HOST}:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  httpServer.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
