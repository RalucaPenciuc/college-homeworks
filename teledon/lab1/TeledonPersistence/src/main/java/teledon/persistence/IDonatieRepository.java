package teledon.persistence;

public interface IDonatieRepository<ID, E> {
    void save(E entity);
}
