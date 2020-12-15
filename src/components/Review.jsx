import {useForm} from "antd/es/form/Form";
import {Button, Card, Form, Input, Space, Typography} from "antd";
import {useState} from "react";
import {LoadingOutlined} from "@ant-design/icons";

const {Text, Title} = Typography;

const Review = () => {
    const [sending, setSending] = useState(false)
    const [sent, toggleSent] = useState(false);
    const [result, setResult] = useState({})

    const [form] = useForm()

    const handleSubmit = () => {
        setResult(form.getFieldsValue())
        setSending(true)
        const progress = new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })
        progress.then(() => {
            toggleSent(true)
            setSending(false)
        })

    }

    return (
        <Card title='Review'>
            {!sent
                ? <Form form={form} layout={'vertical'} onFinish={handleSubmit}>
                    <Form.Item
                        label='Username'
                        name='username'
                        rules={[
                            {required: true, message: 'Required field!'}
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='E-mail'
                        name='email'
                        rules={[
                            {type: 'email', message: 'The input is not valid E-mail!'},
                            {required: true, message: 'Required field!'}
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label='Review'
                        name='review'
                        rules={[
                            {required: true, message: 'Required field!'}
                        ]}
                    >
                        <Input.TextArea rows={6}/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" disabled={sending} icon={sending && <LoadingOutlined/>}>
                        Submit a review
                    </Button>
                </Form>
                : <>
                    <Title level={4}>You sent a review!</Title>
                    <Space direction="vertical">
                        <Text strong>
                            Username:
                        </Text>
                        <Text>
                            {result.username}
                        </Text>
                        <Text strong>
                            E-mail:
                        </Text>
                        <Text>
                            {result.email}
                        </Text>
                        <Text strong>
                            Review:
                        </Text>
                        <Text>
                            {result.review}
                        </Text>
                    </Space>
                </>
            }
        </Card>
    )
}

export default Review