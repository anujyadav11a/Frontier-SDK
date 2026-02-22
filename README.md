# Frontier Auth SDK

A lightweight TypeScript SDK for authentication with your Frontier backend application. Currently supports user registration and login functionality.

## Installation

```bash
npm install frontier-auth-sdk
```

## Quick Start

```typescript
import FrontierAuth from 'frontier-auth-sdk';

const auth = new FrontierAuth();

auth
  .setEndpoint('https://your-backend.com/v1')
  .setProject('your-project-id');

// Sign up new user
const user = await auth.account.create('unique-id', 'user@example.com', 'password', 'John Doe');

// Login user
const session = await auth.account.createEmailSession('user@example.com', 'password');
```

## Current Features

- ✅ User registration (Sign up)
- ✅ Email/password authentication (Login)
- ✅ TypeScript support
- ✅ HTTP client with automatic error handling
- ✅ Configurable endpoint and project settings

## API Reference

### Client Configuration

```typescript
const auth = new FrontierAuth();

// Set your backend endpoint
auth.setEndpoint('https://your-backend.com/v1');

// Set project ID
auth.setProject('your-project-id');

// Set API key (for server-side usage)
auth.setKey('your-api-key');

// Set JWT token (for authenticated requests)
auth.setJWT('your-jwt-token');
```

### Authentication Methods

#### Sign Up

Create a new user account:

```typescript
const user = await auth.account.create(
  'unique-user-id',    // User ID (must be unique)
  'user@example.com',  // Email address
  'securePassword',    // Password
  'John Doe'           // Name (optional)
);

console.log(user);
// Returns User object with: $id, $createdAt, $updatedAt, name, email, emailVerification, status
```

#### Login

Authenticate user with email and password:

```typescript
const session = await auth.account.createEmailSession(
  'user@example.com',  // Email address
  'securePassword'     // Password
);

console.log(session);
// Returns Session object with: $id, userId, expire, provider, ip, device info, etc.
```



## Error Handling

```typescript
import { FrontierException, AuthException } from 'frontier-auth-sdk';

try {
  await auth.account.createEmailSession('user@example.com', 'wrong-password');
} catch (error) {
  if (error instanceof AuthException) {
    console.log('Authentication failed:', error.message);
  } else {
    console.log('Error:', error.message);
  }
}
```

## Complete Example

```typescript
import FrontierAuth from 'frontier-auth-sdk';

async function main() {
  // Initialize SDK
  const auth = new FrontierAuth();
  
  // Configure
  auth
    .setEndpoint('https://your-backend.com/v1')
    .setProject('your-project-id');

  try {
    // Sign up new user
    console.log('Creating account...');
    const user = await auth.account.create(
      'user-123',
      'john@example.com',
      'securePassword123',
      'John Doe'
    );
    console.log('User created:', user);

    // Login user
    console.log('Logging in...');
    const session = await auth.account.createEmailSession(
      'john@example.com',
      'securePassword123'
    );
    console.log('Login successful:', session);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

```



## Development

```bash
# Install dependencies
npm install

# Build the SDK
npm run build

# Watch for changes during development
npm run dev
```

## License

ISC

## Contributing

This SDK is currently in development. More authentication features will be added in future versions.