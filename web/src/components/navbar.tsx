import { Flex, Input, Button } from "@mantine/core";
import { Search, ShoppingCart } from "lucide-react";

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
              <h1>TicketHub</h1>
              
              <Flex justify='space-between'
                    align={'center'}
                    gap={'md'}
                    >

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
    )
}