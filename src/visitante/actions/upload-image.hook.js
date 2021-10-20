/** copiado do youtube como ponto de partida  para seguir o exemplo*/
const path = require("path");
const fs = require("fs");
const AdminBro = require("admin-bro");

/** @type {AdminBro.After<AdminBro.ActionResponse>} */
const after = async (response, request, context) => {
    const {record, foto} = context

    if (record.isValid() && foto){
        const filePath = path.join('uploads', record.id().toString(), foto.name);
        await fs.promises.mkdir(path.dirname(filePath), {recursive: true});

        await fs.promises.rename(foto.path, filePath);

        await record.update({ profilePhotoLocation: `/${filePath}` });
    }
    return response;
}

/** @type {AdminBro.Before} */
const before = async (request, context) =>{
    if (request.method === 'post'){
        const {foto, ...otherParams} = request.payload;

        context.foto = foto;
        
        return {
            ...request,
            payload: otherParams,
        };
    }
    return request;
}

module.exports = { after, before };