/** copiado do youtube como ponto de partida  para seguir o exemplo*/
const path = require("path");
const fs = require("fs");
const AdminBro = require("admin-bro");

/** @type {AdminBro.After<AdminBro.ActionResponse>} */
const after = async (response, request, context) => {
    const {record, image} = context

    //if (record.isValid() && image) {
		console.log("webcam.hook.after - ini", new Date().toISOString());
        console.log("record",record);
		console.log("image",image);
		console.log("webcam.hook.after - fim", new Date().toISOString());
		// const filePath = path.join("uploads", record.id().toString(), uploadImage.name);
		// await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
		// await fs.promises.rename(uploadImage.path, filePath);
		// await record.update({ profilePhotoLocation: `/${filePath}` });
	//}
    return response;
}

/** @type {AdminBro.Before} */
const before = async (request, context) =>{
    if (request.method === 'post'){
        const {uploadImage, ...otherParams} = request.payload;

            const {record, image} = context

    //if (record.isValid() && image) {
        console.log("webcam.hook.before - ini", new Date().toISOString());
        console.log("record",record);
		console.log("image", image);
        console.log("uploadImage", uploadImage);
        if (uploadImage){
			console.log("uploadImage.length", uploadImage.length);
		}
        console.log("webcam.hook.before - fim", new Date().toISOString());
    //}

        // context.uploadImage = uploadImage;
        
        return {
            ...request,
            payload: otherParams,
        };
    }
    return request;
}

module.exports = { after, before };