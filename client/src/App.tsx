import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Button } from './components/ui/button';

function App() {
  return (
    <div>
      <header>
        <SignedOut>
          <SignInButton>
            <Button>
              Sign in
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </header>

      <main>
        <h1>Welcome to the App</h1>
      </main>
    </div>
  );
}

export default App;
