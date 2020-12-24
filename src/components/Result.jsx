import React from 'react';
import { Space, Typography } from 'antd';

const { Text } = Typography;

const Result = (props) => {
	const {result} = props;

	return (
		<Space direction='vertical'>
			<Text strong>
				Username:
			</Text>
			<Text>
				{ result.username }
			</Text>
			<Text strong>
				E-mail:
			</Text>
			<Text>
				{ result.email }
			</Text>
			<Text strong>
				Review:
			</Text>
			<Text>
				{ result.review }
			</Text>
		</Space>
	);
};

export default Result;