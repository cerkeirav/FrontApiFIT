document.addEventListener("DOMContentLoaded", function() {
    var cadastroForm = document.getElementById("cadastrar-form");
    if (cadastroForm) {
        cadastroForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Evita o envio padrão do formulário
            
            // Obtém os valores dos campos do formulário
            var nome = document.getElementById("nome").value;
            var crm = document.getElementById("crm").value;
            var telefone = document.getElementById("telefone").value;
            var email = document.getElementById("email").value;
            var logradouro = document.getElementById("logradouro").value;
            var bairro = document.getElementById("bairro").value;
            var cep = document.getElementById("cep").value;
            var cidade = document.getElementById("cidade").value;
            var uf = document.getElementById("uf").value;
            var complemento = document.getElementById("complemento").value;
            var numero = document.getElementById("numero").value;
            var especialidade = document.getElementById("opcoes").value;

            // Monta o objeto com os dados do médico
            var medicoData = {
                nome: nome,
                crm: crm,
                telefone: telefone,
                email: email,
                endereco: {
                    logradouro: logradouro,
                    bairro: bairro,
                    cep: cep,
                    cidade: cidade,
                    uf: uf,
                    complemento: complemento,
                    numero: numero
                },
                especialidade: especialidade
            };

            // Recupera o token do localStorage
            var token = localStorage.getItem('tokenJWT');
            console.log(token);

            // Define as configurações da solicitação, incluindo o token no cabeçalho de autorização e os dados do médico no corpo
            var requestOptions = {
                method: 'POST', 
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Origin': 'http://192.168.15.153:8081',
                    'Access-Control-Request-Method':'POST'
                },
                body: JSON.stringify(medicoData)
            };

            // Faça a solicitação para a sua API protegida
            fetch('http://localhost:8080/medicos', requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao fazer a solicitação.');
                    }
                    return response.json();
                })
                .then(data => {
                    // Manipula os dados recebidos da API
                    alert('Cadastro de médico realizado com sucesso! \n' + 'Informações do médico:\n\nNome: ' + data.nome + '\nTelefone: ' + data.telefone + '\nE-mail: ' + data.email + '\nCRM: ' + data.crm + '\nEscpecialidade: ' + data.especialidade);
                    
                    
                    window.location.href = "http://192.168.15.153:8081/telaInicial/telaInicial.html";
                })
                .catch(error => {
                    console.error('Erro:', error);
                    // Exibe mensagem de erro para o usuário, se necessário
                    alert('Erro ao cadastrar médico. Por favor, tente novamente.');
                });
        });
    }
});
