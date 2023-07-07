import React, { ReactNode } from 'react'
import { Tag } from 'antd'
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

interface TagProps {
    label :ReactNode
    onClose: () => void
    closable :boolean
}

const Tags = ({ label, onClose , closable }:TagProps) => {

    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };


    return (
        <Tag
            color='cyan'
            onMouseDown={onPreventMouseDown}
            onClose={onClose}
            closable={closable}
            style={{ marginRight: 3 }}
        >
            {label}
        </Tag>
    )
}

export default Tags