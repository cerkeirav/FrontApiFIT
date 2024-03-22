package med.voll.api.domain.medico;

import jakarta.validation.constraints.NotNull;


public record DadosConsulta(
		@NotNull
		Long id) {

}
