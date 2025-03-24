import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { Box } from '@mantine/core';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function RootLayout({ children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>

      <body style={
        {
          overflow: 'scroll',
        }
      }>
        <MantineProvider>

          <Box pos={'relative'}>
            <Navbar/>
            {children}
            <Footer/>
          </Box>
        </MantineProvider>
      </body>
    </html>
  );
}
