package teledon.model;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "CazuriCaritabile")
public class CazCaritabil implements HasID<Integer>, Serializable {
    private int ID;
    private double totalSum;

    public CazCaritabil() {}

    public CazCaritabil(int ID) {
        this.ID = ID;
    }

    public CazCaritabil(int ID, double totalSum) {
        this.ID = ID;
        this.totalSum = totalSum;
    }

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    @Override
    public Integer getID() {
        return ID;
    }

    @Override
    public void setID(Integer ID) {
        this.ID = ID;
    }

    @Column(name = "suma_totala")
    public double getTotalSum() {
        return totalSum;
    }

    public void setTotalSum(double totalSum) {
        this.totalSum = totalSum;
    }

    @Override
    public String toString() {
        return "teledon.teledon.model.CazCaritabil{" +
                "ID='" + ID + '\'' +
                ", totalSum=" + totalSum +
                '}';
    }
}
