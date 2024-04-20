document.addEventListener("DOMContentLoaded", function() {
    var consultarForm = document.getElementById("consultar-form");
    if (consultarForm) {
        consultarForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Evita o envio padrão do formulário
            
            // Obtém o valor do ID digitado pelo usuário
            var id = document.getElementById("id").value;
      
            // Recupera o token do localStorage
            var token = localStorage.getItem("tokenJWT");
            if (!token) {
                alert("Token JWT não encontrado no armazenamento local.");
                return; // Sai da função se o token não estiver presente
            }

            // Define as configurações da solicitação, incluindo o token no cabeçalho de autorização
            var requestOptions = {
                method: "POST", // Mantém como POST  
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token // Passa o token no cabeçalho de autorização
                },
                body: JSON.stringify({ id: id })
            };

            // Faça a solicitação POST para a API protegida
            fetch('http://localhost:8080/medicos/consultar', requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao fazer a solicitação.');
                    }
                    return response.json();
                })
                .then(data => {
                    // Manipula os dados recebidos da API
                    if(data === null){
                        alert("O id fornecido não está cadastrado");
                    }
                    
                    // Exibe as informações retornadas em um pop-up na tela
                    alert('Informações do médico:\nNome: ' + data.nome + '\nTelefone: ' + data.telefone + '\nE-mail: ' + data.email + '\nCRM: ' + data.crm + '\nEscpecialidade: ' + data.especialidade);
                    
                })
                .catch(error => {
                    if (error instanceof TypeError) {
                        // Tratamento para erros de tipo de conteúdo (por exemplo, JSON inválido)
                        alert('Erro ao processar a resposta da API. Por favor, tente novamente.');
                    } else if (error.message === '404 Not Found') {
                        // Tratamento para erros de solicitação (por exemplo, status de resposta não ok)
                        if (error.response === 'undefined') {
                            alert('O ID do médico não existe. Por favor, verifique o ID e tente novamente.');
                        } else {
                            alert('Erro ao fazer a solicitação à API. Por favor, tente novamente.');
                        }
                    } else {
                        // Outros tipos de erros não previstos
                        alert('Erro inesperado ao consultar o médico. Por favor, tente novamente mais tarde.');
                    }
                });
        });
    }
});


