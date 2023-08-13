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
    public int join(User member) {
        validateDuplicateMember(member);
        userRepository.save(member);
        return member.getId();
    }

    private void validateDuplicateMember(User member) {
        //EXCEPTION
        List<User> findMembers = (List<User>) userRepository.findByUsername(member.getUsername());
        if(!findMembers.isEmpty()) {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }

    //회원 전체 조회
    public List<User> findMembers() {
        return userRepository.findAll();
    }

    public User findOne(int memberId) {
        return userRepository.findById(memberId).get();
    }


    @Transactional
    public void update(int id, String name) {
        User member = userRepository.findById(id).get();
        member.setUsername(name);
    }
}
