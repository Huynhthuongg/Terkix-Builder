# Terkix-Builder Setup Guide

## Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Git
- npm or pnpm

## Local Development Setup

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/Terkix-Builder.git
cd Terkix-Builder

# Install dependencies
npm install
# or
pnpm install
```

### 2. Environment Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### 3. Start Development Servers

```bash
# Start both Next.js and Express servers
npm run dev

# Or start them separately in different terminals:
# Terminal 1 - Next.js
npm run dev:next

# Terminal 2 - Express
npm run dev:server
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Docker Setup

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

This will start:
- Next.js app on port 3000
- Express API on port 3001
- PostgreSQL database
- Redis cache

### Building Docker Image

```bash
# Build image
docker build -t terkix-builder:latest .

# Run container
docker run -p 3000:3000 -p 3001:3001 \
  -e DATABASE_URL=postgresql://user:password@db:5432/terkix_builder \
  terkix-builder:latest
```

## Production Deployment

### Vercel (Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel deploy

# Set environment variables
vercel env add NEXT_PUBLIC_API_URL
```

### Railway/Render (Backend)

1. Create account on Railway or Render
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Self-Hosted (VPS)

```bash
# Build application
npm run build

# Start production server
npm start
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment | development |
| `NEXT_PUBLIC_API_URL` | API URL | http://localhost:3001 |
| `API_PORT` | API port | 3001 |
| `DATABASE_URL` | PostgreSQL URL | - |
| `DOCKER_SOCKET` | Docker socket path | /var/run/docker.sock |
| `JWT_SECRET` | JWT secret key | - |
| `RATE_LIMIT_WINDOW` | Rate limit window (min) | 15 |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

### Database Setup

```bash
# Using Docker Compose (automatic)
docker-compose up -d db

# Manual PostgreSQL setup
createdb terkix_builder
psql terkix_builder < schema.sql
```

## Development Workflow

### File Structure

```
Terkix-Builder/
├── app/              # Next.js app directory
├── components/       # React components
├── server/          # Express server
├── store/           # Zustand stores
├── hooks/           # Custom hooks
├── types/           # TypeScript types
└── styles/          # Global styles
```

### Code Standards

- Use TypeScript for type safety
- Follow ESLint rules
- Format with Prettier
- Write meaningful commit messages

### Running Tests

```bash
npm run test
```

### Linting and Formatting

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### Docker Issues

```bash
# Check Docker status
docker ps

# View Docker logs
docker logs <container-id>

# Rebuild Docker image
docker-compose build --no-cache
```

### Database Connection Issues

```bash
# Check PostgreSQL connection
psql postgresql://user:password@localhost:5432/terkix_builder

# Reset database
docker-compose down -v
docker-compose up -d db
```

## Performance Optimization

### Frontend
- Enable code splitting
- Optimize images
- Use lazy loading
- Implement service workers

### Backend
- Use connection pooling
- Implement caching (Redis)
- Optimize database queries
- Use compression middleware

## Security Checklist

- [ ] Change default passwords
- [ ] Enable HTTPS in production
- [ ] Set up firewall rules
- [ ] Enable rate limiting
- [ ] Implement CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable Docker security options
- [ ] Regular security updates

## Monitoring and Logging

### Logs Location

```bash
# Application logs
tail -f logs/app.log

# Docker logs
docker-compose logs -f

# System logs
journalctl -u terkix-builder
```

### Health Checks

```bash
# API health check
curl http://localhost:3001/health

# Frontend health check
curl http://localhost:3000
```

## Support

For issues and questions:
- GitHub Issues: https://github.com/yourusername/Terkix-Builder/issues
- Email: support@terkix.com
- Documentation: https://docs.terkix.com

## License

MIT License - see LICENSE file for details
