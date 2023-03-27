package model;

import org.junit.Test;

public class CazCaritabilTest {

    @Test
    public void getID() {
        CazCaritabil cc = new CazCaritabil("1", 222.22);
        assert(cc.getID().equals("1"));
    }

    @Test
    public void setID() {
        CazCaritabil cc = new CazCaritabil("1", 222.22);
        cc.setID("2");
        assert(cc.getID().equals("2"));
    }

    @Test
    public void getTotalSum() {
        CazCaritabil cc = new CazCaritabil("1", 222.22);
        assert(cc.getTotalSum() == 222.22);
    }

    @Test
    public void setTotalSum() {
        CazCaritabil cc = new CazCaritabil("1", 222.22);
        cc.setTotalSum(232.32);
        assert(cc.getTotalSum() == 232.32);
    }
}