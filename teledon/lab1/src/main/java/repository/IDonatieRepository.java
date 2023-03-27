package repository;

import validation.ValidationException;

public interface IDonatieRepository<ID, E> {
    /**
     * @param entity; entity must be not null
     * @return null- if the given entity is saved; otherwise returns the entity (id already exists)
     * @throws ValidationException if the entity is not valid
     * @throws IllegalArgumentException if the given entity is null.
     **/
    void save(E entity) throws ValidationException;
}
