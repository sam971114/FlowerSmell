package likelion.hackathon.FlowerSmell.controller;

import likelion.hackathon.FlowerSmell.config.LoginRequest;
import likelion.hackathon.FlowerSmell.config.auth.PrincipalDetailsService;
import likelion.hackathon.FlowerSmell.model.Business;
import likelion.hackathon.FlowerSmell.model.User;
import likelion.hackathon.FlowerSmell.repository.BusinessRepository;
import likelion.hackathon.FlowerSmell.repository.UserRepository;
import likelion.hackathon.FlowerSmell.service.UserService;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.stream.Collectors.toList;


@RestController
@RequiredArgsConstructor
public class IndexController {


    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BusinessRepository businessRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    @Autowired
    public IndexController(
            UserRepository userRepository,
            BCryptPasswordEncoder bCryptPasswordEncoder
    ) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostMapping("/join")
    @ResponseStatus(HttpStatus.OK)
    public void join(@RequestBody User user) {
        System.out.println(user);
        user.setRole("ROLE_USER");
        String rawPassword = user.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        user.setPassword(encPassword);

        userRepository.save(user);
//        return "redirect:/loginForm";
    }


    @PostMapping("/joinBusiness")
    @ResponseStatus(HttpStatus.OK)
    public void join(@RequestBody Business business) {
        System.out.println(business);
        business.setRole("ROLE_USER");
        String rawPassword = business.getPassword();
        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
        business.setPassword(encPassword);

        businessRepository.save(business);
//        return "redirect:/loginForm";
    }

    @GetMapping("/loginUser/{username}/{password}")
    @ResponseStatus(HttpStatus.OK)
    public User loginUser(@PathVariable String username, @PathVariable String password) {
        User user = userRepository.findByUsername(username);
        boolean passwordsMatch = bCryptPasswordEncoder.matches(password, user.getPassword());
        if(passwordsMatch) {
            return user;
        }
        return null;
    }

    @GetMapping("/loginBusiness/{username}/{password}")
    @ResponseStatus(HttpStatus.OK)
    public Business loginBusiness(@PathVariable String username, @PathVariable String password) {
        Business business = businessRepository.findByUsername(username);
        boolean passwordsMatch = bCryptPasswordEncoder.matches(password, business.getPassword());
        if(passwordsMatch) {
            return business;
        }
        return null;
    }

    @GetMapping("/getUserByUsernameAndPassword")
    public ResponseEntity<User> getUserByUsernameAndPassword(
            @RequestParam String username,
            @RequestParam String password) {

        User user = userRepository.findByUsernameAndPassword(username, password);

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



//    @RequestMapping(value = "/logined", method = {RequestMethod.POST,RequestMethod.GET})
//    @ResponseStatus(HttpStatus.OK)
//    public Object login(@RequestBody LoginRequest loginRequest,
//                        @AuthenticationPrincipal PrincipalDetailsService userDetails) {
//        User user = userRepository.findByUsername(loginRequest.getUsername());
//        if (user == null || !bCryptPasswordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
//            // 인증 실패
//            return "Authentication failed.";
//        }
//        userDetails.loadUserByUsername(loginRequest.getUsername());
//
//        // 로그인 인증 처리
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
//        );
//
//        // 인증 성공 시, SecurityContextHolder에 인증 정보 저장
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//
//
//
//        return "Logged in successfully as " + loginRequest.getUsername();
//    }
//
//    @PostMapping("/api/login")
//    public UserDto login(@RequestBody UserDto params) {
//        User temp_entity = userService.findLog(params.getUsername(), bCryptPasswordEncoder.encode(params.getPassword()));
//
//        UserDto entity =  new UserDto(temp_entity);
//
////        if(entity ==null) {
////            return "오류";
////        }
//            return entity;
//    }


    @Secured("ROLE_ADMIN") //막아줌
    @GetMapping("/info")
    public @ResponseBody String info() {
        return "개인정보";
    }

    @PreAuthorize("hasRole('ROLE_MANAGER') or hasRole('ROLE_ADMIN')") //data() 메소드 실행되기 직전에 실행됨
    @GetMapping("/data")
    public @ResponseBody String data() {
        return "데이터정보";
    }


    @Getter
    @Data
    static class UserDto {
        private String username;
        private String password;

        public UserDto(User user) {
            username = user.getUsername();
            password = user.getPassword();
        }

        public UserDto() {

        }
    }

}
