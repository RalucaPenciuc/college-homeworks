package teledon.persistence;

public interface IVoluntarRepository<ID, E> {
    E findOne(String nume);
    void save(E entity);
}
