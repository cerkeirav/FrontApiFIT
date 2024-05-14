package med.voll.api.infra.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@Configuration
@EnableWebSecurity
public class SecurityConfigurations {
	
	@Autowired
	private SecurityFilter securityFilter;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	   return http.csrf().disable()
	        .cors().disable() // Desabilita o suporte a CORS
	        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	        .and()
	        .authorizeHttpRequests()
	        .antMatchers(HttpMethod.GET,   "/medicos").permitAll()
	        .antMatchers(HttpMethod.POST,  "/login").permitAll()
	        .antMatchers(HttpMethod.POST,  "/medicos").permitAll()
	        .antMatchers(HttpMethod.POST,   "/consultar").permitAll()
	        .antMatchers(HttpMethod.POST,  "/medicos/cadastrar").permitAll()
	        .antMatchers(HttpMethod.POST,   "/medicos/consultar").permitAll()
	        .antMatchers(HttpMethod.OPTIONS,  "/login").permitAll()
	        .antMatchers(HttpMethod.OPTIONS,  "/medicos").permitAll()
	        .antMatchers(HttpMethod.OPTIONS,  "/consultar").permitAll()
	        .antMatchers(HttpMethod.OPTIONS,  "/medicos/cadastrar").permitAll()
	        .antMatchers(HttpMethod.OPTIONS,  "/medicos/consultar").permitAll()
	        .antMatchers(HttpMethod.OPTIONS,  "/medicos").permitAll()
	        .antMatchers(HttpMethod.PUT,  "/medicos").permitAll()
	        .antMatchers(HttpMethod.DELETE,  "/medicos").permitAll()
	        .anyRequest().authenticated()
	        .and()
	        .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
	        .build();

	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception{
		return configuration.getAuthenticationManager();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}

//	return http.csrf().disable()
//			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//			.and().authorizeHttpRequests()
//			.antMatchers(HttpMethod.POST, "/login").permitAll()
//			.anyRequest().authenticated()
//			.and().addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
//			.build();