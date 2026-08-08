import './globals.css'

export const metadata = {
  title: 'GenZGift - Birthday Greeting',
  description: 'Send a personalized birthday greeting with pics, letters, and surprises!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fce7f3" />
      </head>
      <body className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 min-h-screen">
        {children}
      </body>
    </html>
  )
}
