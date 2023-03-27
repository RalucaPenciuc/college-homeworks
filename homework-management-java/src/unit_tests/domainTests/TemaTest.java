package unit_tests.domainTests;


import com.company.domain.Tema;
import org.junit.Test;

import static junit.framework.TestCase.assertEquals;

public class TemaTest {

    @Test
    public void getID() {
        Tema t = new Tema("1", "desc1", 5,3);
        assertEquals("1", t.getID());
    }

    @Test
    public void setID() {
        Tema t = new Tema("1", "desc1", 5,3);
        t.setID("10");
        assertEquals("10", t.getID());
    }

    @Test
    public void getDescriere() {
        Tema t = new Tema("1", "desc1", 5,3);
        assertEquals("desc1", t.getDescriere());
    }

    @Test
    public void setDescriere() {
        Tema t = new Tema("1", "desc1", 5,3);
        t.setDescriere("fisier");
        assertEquals("fisier", t.getDescriere());
    }

    @Test
    public void getDeadline() {
        Tema t = new Tema("1", "desc1", 5,3);
        assertEquals(5, t.getDeadline());
    }

    @Test
    public void setDeadline() {
        Tema t = new Tema("1", "desc1", 5,3);
        t.setDeadline(10);
        assertEquals(10, t.getDeadline());
    }

    @Test
    public void getStartline() {
        Tema t = new Tema("1", "desc1", 5,3);
        assertEquals(3, t.getStartline());
    }

    @Test
    public void setStartline() {
        Tema t = new Tema("1", "desc1", 5,3);
        t.setStartline(7);
        assertEquals(7, t.getStartline());
    }

    @Test
    public void testToString() {
        Tema t = new Tema("1", "desc1", 5,3);
        String result = "Tema{" + "id='" + t.getID() + "', descriere='" + t.getDescriere() + "', deadline=" +
                t.getDeadline() + ", startline=" + t.getStartline() + '}';
    }

    @Test
    public void testEquals() {
        Tema t1 = new Tema("1", "desc1", 5,3);
        Tema t2 = new Tema("1", "fisier", 8,4);
        assertEquals(true, t1.equals(t2));
    }
}