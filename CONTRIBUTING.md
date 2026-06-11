# Contributing to Terkix-Builder

Thank you for your interest in contributing to Terkix-Builder! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome diverse perspectives
- Focus on constructive feedback
- Report inappropriate behavior

## Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/your-username/Terkix-Builder.git
cd Terkix-Builder

# Add upstream remote
git remote add upstream https://github.com/original-owner/Terkix-Builder.git
```

### 2. Create Feature Branch

```bash
# Update main branch
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
```

### 3. Make Changes

- Follow code style guidelines
- Write meaningful commit messages
- Add tests for new features
- Update documentation

### 4. Commit and Push

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add new feature description"

# Push to your fork
git push origin feature/your-feature-name
```

### 5. Create Pull Request

- Go to GitHub and create a PR
- Fill in the PR template
- Link related issues
- Wait for review

## Code Style Guidelines

### TypeScript
- Use strict mode
- Define types explicitly
- Avoid `any` type
- Use interfaces over types (when possible)

### React Components
- Use functional components
- Use hooks for state management
- Keep components small and focused
- Add PropTypes or TypeScript types

### Naming Conventions
- Files: `kebab-case` (e.g., `user-profile.tsx`)
- Components: `PascalCase` (e.g., `UserProfile`)
- Functions: `camelCase` (e.g., `getUserData`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRIES`)

### Formatting
- Use Prettier for formatting
- Use ESLint for linting
- 2-space indentation
- 80-character line limit (soft)

## Commit Message Guidelines

Follow the Conventional Commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style changes
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Test additions/changes
- `chore` - Build/dependency changes

### Examples
```
feat(editor): add Monaco editor support
fix(execute): handle timeout errors correctly
docs(setup): update installation instructions
refactor(store): simplify project store logic
```

## Testing

### Running Tests
```bash
npm run test
```

### Writing Tests
- Write tests for new features
- Aim for >80% coverage
- Use descriptive test names
- Test edge cases

### Test Structure
```typescript
describe('Component Name', () => {
  it('should render correctly', () => {
    // Test implementation
  });

  it('should handle user interaction', () => {
    // Test implementation
  });
});
```

## Documentation

### Update Documentation When
- Adding new features
- Changing API endpoints
- Modifying configuration
- Fixing bugs with workarounds

### Documentation Files
- `README.md` - Project overview
- `SETUP.md` - Installation guide
- `ARCHITECTURE.md` - System design
- `API.md` - API documentation (future)

## Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code follows style guidelines
- [ ] Tests pass locally (`npm run test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Code is formatted (`npm run format`)
- [ ] Documentation is updated
- [ ] Commit messages are descriptive
- [ ] No breaking changes (or documented)
- [ ] PR description is clear

## Review Process

### What Reviewers Look For
1. Code quality and style
2. Test coverage
3. Documentation completeness
4. Performance implications
5. Security considerations
6. Breaking changes

### Responding to Feedback
- Be open to suggestions
- Ask for clarification if needed
- Make requested changes
- Re-request review after updates

## Reporting Issues

### Bug Reports
Include:
- Clear description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details
- Screenshots/logs if applicable

### Feature Requests
Include:
- Clear description of the feature
- Use case and motivation
- Proposed implementation (optional)
- Examples or mockups (optional)

## Development Workflow

### Local Development
```bash
# Install dependencies
npm install

# Start development servers
npm run dev

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format
```

### Before Committing
```bash
# Run all checks
npm run lint
npm run test
npm run format
```

## Areas for Contribution

### High Priority
- [ ] Bug fixes
- [ ] Performance improvements
- [ ] Documentation
- [ ] Tests

### Medium Priority
- [ ] New editors support
- [ ] Language support
- [ ] UI/UX improvements
- [ ] API enhancements

### Low Priority
- [ ] Code refactoring
- [ ] Minor optimizations
- [ ] Style improvements

## Getting Help

- **Questions**: Open a discussion
- **Issues**: Search existing issues first
- **Chat**: Join our Discord community
- **Email**: support@terkix.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to Terkix-Builder! 🎉
