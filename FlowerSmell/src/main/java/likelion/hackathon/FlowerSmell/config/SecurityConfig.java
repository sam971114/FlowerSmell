package likelion.hackathon.FlowerSmell.config;

import likelion.hackathon.FlowerSmell.config.auth.AuthSuccessHandler;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true) //secured annotation 활성화, preAuthorize 어노테이션 활성화
@AllArgsConstructor
public class SecurityConfig {


    AuthSuccessHandler authSuccessHandler;

    @Bean
    public BCryptPasswordEncoder encodePwd() {
        return new BCryptPasswordEncoder();
    }
    //해당 메서드의 리턴되는 오브젝트를 IoC로 등록

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        // 정적 리소스들이 보안필터를 거치지 않게끔
        return (web) -> web.ignoring().requestMatchers(
                new AntPathRequestMatcher("/css/**"),
                new AntPathRequestMatcher("/js/**"),
                new AntPathRequestMatcher("/img/**"),
                new AntPathRequestMatcher("/font/**")
                );
    }


//    @Bean
//    public AuthenticationManager authenticationManager(
//            AuthenticationConfiguration configuration) throws Exception {
//        return configuration.getAuthenticationManager();
//    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.csrf((csrf) -> csrf.disable());
        http.authorizeRequests(authorizeRequests ->
                authorizeRequests
//                        .requestMatchers(new AntPathRequestMatcher("/api/**", HttpMethod.GET.name())).permitAll()
//                        .requestMatchers(new AntPathRequestMatcher("/api/auth/**")).permitAll()
//                        .requestMatchers(new AntPathRequestMatcher("**/signin")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/board")).authenticated()
                        .requestMatchers(new AntPathRequestMatcher("**/mypages")).authenticated()
                        .requestMatchers(new AntPathRequestMatcher("**/mypagec")).authenticated()
                        .anyRequest().permitAll()
        );

        http.formLogin(login ->
                login
                        .loginPage("/signin")
                        .successHandler(authSuccessHandler)
                        .loginProcessingUrl("/login")
                        .defaultSuccessUrl("/")
                        .failureUrl("/login?error=true")
                        .usernameParameter("username")
                        .passwordParameter("password")

        );
        http.exceptionHandling().accessDeniedPage("/denied");

        return http.build();
    }

}
