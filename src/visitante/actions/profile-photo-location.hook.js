/** copiado do youtube como ponto de partida  para seguir o exemplo*/
const argon2 = require("argon2");
const AdminBro = require("admin-bro");
const { default: AdminBro, default: AdminBro } = require("admin-bro");

/** @type {AdminBro.After<AdminBro.ActionResponse>} */
const after = async (response) => {
    if (response.record && response.record.errors){
        response.record.errors.password = response.record.errors.encryptedPassword
    }
    return response
}

/** @type {AdminBro.Before} */
const before = async (request) =>{
    if (request.method === 'post'){
        const {password, ...otherParams} = request.payload;
        if (password){
            const encryptedPassword = await argon2.hash(password);

            return {
                ...request,
                payload:{
                    ...otherParams,
                    encryptedPassword,
                },
            };
        }
    }
}