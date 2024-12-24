import Form from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

export default function UserAuthForm() {
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
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit">Submit</Button>
            </FormItem>
        </Form>
    );
}