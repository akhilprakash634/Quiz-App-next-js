import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Layout({ children }) {
  const { data: session } = useSession();

  return (
    <div>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-white text-2xl font-bold">
            Quiz App
          </Link>
          <div>
            <Link href="/leaderboard" className="text-white mr-4">
              Leaderboard
            </Link>
            {session ? (
              <>
                <Link href="/dashboard" className="text-white mr-4">
                  Dashboard
                </Link>
                <button onClick={() => signOut()} className="text-white">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-white mr-4">
                  Login
                </Link>
                <Link href="/signup" className="text-white">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}