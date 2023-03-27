package model;

import org.junit.Test;

public class VoluntarTest {

    @Test
    public void getID() {
        Voluntar v = new Voluntar("1", "ana", "1234");
        assert(v.getID().equals("1"));
    }

    @Test
    public void setID() {
        Voluntar v = new Voluntar("1", "ana", "1234");
        v.setID("2");
        assert(v.getID().equals("2"));
    }

    @Test
    public void getName() {
        Voluntar v = new Voluntar("1", "ana", "1234");
        assert(v.getName().equals("ana"));
    }

    @Test
    public void setName() {
        Voluntar v = new Voluntar("1", "ana", "1234");
        v.setName("maria");
        assert(v.getName().equals("maria"));
    }

    @Test
    public void getPassword() {
        Voluntar v = new Voluntar("1", "ana", "1234");
        assert(v.getPassword().equals("1234"));
    }

    @Test
    public void setPassword() {
        Voluntar v = new Voluntar("1", "ana", "1234");
        v.setPassword("q1w2");
        assert (v.getPassword().equals("q1w2"));
    }
}