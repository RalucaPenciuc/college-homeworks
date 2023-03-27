package repository;

import validation.ValidationException;

public interface ICazCaritabilRepository<ID,E> {

    E findOne(ID id);
    /**
     * @return all entities
     **/
    Iterable<E> findAll();

    /**
     * @param entity; entity must be not null
     * @return null- if the given entity is saved; otherwise returns the entity (id already exists)
     * @throws ValidationException if the entity is not valid
     * @throws IllegalArgumentException if the given entity is null.
     **/
    void save(E entity) throws ValidationException;

    void update(E entity);
}
