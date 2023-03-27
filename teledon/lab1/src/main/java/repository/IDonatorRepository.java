package repository;

import validation.ValidationException;

public interface IDonatorRepository<ID,E> {
    /**
     * @param nume - the id of the entity to be returned; id must not be null
     * @return the entity with the specified id or null - if there is no entity with the given id
     * @throws IllegalArgumentException if id is null.
     **/
    E findOne(String nume, String telefon);

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
}
