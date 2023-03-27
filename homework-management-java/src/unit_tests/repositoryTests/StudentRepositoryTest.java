package unit_tests.repositoryTests;

import com.company.domain.Student;
import com.company.repository.StudentRepository;
import com.company.validation.StudentValidator;
import com.company.validation.ValidationException;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.util.Iterator;

import static org.junit.Assert.*;

public class StudentRepositoryTest {

    StudentValidator validator = new StudentValidator();
    StudentRepository repository = new StudentRepository(validator);
    Student st = new Student("2", "maria", 225);

    @Rule
    public ExpectedException exception = ExpectedException.none();

    @Test
    public void testFindOneOk() {
        repository.save(new Student("1", "ana", 222));
        repository.save(st);
        repository.save(new Student("3", "ion", 227));

        Student rezultat = repository.findOne("2");
        assertEquals(st, rezultat);
    }

    @Test
    public void testFindOneNok() {
        repository.save(new Student("1", "ana", 222));
        repository.save(st);
        repository.save(new Student("3", "ion", 227));

        Student alt_rezultat = repository.findOne("6");
        assertEquals(null, alt_rezultat);
    }

    @Test (expected = IllegalArgumentException.class)
    public void testFindOneException() {
        repository.save(new Student("1", "ana", 222));
        repository.save(st);
        repository.save(new Student("3", "ion", 227));

        Student eroare = repository.findOne(null);
        assertEquals(IllegalArgumentException.class, eroare);
    }

    @Test
    public void testFindAll() {
        repository.save(new Student("1", "ana", 222));
        Student st = new Student("2", "maria", 225);
        repository.save(st);
        repository.save(new Student("3", "ion", 227));

        Iterable<Student> rezultat = repository.findAll();

        int count = 0;
        Iterator<Student> it = rezultat.iterator();
        while (it.hasNext()) {
            it.next();
            count++;
        }
        assertEquals(3, count);
    }

    @Test
    public void testSaveOk() {
        repository.save(new Student("1", "ana", 222));
        Student st = new Student("2", "maria", 225);
        repository.save(st);
        repository.save(new Student("3", "ion", 227));

        Student stNou = new Student("10", "vasile", 923);
        repository.save(stNou);
        assertEquals(stNou, repository.findOne(stNou.getID()));
    }

    @Test
    public void testSaveException() {
        repository.save(new Student("1", "ana", 222));
        Student st = new Student("2", "maria", 225);
        repository.save(st);
        repository.save(new Student("3", "ion", 227));

        try {
            Student altStNou = new Student("12", "", 122);
            Student eroare = repository.save(altStNou);
        }
        catch(ValidationException ve) {
            exception.expect(ValidationException.class);
            exception.expectMessage("Entitatea nu este valida! \n");
        }
    }

    @Test
    public void testDeleteOk() {

        repository.save(new Student("1", "ana", 222));
        Student st = new Student("2", "maria", 225);
        repository.save(st);
        repository.save(new Student("3", "ion", 227));

        Student stRem = repository.delete("2");
        assertEquals(st, stRem);
    }

    @Test (expected = IllegalArgumentException.class)
    public void testDeleteException() {

        repository.save(new Student("1", "ana", 222));
        Student st = new Student("2", "maria", 225);
        repository.save(st);
        repository.save(new Student("3", "ion", 227));

        Student eroare = repository.delete(null);
        assertEquals(IllegalArgumentException.class, eroare);
    }


    @Test
    public void testUpdateOk() {

        repository.save(new Student("1", "ana", 222));
        Student st = new Student("2", "maria", 225);
        repository.save(st);
        repository.save(new Student("3", "ion", 227));

        Student stNou = repository.update(new Student("2", "anamaria", 225));
        assertEquals(st.getNume().equals("anamaria"), stNou.getNume().equals("anamaria"));
    }

    @Test
    public void testUpdateNok() {

        repository.save(new Student("1", "ana", 222));
        Student st = new Student("2", "maria", 225);
        repository.save(st);
        repository.save(new Student("3", "ion", 227));

        Student nimic = repository.update(new Student("10", "vasile", 227));
        assertEquals(null, nimic);
    }

    @Test
    public void testUpdateException() {

        repository.save(new Student("1", "ana", 222));
        Student st = new Student("2", "maria", 225);
        repository.save(st);
        repository.save(new Student("3", "ion", 227));

        try {
            Student eroare = repository.update(new Student("3", null, 222));
            assertEquals(null, eroare);
        }
        catch(ValidationException ve) {
            exception.expect(ValidationException.class);
            exception.expectMessage("Entitatea nu este valida! \n");
        }
    }
}