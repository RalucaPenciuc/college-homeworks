package unit_tests;

import com.company.domain.*;

import org.junit.Test;

import static org.junit.Assert.*;

public class NotaTest {

    Student s = new Student("1", "ana", 226);
    Tema t = new Tema("1", "xml", 8, 7);

    @Test
    public void getID() {
        Nota n = new Nota(new Pair(s.getID(), t.getID()), 10.0, 8, "done");
        assertEquals(new Pair("1", "1"), n.getID());
    }

    @Test
    public void setID() {
        Nota n = new Nota(new Pair(s.getID(), t.getID()), 10.0, 8, "done");
        n.setID(new Pair("1", "2"));
        assertEquals(new Pair("1", "2"), n.getID());
    }

    @Test
    public void getNota() {
        Nota n = new Nota(new Pair(s.getID(), t.getID()), 10.0, 8, "done");
        assertEquals(10.0, n.getNota(), 0.0);
    }

    @Test
    public void setNota() {
        Nota n = new Nota(new Pair(s.getID(), t.getID()), 10.0, 8, "done");
        n.setNota(9.5);
        assertEquals(9.5, n.getNota(), 0.0);
    }

    @Test
    public void getSaptamanaPredare() {
        Nota n = new Nota(new Pair(s.getID(), t.getID()), 10.0, 8, "done");
        assertEquals(8, n.getSaptamanaPredare());
    }

    @Test
    public void setSaptamanaPredare() {
        Nota n = new Nota(new Pair(s.getID(), t.getID()), 10.0, 8, "done");
        n.setSaptamanaPredare(9);
        assertEquals(9, n.getSaptamanaPredare());
    }

    @Test
    public void getFeedback() {
        Nota n = new Nota(new Pair(s.getID(), t.getID()), 10.0, 8, "done");
        assertEquals("done", n.getFeedback());
    }

    @Test
    public void setFeedback() {
        Nota n = new Nota(new Pair(s.getID(), t.getID()), 10.0, 8, "done");
        n.setFeedback("duplicate");
        assertEquals("duplicate", n.getFeedback());
    }

    @Test
    public void testToString() {
        Nota n = new Nota(new Pair(s.getID(), t.getID()), 10.0, 8, "done");
        String result = "Nota{" + "idStudent = " + n.getID().getObject1() + ", idTema = " + n.getID().getObject2()
                + ", nota = " + n.getNota() + ", saptamanaPredare = " + n.getSaptamanaPredare() + ", feedback = '"
                + n.getFeedback() + '\'' + '}';
        assertEquals(result, n.toString());
    }
}