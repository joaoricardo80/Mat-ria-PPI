// Importando módulos necessários
import express from 'express'; // Importa o framework Express
import autenticar from './seguranca/autenticar.js'; // Importa a função de autenticação
import { verificarAutenticacao, sair } from './seguranca/autenticar.js'; // Importa outras funções de autenticação
import session from 'express-session'; // Importa o middleware de gerenciamento de sessões

// Configuração do servidor
const host = '0.0.0.0'; // Define o host do servidor
const porta = 5000; // Define a porta do servidor
const app = express(); // Cria uma instância do aplicativo Express

// Configuração de middlewares
app.use(express.urlencoded({ extended: true })); // Middleware para processar dados de formulário enviados via POST
app.use(session({
    secret: 'segredo', // Chave usada para criptografar a sessão
    resave: true, // Salva a sessão novamente no servidor, mesmo que não tenha sido modificada
    saveUninitialized: true, // Salva sessões novas, mesmo que estejam vazias
    cookie: {  
        maxAge: 1000 * 60 * 15 // Define o tempo de expiração do cookie de sessão (15 minutos)
    }
}));

// Serve arquivos estáticos da pasta 'publico'
app.use(express.static('./publico'));

// Rota para a página de login
app.get('/login', (requisicao, resposta) => {
    resposta.redirect('login.html'); // Redireciona para a página de login
});

// Rota para logout
app.get('/logout', sair); // Usa a função sair para efetuar o logout

// Rota para autenticação de login
app.post('/login', autenticar); // Verifica as credenciais do usuário


// Middleware para verificar a autenticação
app.use(verificarAutenticacao, express.static('./privado')); // Verifica se o usuário está autenticado antes de acessar arquivos na pasta 'privado'

// Inicializa o servidor
app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`); // Loga uma mensagem quando o servidor está rodando
});

