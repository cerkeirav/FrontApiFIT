package med.voll.api.domain.medico;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import med.voll.api.domain.endereco.Endereco;

@Table(name = "medicos")
@Entity(name = "Medicos")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Medico {

	public Medico(DadosCadastroMedicos dados) {
		this.crm = dados.crm();
		this.nome = dados.nome();
		this.email = dados.email();
		this.telefone = dados.telefone();
		this.especialidade = dados.especialidade();
		this.endereco = new Endereco(dados.endereco());
		this.ativo = true;

	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private String email;
	private String crm;
	private String telefone;

	@Enumerated(EnumType.STRING)
	private Especialidade especialidade;

	@Embedded
	private Endereco endereco;

	private boolean ativo;

	public void atualizarInformacoes(@Valid DadosAtualizacaoMedicos dados) {
	    if (dados.nome() != null && !dados.nome().isEmpty()) {
	        this.nome = dados.nome();
	    }
	    if (dados.telefone() != null && !dados.telefone().isEmpty()) {
	        this.telefone = dados.telefone();
	    }
	    if (dados.endereco() != null) {
	        if (dados.endereco().logradouro() != null && !dados.endereco().logradouro().isEmpty()) {
	            this.endereco.atualizarInformacao(dados.endereco());
	        }
	        if (dados.endereco().bairro() != null && !dados.endereco().bairro().isEmpty()) {
	            this.endereco.atualizarInformacao(dados.endereco());
	        }
	        if (dados.endereco().cep() != null && !dados.endereco().cep().isEmpty()) {
	            this.endereco.atualizarInformacao(dados.endereco());
	        }
	        if (dados.endereco().cidade() != null && !dados.endereco().cidade().isEmpty()) {
	            this.endereco.atualizarInformacao(dados.endereco());
	        }
	        if (dados.endereco().uf() != null && !dados.endereco().uf().isEmpty()) {
	            this.endereco.atualizarInformacao(dados.endereco());
	        }
	        if (dados.endereco().complemento() != null && !dados.endereco().complemento().isEmpty()) {
	            this.endereco.atualizarInformacao(dados.endereco());
	        }
	        if (dados.endereco().numero() != null && !dados.endereco().numero().isEmpty()) {
	            this.endereco.atualizarInformacao(dados.endereco());
	        }
	    }
	}


	public void excluir() {
		this.ativo = false;

	}
}
