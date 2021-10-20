import React from 'react'
import { Box } from "@admin-bro/design-system"
import { BasePropertyProps } from 'admin-bro'
import { FormGroup, FormGroupProps, InputGroup, FormMessage, Button, Icon, Input, Label } from '@admin-bro/design-system'


const Edit: React.FC<BasePropertyProps> = (props) => {
    const { record } = props

    const srcImg = record.params['nome']
    return (
        <Box>
            <FormGroup>
                <Label required>Nome</Label>
                <InputGroup>
                    <Input value={srcImg}/>
                    <Label>Visitante</Label>
                    <Button variant="primary" size="icon">
                        <Icon icon="Search" />
                    </Button>
                </InputGroup>
            </FormGroup>
        </Box>
    );
}

export default Edit
