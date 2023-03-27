public class ComplexNumber {
    private int re;
    private int im;

    public ComplexNumber() {
        this.re = 0;
        this.im = 0;
    }

    public ComplexNumber(int re, int im) {
        this.re = re;
        this.im = im;
    }

    public int getRe() {
        return re;
    }

    public void setRe(int re) {
        this.re = re;
    }

    public int getIm() {
        return im;
    }

    public void setIm(int im) {
        this.im = im;
    }

    public ComplexNumber sum(ComplexNumber other) {
        setRe(this.re + other.re);
        setIm(this.im + other.im);

        return this;
    }

    public ComplexNumber difference(ComplexNumber other) {
        setRe(this.re - other.re);
        setIm(this.im - other.im);

        return this;
    }

    public ComplexNumber product(ComplexNumber other) {
        setRe(this.re * other.re - this.im * other.im);
        setIm(this.im * other.re + this.re * other.im);

        return this;
    }

    public ComplexNumber division(ComplexNumber other) {
        other.setIm((-1) * other.getIm());
        this.product(other);

        return this;
    }

    public double distance(ComplexNumber other) {
        return Math.sqrt((this.re - other.re) * (this.re - other.re) + (this.im - other.im) * (this.im - other.im));
    }

    @Override
    public String toString() {
        if (re != 0 && im == 0) {
            return re + " ";
        }
        else {
            if (re == 0 && im != 0) {
                return im + "i";
            }
            else {
                if (re != 0 && im < 0) {
                    return re + "" + im + "i";
                }
                else {
                    return re + "+" + im + "i";
                }
            }
        }
    }
}
