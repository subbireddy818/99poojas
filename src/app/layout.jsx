import './globals.css';

export const metadata = {
  title: '99Poojas - Guiding Your Spiritual Journey with Trusted Services',
  description: 'Book certified Vedic pandits and purohits online in Hyderabad for Homams, Abhishekalu, Kalyanams, Poojas, and traditional ceremonies.',
  icons: {
    icon: '/images/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#FAF7F2] text-slate-800 dark:bg-[#0B1120] dark:text-slate-100 transition-colors duration-200 antialiased font-sans selection:bg-sacred-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
