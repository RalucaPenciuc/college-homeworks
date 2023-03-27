package unit_tests.repositoryTests;

import com.company.domain.Tema;
import com.company.repository.TemaRepository;
import com.company.validation.TemaValidator;
import com.company.validation.ValidationException;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import static org.junit.Assert.*;

public class TemaRepositoryTest {

    TemaValidator validator = new TemaValidator();
    TemaRepository repository = new TemaRepository(validator);

    @Rule
    public ExpectedException exception = ExpectedException.none();

    @Test
    public void testSaveOk() {
        repository.save(new Tema("1", "laborator", 5, 3));
        Tema t = new Tema("2", "service", 6, 4);
        repository.save(t);
        repository.save(new Tema("3", "fisier", 6, 3));

        Tema tNoua = new Tema("10", "iteratia5", 7, 4);
        repository.save(tNoua);
        assertEquals(tNoua, repository.findOne(tNoua.getID()));
    }

    @Test
    public void testSaveException() {
        repository.save(new Tema("1", "laborator", 5, 3));
        Tema t = new Tema("2", "service", 6, 4);
        repository.save(t);
        repository.save(new Tema("3", "fisier", 6, 3));

        try {
            Tema altaTNoua = new Tema("12", "", 5, 3);
            Tema eroare = repository.save(altaTNoua);
        }
        catch(ValidationException ve) {
            exception.expect(ValidationException.class);
            exception.expectMessage("Entitatea nu este valida! \n");
        }
    }

    @Test
    public void extendDeadline() {
        Tema t = new Tema("1", "service", 6, 4);

        repository.extendDeadline(t, 3);
        assertEquals(9, t.getDeadline());
    }
}