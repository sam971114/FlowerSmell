package likelion.hackathon.FlowerSmell.config.auth;

// 시큐리티가 /login 주소 요청이 오면 낚아채서 로그인 진행
// 로그인 진행 완료하면 시큐리티 session을 만듦 (Security ContextHolder)
// 오브젝트 => Authentication 타입 객체 + 안에 User정보 있어야함
// User 오브젝트 타입 -> UserDetails 타입 객체

// Security Session => Authentication => UserDetails(PrincipalDetails)

import likelion.hackathon.FlowerSmell.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

public class PrincipalDetails implements UserDetails {

    private User user; //콤포지션

    public PrincipalDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collect = new ArrayList<>();
        collect.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return user.getRole();
            }
        });
        return collect;
    }
    //해당 User의 권한을 리턴하는 곳!

    @Override
    public String getPassword() {
       return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        // 만약 1년동안 로그인안하면 휴면계정
        // 현재시간 - 로그인 시간 => 1년 초과할경우 false로 logic짜기
        return true;
    }
}
