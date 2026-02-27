# Frontier Auth SDK

A lightweight TypeScript SDK for authentication with your Frontier backend application. Currently supports tenant user registration and login functionality.

## Installation

```bash
npm install @anujyadav070/frontier-sdk
```

## Quick Start

```typescript
import FrontierAuth from '@anujyadav070/frontier-sdk';

const auth = new FrontierAuth();

auth
  .setEndpoint('https://your-backend.com/api/v1')
  .setProject('your-project-id')
  .setKey('your-api-key');

// Sign up new tenant user
const user = await auth.account.create('username', 'user@example.com', 'password');

// Login tenant user
const session = await auth.account.createEmailSession('user@example.com', 'password');
```

## Current Features

- ✅ Tenant user registration (Sign up)
- ✅ Tenant user email/password authentication (Login)
- ✅ TypeScript support with full type definitions
- ✅ HTTP client with automatic error handling
- ✅ Configurable endpoint, project, and API key settings
- ✅ JWT token support for authenticated requests
- ✅ Custom exception handling (FrontierException, AuthException, etc.)
- ✅ Debug logging for development

## API Reference

### Client Configuration

```typescript
const auth = new FrontierAuth();

// Set your backend endpoint (required)
auth.setEndpoint('https://your-backend.com/api/v1');

// Set project ID (required)
auth.setProject('your-project-id');

// Set API key (required for authentication)
auth.setKey('your-api-key');

// Set JWT token (optional, for authenticated requests)
auth.setJWT('your-jwt-token');
```

### Authentication Methods

#### Tenant User Registration

Create a new tenant user account:

```typescript
const user = await auth.account.create(
  'username',          // Username (required)
  'user@example.com',  // Email address (required)
  'securePassword'     // Password (required)
);

console.log(user);
// Returns User object with: $id, $createdAt, $updatedAt, name, email, emailVerification, status
```

#### Tenant User Login

Authenticate tenant user with email and password:

```typescript
const session = await auth.account.createEmailSession(
  'user@example.com',  // Email address
  'securePassword'     // Password
);

console.log(session);
// Returns Session object with: $id, userId, expire, provider, ip, device info, etc.
```



## Error Handling

The SDK includes comprehensive error handling with custom exception types:

```typescript
import { FrontierException, AuthException, NetworkException, ValidationException } from '@anujyadav070/frontier-sdk';

try {
  await auth.account.createEmailSession('user@example.com', 'wrong-password');
} catch (error) {
  if (error instanceof AuthException) {
    console.log('Authentication failed:', error.message);
    console.log('Error code:', error.code);
    console.log('Error type:', error.type);
  } else if (error instanceof ValidationException) {
    console.log('Validation error:', error.message);
  } else if (error instanceof NetworkException) {
    console.log('Network error:', error.message);
  } else if (error instanceof FrontierException) {
    console.log('Frontier error:', error.message);
  } else {
    console.log('Unknown error:', error.message);
  }
}
```

### Exception Types

- **FrontierException**: Base exception class for all SDK errors
- **AuthException**: Authentication-related errors (401)
- **NetworkException**: Network connectivity issues
- **ValidationException**: Input validation errors (400)

## Complete Example

```typescript
import FrontierAuth from '@anujyadav070/frontier-sdk';

async function main() {
  // Initialize SDK
  const auth = new FrontierAuth();
  
  // Configure (all required)
  auth
    .setEndpoint('https://your-backend.com/api/v1')
    .setProject('your-project-id')
    .setKey('your-api-key');

  try {
    // Sign up new tenant user
    console.log('Creating tenant account...');
    const user = await auth.account.create(
      'johndoe',
      'john@example.com',
      'securePassword123'
    );
    console.log('Tenant user created:', user);

    // Login tenant user
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

main();
```

## API Endpoints

The SDK currently supports these Frontier backend endpoints:

- `POST /api/v1/tenantuser/tenantRegister` - Tenant user registration
- `POST /api/v1/tenantuser/tenatlogin` - Tenant user login

## Configuration Requirements

The SDK requires the following configuration before making API calls:

1. **Endpoint**: Your Frontier backend URL (e.g., `https://your-backend.com/api/v1`)
2. **Project ID**: Your project identifier
3. **API Key**: Your API key for authentication

Missing any of these will result in configuration errors.



## Development

```bash
# Install dependencies
npm install

# Build the SDK
npm run build

# Watch for changes during development
npm run dev

# Prepare for publishing
npm run prepublishOnly
```

## Package Information

- **Version**: 1.0.10
- **Package Name**: @anujyadav070/frontier-sdk
- **Repository**: [GitHub](https://github.com/anujyadav11a/Frontier-SDK)
- **Author**: ANUJ YADAV
- **License**: ISC

## TypeScript Support

The SDK is built with TypeScript and includes full type definitions. All types are exported for use in your applications:

```typescript
import { User, Session, FrontierException } from '@anujyadav070/frontier-sdk';
```

## Roadmap

Future versions will include:

- User profile management
- Password reset functionality
- Email verification
- Session management (list, delete sessions)
- JWT token creation and validation
- User preferences management
- Multi-factor authentication support

## License

ISC

## Contributing

This SDK is currently in active development. More authentication features will be added in future versions. Feel free to contribute by submitting issues or pull requests on [GitHub](https://github.com/anujyadav11a/Frontier-SDK).