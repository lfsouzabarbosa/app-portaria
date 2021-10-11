import React from 'react'
// import Box from "@admin-bro/design-system/src/atoms/box/box"
// import Label from "@admin-bro/design-system/src/atoms/label"
// import DropZone from "@admin-bro/design-system/src/molecules/drop-zone/drop-zone"
// import { Box  } from "@admin-bro/design-system"
// import { Label } from "@admin-bro/design-system"
// import { DropZone } from "@admin-bro/design-system"
import { Box ,Label , DropZone } from "@admin-bro/design-system";
import { BasePropertyProps } from 'admin-bro'
import { DropZoneProps } from '@admin-bro/design-system'

const Edit: React.FC<BasePropertyProps> = (props) => {
    const {property, onChange} = props
    const handleDropZoneChange: DropZoneProps['onChange'] = (files) => {
        onChange(property.name, files[0])
    }
    return (
		<Box>
		    <Label>{property.label}</Label>
            <DropZone onChange={handleDropZoneChange} />
		</Box>
	);
}

export default Edit
