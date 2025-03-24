import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { Box } from '@mantine/core';
import Navbar from '@/components/navbar';

export default function RootLayout({ children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>

      <body>
        <MantineProvider>

          <Box pos={'relative'}>
            <Navbar/>
            
            {children}
          </Box>
        </MantineProvider>
      </body>
    </html>
  );
}
