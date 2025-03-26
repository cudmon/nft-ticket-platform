import { Button, Card, Flex, Text, PasswordInput, TextInput } from '@mantine/core';
import { Key, Lock, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
      <Flex align='center'
            justify='center'
            h='100vh'>
        <Card shadow='md' w='20rem'>
          <Flex direction='column'
                gap='md'
                >
            <Text size='xl' fw={'bold'}>Login</Text>
            <TextInput label="Email" 
                       placeholder="Enter your email..." 
                       leftSection={<Mail size={'18px'}/>}
                       withAsterisk/>
            <PasswordInput label="Password" 
                           placeholder="Enter your password..." 
                           leftSection={<Lock size={'18px'}/>}
                           withAsterisk/>
            <Button>Sign in</Button>
            <Text ta='center' size='sm' c='blue'>Don't have an account? <Link href={'/register'}>Sign Up</Link></Text>
          </Flex>
        </Card>
      </Flex>
  );
}
