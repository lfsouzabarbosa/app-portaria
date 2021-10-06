import React from "react";
import Webcam from "react-webcam";
import { Box } from '@admin-bro/design-system'
import { Button } from '@admin-bro/design-system'

const foto = () => {

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };
    let webcamRef = React.useRef();
    const WebcamCapture = () => {
        
        const imageSrc = webcamRef.current.getScreenshot();
        [webcamRef]
        console.log(imageSrc);
        
    }
        return (

            <Box flex flexDirection="column" variant="white" alignItems="center">
                <>
                    <Webcam
                        audio={false}
                        height={300}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={800}
                        videoConstraints={videoConstraints}
                    />
                    <Button onClick={() => WebcamCapture}>Tirar foto</Button>
                </>
            </Box>
        )

}
export default foto