import React from 'react'
import { Box } from "@admin-bro/design-system"
import { BasePropertyProps } from 'admin-bro'

const Edit: React.FC<BasePropertyProps> = (props) => {
    const { record } = props
    console.log(record);
    const srcImg = record.params['profilePhotoLocation']
    return (
		<Box>
		    {srcImg ? (
                <img src={srcImg} width="300px"/>
            ) : 'Sem foto'}
		</Box>
	);
}

export default Edit
