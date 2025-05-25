# Copilot Instructions for Inventory Tracker

## Testing Requirements

All contributions to the Inventory Tracker project must include appropriate tests. This document outlines the testing requirements and procedures that must be followed for all pull requests and new features.

### Testing Frameworks

This project uses the following testing frameworks:

- **Vitest**: For unit testing individual components and functions
- **Playwright**: For end-to-end (E2E) testing of the application

### Running Tests

Before submitting a pull request, ensure all tests pass by running:

```bash
# Run all tests
npm run test

# Run unit tests only
npm run test:unit

# Run end-to-end tests only
npm run test:e2e
```

### Unit Testing Requirements

For every new feature or modification:

1. **Add unit tests** for all new functions, methods, and components
2. **Update existing tests** if you modify existing functionality
3. **Ensure test coverage** for both success cases and edge cases/error handling

Unit tests should be placed in the `tests/unit` directory, following the same structure as the source files they test.

Example unit test file structure:
```
tests/unit/
  └── db.test.ts      # Tests for database operations
  └── utils.test.ts   # Tests for utility functions
```

### End-to-End Testing Requirements

For user-facing features:

1. **Add E2E tests** that verify the feature works correctly from a user perspective
2. **Test all user interactions** and workflows that could be affected by your changes

E2E tests should be placed in the `tests/e2e` directory.

Example E2E test file structure:
```
tests/e2e/
  └── app.e2e.ts      # General application tests
  └── feature.e2e.ts  # Feature-specific tests
```

### Test Quality Guidelines

- Tests should be **independent** and not rely on the state from other tests
- Use **descriptive test names** that explain what's being tested
- Follow the **Arrange-Act-Assert** pattern for clear test structure
- Mock external dependencies when appropriate
- Test both **positive and negative scenarios**

### Pull Request Checklist

Before submitting a PR, ensure:

- [ ] All existing tests are passing
- [ ] New unit tests are added for new functionality
- [ ] New E2E tests are added for user-facing changes
- [ ] Test coverage is maintained or improved

No pull requests will be merged without adequate test coverage for new features and modifications.