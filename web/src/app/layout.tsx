import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { Button, Input, Flex, Box } from '@mantine/core';
import { ShoppingCart, Search } from 'lucide-react';

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

          <Box px='md'>

            <Flex justify='space-between'
                  align={'center'}>
              <h1>TicketHub</h1>
              
              <Flex justify='space-between'
                    align={'center'}
                    gap={'md'}
                    pos={'sticky'}>

                <Input placeholder="Search events.." 
                      leftSection={<Search/>}
                      size='md'/>
                <Button color='black'
                        size='md'>
                          <ShoppingCart />
                </Button>
                <Button size='md'>Sign In</Button>

              </Flex>

            </Flex>

            {children}
          </Box>
        </MantineProvider>
      </body>
    </html>
  );
}
