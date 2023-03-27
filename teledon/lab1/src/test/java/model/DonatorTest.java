package model;

import org.junit.Test;

public class DonatorTest {

    @Test
    public void getID() {
        Donator d = new Donator("1", "ana", "cluj", "1234567890");
        assert(d.getID().equals("1"));
    }

    @Test
    public void setID() {
        Donator d = new Donator("1", "ana", "cluj", "1234567890");
        d.setID("2");
        assert(d.getID().equals("2"));
    }

    @Test
    public void getName() {
        Donator d = new Donator("1", "ana", "cluj", "1234567890");
        assert(d.getName().equals("ana"));
    }

    @Test
    public void setName() {
        Donator d = new Donator("1", "ana", "cluj", "1234567890");
        d.setName("maria");
        assert(d.getName().equals("maria"));
    }

    @Test
    public void getAddress() {
        Donator d = new Donator("1", "ana", "cluj", "1234567890");
        assert(d.getAddress().equals("cluj"));
    }

    @Test
    public void setAddress() {
        Donator d = new Donator("1", "ana", "cluj", "1234567890");
        d.setAddress("dej");
        assert(d.getAddress().equals("dej"));
    }

    @Test
    public void getPhone() {
        Donator d = new Donator("1", "ana", "cluj", "1234567890");
        assert(d.getPhone().equals("1234567890"));
    }

    @Test
    public void setPhone() {
        Donator d = new Donator("1", "ana", "cluj", "1234567890");
        d.setPhone("0712345678");
        assert(d.getPhone().equals("0712345678"));
    }
}