package likelion.hackathon.FlowerSmell.api;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import likelion.hackathon.FlowerSmell.model.User;
import likelion.hackathon.FlowerSmell.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class UserApiController {

    private final UserService userService;

    @GetMapping("/api/allUsers")
    public List<User> Users() {
        return userService.findUsers();
    }

    @Data
    @AllArgsConstructor
    static class Result<T> {
        private T date;
    }

    @Data
    @AllArgsConstructor
    static class MemberDto {
        private String name;
    }

    @PostMapping("/api/saveUser")
    @ResponseStatus(HttpStatus.OK)
    public CreateUserResponse saveMember(@RequestBody @Valid User user) {
        int id = userService.join(user);
        return new CreateUserResponse(id);
    }

    @PutMapping("/api/findOneMember/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UpdateUserResponse updateMemberV2(
            @PathVariable("id") int id,
            @RequestBody @Valid UpdateMemberRequest request) {

        userService.update(id, request.getName());
        User findUser = userService.findOne(id);
        return new UpdateUserResponse(findUser.getId(), findUser.getUsername());
    }

    @Data
    static class UpdateMemberRequest {
        private String name;
    }

    @Data
    @AllArgsConstructor
    static class UpdateUserResponse {
        private int id;
        private String name;
    }

    @Data
    static class CreateUserRequest {
        @NotEmpty
        private String name;
    }

    @Data
    static class CreateUserResponse {
        private int id;

        public CreateUserResponse(int id) {
            this.id = id;
        }
    }
}
