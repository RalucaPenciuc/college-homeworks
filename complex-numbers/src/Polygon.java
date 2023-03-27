import java.util.*;

public class Polygon {
    private Vector<ComplexNumber> complexNumbers;

    public Polygon() {
    }

    public Polygon(ComplexNumber[] numbers) {
        complexNumbers = new Vector<>();

        for (int i = 0; i < numbers.length; i++) {
            complexNumbers.add(numbers[i]);
        }
    }

    public double perimetru() {
        double p = 0;

        for (int i = 0; i < complexNumbers.size(); i+=2) {
            p += complexNumbers.get(i).distance(complexNumbers.get(i+1));
        }

        return p;
    }
}
