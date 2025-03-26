import { Flex, Input, Button } from "@mantine/core";
import { Search } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
        <Flex justify='space-between'
                  align={'center'}
                  px={'md'}
                  style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    backgroundColor: 'white',
                    'boxShadow': 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
                  }}>

              <Link href={'/'} style={{textDecoration: 'none', color: 'black'}}>
                <h1>TicketHub</h1>
              </Link>
              
              <Flex justify='space-between'
                    align={'center'}
                    gap={'md'}
                    >

                <Input placeholder="Search events.." 
                      leftSection={<Search/>}
                      size='md'/>
                
                <Link href={'/signin'}>
                  <Button size='md'>Sign In</Button>
                </Link>

              </Flex>

            </Flex>
    )
}