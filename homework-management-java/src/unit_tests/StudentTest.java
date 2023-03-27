package unit_tests;

import com.company.domain.Student;

import static org.junit.Assert.*;

public class StudentTest {

    @org.junit.Test
    public void getID() {
        Student st = new Student("1", "ana", 226);
        assertEquals("1", st.getID());
    }

    @org.junit.Test
    public void setID() {
        Student st = new Student("1", "ana", 226);
        st.setID("10");
        assertEquals("10", st.getID());
    }

    @org.junit.Test
    public void getNume() {
        Student st = new Student("1", "ana", 226);
        assertEquals("ana", st.getNume());
    }

    @org.junit.Test
    public void setNume() {
        Student st = new Student("1", "ana", 226);
        st.setNume("maria");
        assertEquals("maria", st.getNume());
    }

    @org.junit.Test
    public void getGrupa() {
        Student st = new Student("1", "ana", 226);
        assertEquals(226, st.getGrupa());
    }

    @org.junit.Test
    public void setGrupa() {
        Student st = new Student("1", "ana", 226);
        st.setGrupa(225);
        assertEquals(225, st.getGrupa());
    }

    @org.junit.Test
    public void testToString() {
        Student st = new Student("1", "ana", 226);
        String result = "Student{" + "idStudent = " + st.getID() + ", nume = '" + st.getNume() + "', grupa = " +
                st.getGrupa() + "}";
        assertEquals(result, st.toString());
    }

    @org.junit.Test
    public void testEquals() {
        Student st1 = new Student("1", "ana", 226);
        Student st2 = new Student("1", "maria", 226);
        assertEquals(true, st1.equals(st2));
    }
}