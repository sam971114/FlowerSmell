package likelion.hackathon.FlowerSmell.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFlower is a Querydsl query type for Flower
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFlower extends EntityPathBase<Flower> {

    private static final long serialVersionUID = -1042460620L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFlower flower = new QFlower("flower");

    public final StringPath engName = createString("engName");

    public final QBusiness flowerBusiness;

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath message = createString("message");

    public final StringPath name = createString("name");

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final NumberPath<Integer> size = createNumber("size", Integer.class);

    public QFlower(String variable) {
        this(Flower.class, forVariable(variable), INITS);
    }

    public QFlower(Path<? extends Flower> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFlower(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFlower(PathMetadata metadata, PathInits inits) {
        this(Flower.class, metadata, inits);
    }

    public QFlower(Class<? extends Flower> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.flowerBusiness = inits.isInitialized("flowerBusiness") ? new QBusiness(forProperty("flowerBusiness")) : null;
    }

}

