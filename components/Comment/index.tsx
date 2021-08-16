import { Comment, Tooltip, List } from 'antd';
import { forEach } from 'lodash';
import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';


export default function CommentList(props: any) {

    useEffect(() => {
    })

    return (
        <>
            <List
                className="comment-list"
                header={`${props.comments.length} comments`}
                itemLayout="horizontal"
                dataSource={props.comments}
                renderItem={(item: any) => (
                    <li>
                        <Comment
                            actions={item.actions}
                            author={item.author}
                            avatar={item.avatar}
                            content={item.content}
                            datetime={item.datetime}
                        />
                    </li>
                )}
            />
        </>
    )
}