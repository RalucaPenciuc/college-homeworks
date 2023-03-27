package model;

public class CazCaritabil implements HasID<String> {
    private String ID;
    private double totalSum;

    public CazCaritabil(String ID, double totalSum) {
        this.ID = ID;
        this.totalSum = totalSum;
    }

    @Override
    public String getID() {
        return ID;
    }

    @Override
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
        return "CazCaritabil{" +
                "ID='" + ID + '\'' +
                ", totalSum=" + totalSum +
                '}';
    }
}
