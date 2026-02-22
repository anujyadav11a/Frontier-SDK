# Frontier Auth SDK

A TypeScript SDK for authentication with your Frontier backend application.

## Installation

```bash
npm install frontier-sdk
```

## Quick Start

```typescript
import FrontierAuth from 'frontier-sdk';

const auth = new FrontierAuth();

auth
  .setEndpoint('https://your-backend.com/v1')
  .setProject('your-project-id');

// Create account
const user = await auth.account.create('unique-id', 'user@example.com', 'password', 'John Doe');

// Login
const session = await auth.account.createEmailSession('user@example.com', 'password');

// Get current user
const currentUser = await auth.account.get();
```

## Features

- ✅ User registration and authentication
- ✅ Session management
- ✅ Password recovery
- ✅ Email verification
- ✅ Phone verification
- ✅ Multi-factor authentication (MFA)
- ✅ JWT token support
- ✅ Anonymous sessions
- ✅ User preferences
- ✅ Identity management
- ✅ TypeScript support

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

### Account Management

```typescript
// Create account
const user = await auth.account.create('unique-id', 'email@example.com', 'password', 'Name');

// Login with email
const session = await auth.account.createEmailSession('email@example.com', 'password');

// Create anonymous session
const anonymousSession = await auth.account.createAnonymousSession();

// Get current user
const user = await auth.account.get();

// Update user details
await auth.account.updateName('New Name');
await auth.account.updateEmail('new@example.com', 'current-password');
await auth.account.updatePassword('new-password', 'old-password');

// Logout
await auth.account.deleteSession('session-id');
await auth.account.deleteSessions(); // Delete all sessions
```

### Password Recovery

```typescript
// Request password recovery
await auth.account.createRecovery('email@example.com', 'https://yourapp.com/reset');

// Complete password recovery
await auth.account.updateRecovery('user-id', 'secret-token', 'new-password');
```

### Email Verification

```typescript
// Send verification email
await auth.account.createVerification('https://yourapp.com/verify');

// Verify email
await auth.account.updateVerification('user-id', 'secret-token');
```

### Multi-Factor Authentication

```typescript
// Create MFA authenticator
const mfa = await auth.account.createMfaAuthenticator('totp');

// Verify MFA setup
await auth.account.updateMfaAuthenticator('totp', 'otp-code');

// Create MFA challenge
const challenge = await auth.account.createMfaChallenge('totp');

// Complete MFA challenge
await auth.account.updateMfaChallenge('challenge-id', 'otp-code');

// Get recovery codes
const codes = await auth.account.getMfaRecoveryCodes();
```

## Error Handling

```typescript
import { AuthException, NetworkException } from 'frontier-sdk';

try {
  await auth.account.createEmailSession('email@example.com', 'wrong-password');
} catch (error) {
  if (error instanceof AuthException) {
    console.log('Authentication failed:', error.message);
  } else if (error instanceof NetworkException) {
    console.log('Network error:', error.message);
  }
}
```

## License

ISC