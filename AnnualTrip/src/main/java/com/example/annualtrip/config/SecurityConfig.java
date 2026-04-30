package com.example.annualtrip.config;

import com.example.annualtrip.Services.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain SecurityFilterChain(HttpSecurity http) throws Exception {
        http.cors(cors->cors.configurationSource(request -> { CorsConfiguration corsConfiguration =new CorsConfiguration();
            corsConfiguration.setAllowedOrigins(java.util.List.of("http://localhost:3000"));
            corsConfiguration.setAllowedMethods(java.util.List.of("GET", "POST", "OPTIONS"));
            corsConfiguration.setAllowedHeaders(java.util.List.of("*"));
            corsConfiguration.setAllowCredentials(true);
            return corsConfiguration;}))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth.requestMatchers(HttpMethod.POST, "/teachers/add").permitAll()

                        .requestMatchers(HttpMethod.GET, "/teachers/{id}").permitAll()
                        .requestMatchers("/teachers/**", "/students/all","/students/locations","/students/add","/students/addLocation").hasRole("TEACHER")
                        .anyRequest().authenticated()).httpBasic(Customizer.withDefaults());
        return http.build();
    }

}
