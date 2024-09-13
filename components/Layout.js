import Head from 'next/head'
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Quiz App</title>
        <meta name="description" content="A simple quiz application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Quiz App
          </Link>
          <div>
            <Link href="/login" className="mr-4">
              Login
            </Link>
            <Link href="/signup" className="mr-4">
              Sign Up
            </Link>
            <Link href="/dashboard">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto mt-8 px-4">
        {children}
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          © 2024 Quiz App. All rights reserved.
        </div>
      </footer>
    </>
  )
}