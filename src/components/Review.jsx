import { useForm } from 'antd/es/form/Form';
import { Button, Card, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import Result from './Result';
import { sendReview } from '../api/movies';

const Review = (props) => {
	const { close } = props;
	const [sending, setSending] = useState(false);

	const [form] = useForm();

	const handleSubmit = () => {
		setSending(true);
		sendReview().then(() => {
			setSending(false);
			Modal.success({
				title: 'You sent a review!',
				content: <Result result={ form.getFieldsValue() }/>,
				onOk: close
			});
		})
	};

	return (
		<Card title='Review'>
			<Form form={ form } layout={ 'vertical' } onFinish={ handleSubmit }>
				<Form.Item
					label='Username'
					name='username'
					rules={ [
						{ required: true, message: 'Required field!' }
					] }
				>
					<Input/>
				</Form.Item>
				<Form.Item
					label='E-mail'
					name='email'
					rules={ [
						{ type: 'email', message: 'The input is not valid E-mail!' },
						{ required: true, message: 'Required field!' }
					] }
				>
					<Input/>
				</Form.Item>
				<Form.Item
					label='Review'
					name='review'
					rules={ [
						{ required: true, message: 'Required field!' }
					] }
				>
					<Input.TextArea rows={ 6 }/>
				</Form.Item>
				<Button type='primary' htmlType='submit' disabled={ sending }
						icon={ sending && <LoadingOutlined/> }>
					Submit a review
				</Button>
			</Form>
		</Card>
	);
};

export default Review;