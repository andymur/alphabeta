'use client'
import { Form, Input, Button } from 'antd'

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
      })

      const data = await response.json()

      if (response.ok) {
        // Handle successful response
        console.log('Login successful:', data)
        alert('Login successful!')
      } else {
        // Handle errors from the API
        console.error('Login failed:', data)
        alert(`Error: ${data.message}`)
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error('An unexpected error occurred:', error)
      alert('An unexpected error occurred. Please try again later.')
    }
  }

  return (
    <Form layout="vertical" onFinish={handleFormSubmit}>
      <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password placeholder="Enter your password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
