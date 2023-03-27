package unit_tests;

import com.company.domain.Nota;
import com.company.domain.Pair;
import com.company.domain.Student;
import com.company.domain.Tema;
import com.company.repository.NotaRepository;
import com.company.validation.NotaValidator;


import com.company.validation.ValidationException;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.util.Iterator;

import static org.junit.Assert.*;

public class NotaRepositoryTest {

    NotaValidator nval = new NotaValidator();
    NotaRepository nrepo = new NotaRepository(nval);
    Student s = new Student("1", "ana", 226);
    Tema t = new Tema("1", "xml", 8, 7);
    Nota n = new Nota(new Pair(s.getID(), t.getID()), 10.0, 8, "done");

    @Rule
    public ExpectedException exception = ExpectedException.none();

    @Test
    public void testFindOneOk() {
        nrepo.save(new Nota(new Pair("1", "2"), 9.0, 10, "done"));
        nrepo.save(n);
        nrepo.save(new Nota(new Pair("2", "1"), 7.5, 12, "done"));

        Nota rezultat = nrepo.findOne(new Pair("1", "1"));
        assertEquals(n, rezultat);
    }

    @Test
    public void testFindOneNok() {
        nrepo.save(new Nota(new Pair("1", "2"), 9.0, 10, "done"));
        nrepo.save(n);
        nrepo.save(new Nota(new Pair("2", "1"), 7.5, 12, "done"));

        Nota altRezultat = nrepo.findOne(new Pair("2", "2"));
        assertEquals(null, altRezultat);
    }

    @Test (expected = IllegalArgumentException.class)
    public void testFindOneException() {
        nrepo.save(new Nota(new Pair("1", "2"), 9.0, 10, "done"));
        nrepo.save(n);
        nrepo.save(new Nota(new Pair("2", "1"), 7.5, 12, "done"));

        Nota eroare = nrepo.findOne(null);
        assertEquals(IllegalArgumentException.class, eroare);
    }

    @Test
    public void testFindAll() {
        nrepo.save(new Nota(new Pair("1", "2"), 9.0, 10, "done"));
        nrepo.save(n);
        nrepo.save(new Nota(new Pair("2", "1"), 7.5, 12, "done"));

        Iterable<Nota> rezultat = nrepo.findAll();

        int count = 0;
        Iterator<Nota> it = rezultat.iterator();
        while (it.hasNext()) {
            it.next();
            count++;
        }
        assertEquals(3, count);
    }

    @Test
    public void testSaveOk() {
        nrepo.save(new Nota(new Pair("1", "2"), 9.0, 10, "done"));
        nrepo.save(n);
        nrepo.save(new Nota(new Pair("2", "1"), 7.5, 12, "done"));

        Nota nNoua = new Nota(new Pair("2", "3"), 6.7, 9, "done");
        nrepo.save(nNoua);
        assertEquals(nNoua, nrepo.findOne(nNoua.getID()));
    }

    @Test
    public void testSaveException() {
        nrepo.save(new Nota(new Pair("1", "2"), 9.0, 10, "done"));
        nrepo.save(n);
        nrepo.save(new Nota(new Pair("2", "1"), 7.5, 12, "done"));

        try {
            Nota altaNNoua = new Nota(new Pair("2", "3"), 12.7, 9, "done");
            Nota eroare = nrepo.save(altaNNoua);
        }
        catch(ValidationException ve) {
            exception.expect(ValidationException.class);
            exception.expectMessage("Entitatea nu este valida! \n");
        }
    }
}