"use client";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from "@mantine/core";
import { Box } from "@mantine/core";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const theme = createTheme({
  cursorType: "pointer",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>

      <body
        style={{
          overflow: "scroll",
          overflowX: "hidden",
        }}
      >
        <MantineProvider theme={theme}>
          <Box pos={"relative"}>
            <Navbar />
            {children}
            <Footer />
          </Box>
        </MantineProvider>
      </body>
    </html>
  );
}
