package model;

import org.junit.Test;

public class DonatieTest {

    @Test
    public void getID() {
        CazCaritabil cc = new CazCaritabil("1", 222.22);
        Donator d = new Donator("1", "ana", "cluj", "1234567890");
        Donatie dd = new Donatie(new Pair<>(cc, d), 20.0);
        assert(dd.getID().getObject1().getID().equals("1"));
        assert(dd.getID().getObject2().getName().equals("ana"));
    }

    @Test
    public void setID() {
        CazCaritabil cc = new CazCaritabil("1", 222.22);
        Donator d = new Donator("1", "ana", "cluj", "1234567890");
        Donatie dd = new Donatie(new Pair<>(cc, d), 20.0);
        d.setName("maria");
        dd.setID(new Pair<>(cc, d));
        assert(dd.getID().getObject2().getName().equals("maria"));
    }

    @Test
    public void getSumaDonata() {
        CazCaritabil cc = new CazCaritabil("1", 222.22);
        Donator d = new Donator("1", "ana", "cluj", "1234567890");
        Donatie dd = new Donatie(new Pair<>(cc, d), 20.0);
        assert(dd.getSumaDonata() == 20.0);
    }

    @Test
    public void setSumaDonata() {
        CazCaritabil cc = new CazCaritabil("1", 222.22);
        Donator d = new Donator("1", "ana", "cluj", "1234567890");
        Donatie dd = new Donatie(new Pair<>(cc, d), 20.0);
        dd.setSumaDonata(280.44);
        assert(dd.getSumaDonata() == 280.44);
    }
}