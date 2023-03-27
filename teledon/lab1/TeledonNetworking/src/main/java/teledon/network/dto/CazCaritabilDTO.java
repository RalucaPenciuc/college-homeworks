package teledon.network.dto;

import java.io.Serializable;

public class CazCaritabilDTO implements Serializable {
    private String ID;
    private double totalSum;

    public CazCaritabilDTO(String ID, double totalSum) {
        this.ID = ID;
        this.totalSum = totalSum;
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public double getTotalSum() {
        return totalSum;
    }

    public void setTotalSum(double totalSum) {
        this.totalSum = totalSum;
    }

    @Override
    public String toString() {
        return "CazCaritabilDTO{" +
                "ID='" + ID + '\'' +
                ", totalSum=" + totalSum +
                '}';
    }
}
