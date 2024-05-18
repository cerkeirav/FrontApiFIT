document.addEventListener("DOMContentLoaded", function() {
    var excluirForm = document.getElementById("excluir-form");
    if (excluirForm) {
        excluirForm.addEventListener("submit", function(event) {
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
                method: "POST", // Método POST para exclusão
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token // Passa o token no cabeçalho de autorização
                },
                body: JSON.stringify({ id: id })
            };

            // Faça a solicitação POST para a API protegida
            fetch('http://localhost:8080/medicos/excluir', requestOptions)
                .then(response => {
                    if (response.status === 204) {
                        alert('Médico excluído com sucesso.');
                    } else if (response.status === 403) {
                        alert('O médico já possui status inativo.');
                    } else {
                        throw new Error('Erro ao fazer a solicitação.');
                    }
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
                        alert('Erro inesperado ao excluir o médico. Por favor, tente novamente mais tarde.');
                    }
                });
        });
    }
});
