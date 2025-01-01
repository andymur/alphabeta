import Form from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import InputPassword from 'antd/lib/input/Password';


export default function UserAuthForm() {
    const handleFormSubmit = async (values: { username: string; password: string }) => {
        try {
            // Make the API call to the backend
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values), // Send form data
            });

            const data = await response.json();

            if (response.ok) {
                // Handle successful response
                console.log('Login successful:', data);
                alert('Login successful!');
            } else {
                // Handle errors from the API
                console.error('Login failed:', data);
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            // Handle network or unexpected errors
            console.error('An unexpected error occurred:', error);
            alert('An unexpected error occurred. Please try again later.');
        }
    }

    return (
        <Form
            layout="vertical">
            <FormItem
                label="Username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </FormItem>
            <FormItem
                label="Password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <InputPassword placeholder="Enter your password" />
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit" onSubmit={console.log('abc')}>Submit</Button>
            </FormItem>
        </Form>
    );
}