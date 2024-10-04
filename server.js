const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

const validDDDs = [61, 62, 64, 65, 66, 67, 71, 73, 74, 75, 77, 82, 85, 88, 98, 99, 83, 81, 87, 86, 89, 84, 79, 68, 96, 92, 97, 91, 93, 94, 69, 95, 63, 27, 28, 31, 32, 33, 34, 35, 37, 38, 21, 22, 24, 11, 12, 13, 14, 15, 16, 17, 18, 19, 41, 42, 43, 44, 45, 46, 51, 53, 54, 55, 47, 48, 49];

function validateDDD(ddd) {
    return validDDDs.includes(Number(ddd));
}

function validateDate(date) {
    return !isNaN(Date.parse(date));
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
    const { nomeAluno, nascimento, nomeMae, nomePai, ddd, telefone, email, serie, turno, atividades } = req.body;

    let errors = [];

    if (!nomeAluno || !nascimento || !nomeMae || !nomePai || !ddd || !telefone || !email || !serie || !turno) {
        errors.push('Todos os campos são obrigatórios.');
    }

    if (!validateDate(nascimento)) {
        errors.push('A data de nascimento não é válida.');
    }

    if (!email.includes('@') || !email.includes('.')) {
        errors.push('O e-mail deve conter "@" e ".".');
    }

    if (!validateDDD(ddd)) {
        errors.push('O DDD informado não é válido.');
    }

    if (atividades && atividades.length > 3) {
        errors.push('Você pode selecionar no máximo 3 atividades extracurriculares.');
    }

    if (errors.length > 0) {
        res.send(`
            <h1>Erro no preenchimento do formulário</h1>
            <ul>${errors.map(error => `<li>${error}</li>`).join('')}</ul>
            <a href="/">Voltar</a>
        `);
    } else {
        res.send(`
            <h1>Cadastro realizado com sucesso!</h1>
            <a href="/">Voltar</a>
        `);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
