package med.voll.api.domain.endereco;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Endereco {
	public Endereco(DadosEndereco dados) {
		this.uf = dados.uf();
		this.cep = dados.cep();
		this.bairro = dados.bairro();
		this.cidade = dados.cidade();
		this.numero = dados.numero();
		this.logradouro = dados.logradouro();
	}
	
	private String uf;
	private String cep;
	private String numero;
	private String cidade;
	private String bairro;
	private String logradouro;
	private String complemento;
	
	public void atualizarInformacao(DadosEndereco dados) {
		if(dados.uf() != null) {
			this.uf = dados.uf();
		}
		
		if(dados.cep() != null) {
			this.cep = dados.cep();
		}
		
		if(dados.numero() != null) {
			this.numero = dados.numero();
		}
		
		if(dados.cidade() != null) {
			this.cidade = dados.cidade();
		}
		
		if(dados.bairro() != null) {
			this.bairro = dados.bairro();
		}
		
		if(dados.complemento() != null) {
			this.complemento = dados.complemento();
		}
		
		if(dados.logradouro() != null) {
			this.logradouro = dados.logradouro();
		}
		
	}
	
}
