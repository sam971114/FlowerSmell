package likelion.hackathon.FlowerSmell.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDiscardFlower is a Querydsl query type for DiscardFlower
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDiscardFlower extends EntityPathBase<DiscardFlower> {

    private static final long serialVersionUID = 1937216672L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDiscardFlower discardFlower = new QDiscardFlower("discardFlower");

    public final QBusiness discardFlowerBusiness;

    public final StringPath engName = createString("engName");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath message = createString("message");

    public final StringPath name = createString("name");

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final NumberPath<Integer> size = createNumber("size", Integer.class);

    public QDiscardFlower(String variable) {
        this(DiscardFlower.class, forVariable(variable), INITS);
    }

    public QDiscardFlower(Path<? extends DiscardFlower> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDiscardFlower(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDiscardFlower(PathMetadata metadata, PathInits inits) {
        this(DiscardFlower.class, metadata, inits);
    }

    public QDiscardFlower(Class<? extends DiscardFlower> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.discardFlowerBusiness = inits.isInitialized("discardFlowerBusiness") ? new QBusiness(forProperty("discardFlowerBusiness")) : null;
    }

}

