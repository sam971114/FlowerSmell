package likelion.hackathon.FlowerSmell.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBusiness is a Querydsl query type for Business
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBusiness extends EntityPathBase<Business> {

    private static final long serialVersionUID = 40862553L;

    public static final QBusiness business = new QBusiness("business");

    public final StringPath address = createString("address");

    public final DateTimePath<java.sql.Timestamp> createDate = createDateTime("createDate", java.sql.Timestamp.class);

    public final ListPath<DiscardFlower, QDiscardFlower> discardFlowers = this.<DiscardFlower, QDiscardFlower>createList("discardFlowers", DiscardFlower.class, QDiscardFlower.class, PathInits.DIRECT2);

    public final ListPath<Flower, QFlower> flowers = this.<Flower, QFlower>createList("flowers", Flower.class, QFlower.class, PathInits.DIRECT2);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final ListPath<Order, QOrder> orders = this.<Order, QOrder>createList("orders", Order.class, QOrder.class, PathInits.DIRECT2);

    public final StringPath password = createString("password");

    public final StringPath phoneNumber = createString("phoneNumber");

    public final StringPath role = createString("role");

    public final BooleanPath subscribe = createBoolean("subscribe");

    public final StringPath username = createString("username");

    public final ListPath<User, QUser> users = this.<User, QUser>createList("users", User.class, QUser.class, PathInits.DIRECT2);

    public QBusiness(String variable) {
        super(Business.class, forVariable(variable));
    }

    public QBusiness(Path<? extends Business> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBusiness(PathMetadata metadata) {
        super(Business.class, metadata);
    }

}

