package likelion.hackathon.FlowerSmell.service;

import likelion.hackathon.FlowerSmell.model.User;
import likelion.hackathon.FlowerSmell.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public int join(User user) {
        validateDuplicateMember(user);
        userRepository.save(user);
        return user.getId();
    }

    private void validateDuplicateMember(User user) {
        //EXCEPTION
        List<User> findUsers = (List<User>) userRepository.findByUsername(user.getUsername());
        if(!findUsers.isEmpty()) {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

    //회원 전체 조회
    public List<User> findUsers() {
        return userRepository.findAll();
    }

    public User findOne(int userId) {
        return userRepository.findById(userId).get();
    }

    public User findLog(String username, String password) {
        return userRepository.findByUsernameAndPassword(username,password);
    }


    @Transactional
    public void update(int id, String name) {
        User user = userRepository.findById(id).get();
        user.setUsername(name);
    }
}
