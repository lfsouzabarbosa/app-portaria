import React from 'react'
import { BasePropertyProps } from 'admin-bro'
import { Box, Label, DropZone, DropZoneProps, DropZoneItem } from "@admin-bro/design-system";
//https://github.com/SoftwareBrothers/adminjs/issues/462
// in admin-bro v3 DropZone, FormGroup, Label, DropZoneItem will have to be
// taken from @admin-bro/design-system

const Edit: React.FC<BasePropertyProps> = (props) => {
    const { property, onChange, record } = props
    const handleDropZoneChange: DropZoneProps['onChange'] = (files) => {
        onChange(property.name, files[0])
    }

    const uploadedPhoto = record.params.profilePhotoLocation
    const photoToUpload = record.params[property.name];
    console.log("uploadedPhoto", uploadedPhoto);
	console.log("photoToUpload", photoToUpload);
    
    return (
		<Box marginBottom="xxl">
		    <Label>{property.label}</Label>
            <DropZone onChange={handleDropZoneChange} />
            {uploadedPhoto && !photoToUpload && (
                <DropZoneItem src={uploadedPhoto} />
            )}
		</Box>
	);
}

export default Edit
