import './globals.css'

export const metadata = {
  title: 'GenZGift - Birthday Greeting',
  description: 'Send a personalized birthday greeting with pics, letters, and surprises!',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 min-h-screen">
        {children}
      </body>
    </html>
  )
}
