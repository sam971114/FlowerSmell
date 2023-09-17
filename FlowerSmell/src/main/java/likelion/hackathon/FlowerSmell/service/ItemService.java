package likelion.hackathon.FlowerSmell.service;

import likelion.hackathon.FlowerSmell.model.Item;
import likelion.hackathon.FlowerSmell.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;

    @Transactional
    public void saveItem(Item item) {
        itemRepository.save(item);
    }

    @Transactional
    public void updateItem(int id, String name, int price, int stockQuantity)
    {
        Item item = itemRepository.findById(id).get();
        item.setName(name);
        item.setPrice(price);
        item.setStockQuantity(stockQuantity);
    }


    public List<Item> findItems() {
        return itemRepository.findAll();
    }

    public Item findOne(int itemId) {
        return itemRepository.findById(itemId).get();
    }

//    public List<Item> findAllByCategory() {
//        return itemRepository.findAllByCategory();
//    }
}
