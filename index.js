const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const moment = require('moment')

AdminBro.registerAdapter(AdminBroMongoose)

const run = async () => {
    await mongoose.connect('mongodb://localhost:27017/test?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}
run()

const Usuario = mongoose.model('Usuario', {
    nome: { type: String, required: true },
    senha: { type: String, required: true },
    email: { type: String, required: true },
    acesso: { type: String, enum: ['Admin', 'Porteiro'], required: true },
})

const podeEditarUsuarios = ({ currentAdmin }) => currentAdmin && currentAdmin.acesso === 'Admin'

let DataAtual = new Date()

const visitante = mongoose.model('Visitante', {
    nome: {
        type: String,
        required: true
    },
    Documento: {
        type: String,
        required: true
    },
    profilePhotoLocation: {
        type: String,
    }
})

const visita = mongoose.model('Visita', {
    visitante: { 
        type: mongoose.ObjectId,
        ref: 'Visitante' },
    casa: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        required: true,
        default: DataAtual
    }
})

const {
    after : uploadAfterHook,
    before : uploadBeforeHook,
} = require('./src/visitante/actions/upload-image.hook');

const { 
	after: webcamAfterHook, 
	before: webcamBeforeHook,
} = require("./src/visitante/actions/webcam.hook");

const adminBro = new AdminBro({
	databases: [],
	rootPath: "/admin",
	resources: [
		{
			resource: Usuario,
			options: {
				parent: "Configurações",
				properties: {
					senha: {
						type: "password",
						isVisible: {
							list: false,
							edit: true,
							filter: false,
							show: false,
							new: true,
						},
					},
					id: {
						isVisible: { list: false, filter: false, show: false, edit: false },
					},
				},
				actions: {
					edit: { isAccessible: podeEditarUsuarios },
					delete: { isAccessible: podeEditarUsuarios },
					new: { isAccessible: podeEditarUsuarios },
					show: { isAccessible: podeEditarUsuarios },
					list: { isAccessible: podeEditarUsuarios },
				},
			},
		},
		{
			resource: visitante,
			options: {
				parent: "Menu",
				properties: {
					// foto: {
					//     // type: 'richtext',
					//     isVisible: { list: true, filter: false, show: true, edit: true },
					//     dashboard:{
					//         edit: AdminBro.bundle('./foto.jsx')
					//     }
					// },
					data: {
						isVisible: { list: false, filter: false, show: true, edit: false },
					},
					id: {
						isVisible: { list: false, filter: false, show: false, edit: false },
					},
					//deixa visivel por eqto 202110111805
					// profilePhotoLocation:{
					//     isVisible: false,
					// },
					uploadImage: {
						components: {
							edit: AdminBro.bundle("./src/visitante/components/upload-image.edit.tsx"),
							list: AdminBro.bundle("./src/visitante/components/upload-image.list.tsx"),
						},
					},
					webcam: {
						isVisible: { list: false, filter: false, show: true, edit: true },
						components:{
							edit: AdminBro.bundle('./src/visitante/components/webcam.edit.jsx'),
						},
					},
				},
				actions: {
					new: {
						after: async (response, request, context) => {
							const newRes = await webcamAfterHook(response, request, context);
							return uploadAfterHook(newRes, request, context);
						},
						before: async (request, context) => {
							const newReq = await webcamBeforeHook(request, context);
							return uploadBeforeHook(newReq, context);
						},
					},
					edit: {
						after: async (response, request, context) => {
							return uploadAfterHook(response, request, context);
						},
						before: async (request, context) => {
							return uploadBeforeHook(request, context);
						},
						isAccessible: true, //podeEditarUsuarios
					},
					show: {
						isVisible: false,
					},
					delete: {
						isAccessible: podeEditarUsuarios,
					},
					// new: { isAccessible: podeEditarUsuarios },
					// show: { isAccessible: podeEditarUsuarios },
					// list: { isAccessible: podeEditarUsuarios },
				},
			},
		},
		{
			resource: visita,
			options: {
				parent: "Menu",
				properties: {
					data: {
						isVisible: { list: true, filter: false, show: true, edit: false },
					},
					id: {
						isVisible: { list: false, filter: false, show: false, edit: false },
					},
				},
				actions: {
					edit: { isAccessible: podeEditarUsuarios },
					delete: { isAccessible: podeEditarUsuarios },
					// new: { isAccessible: podeEditarUsuarios },
					// show: { isAccessible: podeEditarUsuarios },
					// list: { isAccessible: podeEditarUsuarios },
				},
			},
		},
	],
	dashboard: {
		component: AdminBro.bundle("./home"),
	},
	branding: {
		companyName: "Controle de Acesso",
		logo: "",
		softwareBrothers: false,
	},
	locale: {
		translations: {
			actions: {
				new: "Cadastrar",
				edit: "Editar",
				show: "Mostrar",
				delete: "Deletar",
				bulkDelete: "Deletar tudo",
				list: "Cadastros",
			},
			buttons: {
				save: "Salvar",
				addNewItem: "Adicionar Novo Item",
				filter: "Buscar",
				applyChanges: "Aplicar Mudanças",
				resetFilter: "Limpar Filtros",
				confirmRemovalMany: "Confirmar a remoção de {{count}} registro(s)",
				confirmRemovalMany_plural: "Confirmar a remoção de {{count}} registros",
				logout: "Sair",
				login: "Entrar",
				seeTheDocumentation: "Ver: <1>a documentação</1>",
				createFirstRecord: "Criar primeiro registro",
			},
			labels: {
				navigation: "",
				Logout: "Sair",
				Login: "Entrar",
				pages: "Páginas",
				selectedRecords: "Selecionados ({{selected}})",
				filters: "Buscar",
				adminVersion: "Admin: {{version}}",
				appVersion: "App: {{version}}",
				loginWelcome: "Bem vindo",
				Product: "Produtos",
				myFirstDatabase: "Configurações",
			},
			messages: {
				successfullyBulkDeleted: "removido(s) {{count}} registro(s)",
				successfullyBulkDeleted_plural: "removidos {{count}} registros",
				successfullyDeleted: "Registro deletado",
				successfullyUpdated: "Registro atualizado",
				thereWereValidationErrors: "Erros de validação, cheque-os abaixo",
				forbiddenError: "Você não pode executar a ação {{actionName}} em {{resourceId}}",
				anyForbiddenError: "Você não pode executar esta ação",
				successfullyCreated: "Criado novo registro",
				bulkDeleteError: "Houve um erro deletando registros, cheque o console para saber mais.",
				errorFetchingRecords: "Houve um erro buscando registros, cheque o console para saber mais.",
				errorFetchingRecord: "Houve um erro buscando record, cheque o console para saber mais.",
				noRecordsSelected: "Você não selecionou nenhum dos registros",
				theseRecordsWillBeRemoved: "O(s) seguinte(s) registro(s) vai(ão) ser deletado(s)",
				theseRecordsWillBeRemoved_plural: "Os seguintes registros vão ser deletados",
				pickSomeFirstToRemove: "Para deletar registros, você precisa selecionar primeiro",
				error404Resource: "Recurso de id: {{resourceId}} não encontrado",
				error404Action: "Recurso de id: {{resourceId}} não tem nenhuma ação nomeada de: {{actionName}}",
				error404Record: "Recurso de id: {{resourceId}} não tem nenhum registro com o ID: {{recordId}}",
				seeConsoleForMore: "Veja o console de desenvolvimento para mais detalhes...",
				noActionComponent: "Você deve implementar o componente de ação para a sua Ação",
				noRecordsInResource: "",
				noRecords: "",
				confirmDelete: "Tem certeza de que deseja remover este item?",
				welcomeOnBoard_title: "Bem-vindo a bordo!",
				welcomeOnBoard_subtitle: "Agora você é um de nós! Preparamos algumas dicas para você começar:",
				loginWelcome: "",
				addingResources_title: "Adicionando recursos",
				addingResources_subtitle: "Como adicionar novos recursos à barra lateral",
				customizeResources_title: "Recursos Personalizados",
				customizeResources_subtitle: "Definindo comportamento, adicionando propriedades e mais ...",
				customizeActions_title: "Personalizar Ações",
				customizeActions_subtitle: "Modificando ações existentes e adicionando novas",
				writeOwnComponents_title: "Escreva os Componentes",
				writeOwnComponents_subtitle: "Como modificar a aparência do AdminBro",
				customDashboard_title: "Painel Personalizado",
				customDashboard_subtitle: "Como modificar esta visualização e adicionar novas páginas na barra lateral",
				roleBasedAccess_title: "Controle de acesso baseado em função",
				roleBasedAccess_subtitle: "Crie funções de usuário e permissões no AdminBro",
				community_title: "Junte-se à comunidade slack",
				community_subtitle: "Fale com os criadores do AdminBro e outros usuários AdminBro",
				foundBug_title: "Encontrou um bug? precisa de melhorias?",
				foundBug_subtitle: "Levantar um problema em nosso repositório GitHub",
				needMoreSolutions_title: "Precisa de soluções mais avançadas?",
				needMoreSolutions_subtitle:
					"Estamos aqui para fornecer a você um belo design de UX/UI e um software feito sob medida com base (não apenas) no AdminBro",
				invalidCredentials: "Email e/ou password errados",
			},
		},
	},
});

const router = AdminBroExpress.buildRouter(adminBro)
// const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
//     authenticate: async (email, senha) => {
//       const user = await Usuario.findOne({ email })
//       if (user) {
//         const matched = await user.senha
//         if (matched) {
//           return user
//         }
//       }
//       return false
//     },
//     cookiePassword: 'some-secret-password-used-to-secure-cookie',
//   })

app.use(adminBro.options.rootPath, router)

app.use('/uploads', express.static('uploads'));

app.listen(8080, () => console.log('AdminBro is under http://localhost:8080/admin since [%s]', moment().format("YYYY-MM-DDTHH:mm:ssZZ")))