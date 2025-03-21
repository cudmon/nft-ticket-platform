"use client";
import { useState } from 'react';
import { TextInput, PasswordInput, Container, Title, Group, Button, Fieldset, Text } from '@mantine/core';
import { Mail, Lock, User } from 'lucide-react';

interface Form {
    name: string;
    email: string;
    password: string;
}

export default function page() {
    const [formData, setFormData] = useState<Form>({
        name: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <Container size={600} my={60}>
            <Fieldset>
                <Title order={1} ta='center' mt='md' mb='md'>Register</Title>
                <form onSubmit={handleSubmit}>
                    <TextInput 
                        name='name'
                        label='Name' 
                        placeholder='Name'
                        value={formData.name}
                        onChange={handleInputChange}
                        leftSection={<User/>}
                        withAsterisk
                    />
                    <TextInput 
                        name='email'
                        label='Email' 
                        placeholder='user@example.com'
                        value={formData.email}
                        onChange={handleInputChange}
                        leftSection={<Mail/>}
                        withAsterisk
                        mt='md'
                    />
                    <PasswordInput 
                        name='password'
                        label='Password' 
                        placeholder='Your password'
                        value={formData.password}
                        onChange={handleInputChange}
                        leftSection={<Lock/>}
                        withAsterisk
                        mt='md'
                    />
                    <Group align='center' mt='lg'>
                        <Button type='submit' variant='filled' fullWidth>Register</Button>
                    </Group>
                </form>
                <Text ta='center' mt='md' size='sm' c='blue'>
                    Already have an account? <a href='/login'> Sign in →</a>
                </Text>
            </Fieldset>
        </Container>
    )
}