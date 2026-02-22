/**
 * Basic usage example for Frontier Auth SDK
 */

import FrontierAuth from '../src/index';

async function main() {
  // Initialize the SDK
  const auth = new FrontierAuth();
  
  // Configure the client
  auth
    .setEndpoint('https://your-backend.com/v1')
    .setProject('your-project-id');

  try {
    // Example 1: Create a new account
    console.log('Creating new account...');
    const user = await auth.account.create(
      'unique-user-id',
      'user@example.com',
      'securePassword123',
      'John Doe'
    );
    console.log('Account created:', user);

    // Example 2: Login with email and password
    console.log('Logging in...');
    const session = await auth.account.createEmailSession(
      'user@example.com',
      'securePassword123'
    );
    console.log('Session created:', session);

    // Example 3: Get current user
    console.log('Getting current user...');
    const currentUser = await auth.account.get();
    console.log('Current user:', currentUser);

    // Example 4: Update user preferences
    console.log('Updating preferences...');
    await auth.account.updatePrefs({
      theme: 'dark',
      language: 'en',
      notifications: true
    });

    // Example 5: Create JWT token
    console.log('Creating JWT token...');
    const jwt = await auth.account.createJWT();
    console.log('JWT created:', jwt);

    // Example 6: List all sessions
    console.log('Listing sessions...');
    const sessions = await auth.account.listSessions();
    console.log('Sessions:', sessions);

    // Example 7: Logout (delete current session)
    console.log('Logging out...');
    await auth.account.deleteSession(session.$id);
    console.log('Session deleted');

  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
main();