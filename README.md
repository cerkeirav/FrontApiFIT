# Diagrama de classes

```mermaid 
classDiagram
    class MedicoController {
        +cadastrar(dados: DadosCadastroMedicos, uriBuilder: UriComponentsBuilder): ResponseEntity
        +listar(paginacao: Pageable): ResponseEntity<Page<DadosListagemMedico>>
        +atualizar(dados: DadosAtualizacaoMedicos): ResponseEntity
        +excluir(id: Long): ResponseEntity
        +consultar(dados: DadosConsulta): ResponseEntity<DadosDetalhamentoMedico>
    }

    class DadosCadastroMedicos {
        -nome: String
        -email: String
        -telefone: String
        -crm: String
        -especialidade: Especialidade
        -endereco: DadosEndereco
    }

    class DadosAtualizacaoMedicos {
        -id: Long
        -nome: String
        -telefone: String
        -endereco: DadosEndereco
    }

    class DadosConsulta {
        -id: Long
    }

    class DadosDetalhamentoMedico {
        -id: Long
        -nome: String
        -telefone: String
        -email: String
        -crm: String
        -especialidade: Especialidade
        -endereco: Endereco
    }

    class DadosListagemMedico {
        -id: Long
        -nome: String
        -email: String
        -crm: String
        -especialidade: Especialidade
    }

    class Especialidade {
        ORTOPEDIA
        CARDIOLOGIA
        GINECOLOGIA
        DERMATOLOGIA
    }

    class Medico {
        -id: Long
        -nome: String
        -email: String
        -crm: String
        -telefone: String
        -especialidade: Especialidade
        -endereco: Endereco
        -ativo: boolean
    }

    class Endereco {
        -logradouro: String
        -bairro: String
        -cep: String
        -cidade: String
        -uf: String
        -complemento: String
        -numero: String
    }

    class DadosEndereco {
        -logradouro: String
        -bairro: String
        -cep: String
        -cidade: String
        -uf: String
        -complemento: String
        -numero: String
    }

    MedicoController "1" --> "N" DadosCadastroMedicos
    MedicoController "1" --> "1" DadosAtualizacaoMedicos
    MedicoController "1" --> "1" DadosConsulta

    DadosCadastroMedicos "1" --> "1" Especialidade
    DadosCadastroMedicos "1" --> "1" DadosEndereco
    DadosAtualizacaoMedicos "1" --> "1" DadosEndereco
    DadosConsulta "1" --> "1" DadosDetalhamentoMedico
    DadosDetalhamentoMedico "1" --> "1" Endereco
    DadosListagemMedico "1" --> "1" Medico
    Medico "1" --> "1" Endereco
