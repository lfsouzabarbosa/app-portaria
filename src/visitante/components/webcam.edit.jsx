import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import Webcam from "react-webcam";
import { Box } from '@admin-bro/design-system'
import { Button } from '@admin-bro/design-system'

const Component = () => {
    const camera = useRef(null);
    const [numberOfCameras, setNumberOfCameras] = useState(0);
    const [image, setImage] = useState(null);
    console.log(image);
    console.log(new Date().toISOString());

    return (
        <Box flex flexDirection="column" variant="white" alignItems="center">
                <Camera ref={camera} />
                <Webcam
                        audio={false}
                        height={300}
                        ref={camera}
                        width={200}
                    />
                <Button onClick={() => setImage(camera.current.takePhoto())}>Tirar foto</Button>
                <img src={image} alt='' height={200} width={200} />
        </Box>
    );
}

export default Component;