import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import "./index.less";
import Link from 'next/link';

// interface postType {
//     postId: number,
//     title: string,
//     description: string,
//     email: string,
//     likes: number,
//     dislikes: number
// }

export default function PostList(props: any) {

    const [listData, setListData] = useState([]);

    const IconText = ({ icon, text }: any) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );


    useEffect(() => {
        setListData(props.list);
    });



    return (
        <>


            <List
                className="mb-50"
                itemLayout="vertical"
                size="large"
                dataSource={listData}

                renderItem={(item: any) => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <span onClick={() => { props.onDislike !== undefined ? props.onDislike() : "" }}>
                                <IconText
                                    icon={DislikeOutlined} text={item.likes} key="list-vertical-star-o"
                                />
                            </span>,
                            <span onClick={() => { props.onLike !== undefined ? props.onLike() : "" }}>
                                <IconText
                                    icon={LikeOutlined} text={item.dislikes} key="list-vertical-like-o"
                                />
                            </span>
                        ]}
                    >
                        <List.Item.Meta
                            title={<Link href={`/posts/${item.postId}`}>{item.title}</Link>}
                            description={item.user.email}
                        />
                        {item.description}
                    </List.Item>
                )}
            />
        </>
    )
}