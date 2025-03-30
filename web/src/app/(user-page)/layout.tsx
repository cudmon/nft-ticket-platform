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
import { MetaMaskProvider } from "@metamask/sdk-react";

const theme = createTheme({
  cursorType: "pointer",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const host =
    typeof window !== "undefined" ? window.location.host : "defaultHost";

  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "Next-Metamask-Boilerplate",
      url: host, // using the host constant defined above
    },
  };


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
          <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
            <Box pos={"relative"}>
              <Navbar />
              {children}
              <Footer />
            </Box>
          </MetaMaskProvider> 
        </MantineProvider>
      </body>
    </html>
  );
}
