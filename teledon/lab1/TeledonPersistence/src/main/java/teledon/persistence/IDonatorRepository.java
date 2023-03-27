package teledon.persistence;

public interface IDonatorRepository<ID,E> {
    E findOne(String nume, String telefon);
    Iterable<E> findAll();
    void save(E entity);
}
