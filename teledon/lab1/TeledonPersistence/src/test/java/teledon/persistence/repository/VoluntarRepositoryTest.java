package teledon.persistence.repository;

import org.junit.Test;
import teledon.model.Voluntar;

import java.io.IOException;
import java.util.Properties;

public class VoluntarRepositoryTest {

    @Test
    public void save() {
        Properties serverProperties = new Properties();
        Properties hibernateProperties = new Properties();
        try {
            serverProperties.load(VoluntarRepositoryTest.class.getResourceAsStream("/teledonserver.properties"));
            System.out.println("Server properties set.");
            serverProperties.list(System.out);
        } catch (IOException e) {
            System.err.println("Cannot find teledonserver.properties " + e);
            return;
        }

        try {
            hibernateProperties.load(VoluntarRepositoryTest.class.getResourceAsStream("/hibernate.cfg.xml"));
            System.out.println("Hibernate properties set.");
            hibernateProperties.list(System.out);
        } catch (IOException e) {
            System.err.println("Cannot find hibernate.cfg.xml");
            return;
        }

        VoluntarRepository voluntarRepository = new VoluntarRepository(serverProperties, hibernateProperties);

        Voluntar v1 = new Voluntar("george", "user");
        voluntarRepository.save(v1);
        Voluntar v2 = new Voluntar("maria", "user");
        voluntarRepository.save(v2);

        Voluntar v = voluntarRepository.findOne("ion");
        assert(v1.getPassword().equals(v.getPassword()));
    }
}