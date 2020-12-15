import PropTypes from 'prop-types';
import logo from "../assets/images/logo.svg";
import {Button, Card, Space, Typography} from "antd";
import {EditOutlined} from "@ant-design/icons";
import Review from "./Review";
import {useState} from "react";

const MovieCard = (props) => {
    const [showForm, toggleForm] = useState(false)
    const {data} = props;

    return (
        <Space direction='vertical'>
            <Card
                title={data.title}
                cover={<img alt="example" src={logo}/>}
                extra={
                    <Button type='primary' icon={<EditOutlined/>} onClick={() => toggleForm(!showForm)}>
                        Write a review
                    </Button>
                }
            >
                <Typography.Paragraph>
                    {data.opening_crawl}
                </Typography.Paragraph>
            </Card>
            {showForm && <Review/>}
        </Space>
    )
}

MovieCard.propTypes = {
    data: PropTypes.object.isRequired
}

export default MovieCard