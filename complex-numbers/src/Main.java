public class Main {

    public static boolean isNumeric(String strNumeric) {
        try {
            int d = Integer.parseInt(strNumeric);
        }
        catch (NumberFormatException | NullPointerException nfe) {
            return false;
        }
        return true;
    }

    public static String[] makeOperands(String[] args) {
        String[] operands = new String[args.length/2];
        int poz = -1;

        for (int i = 1; i < args.length; i += 2) {
            if (!(args[i].equals("+")  || args[i].equals("-") || args[i].equals("/") || args[i].equals("/"))) {
                System.out.println("The input data doesn't represent an arithmetic expression! \n");
            }
            else {
                operands[++poz] = args[i];
            }
        }
        return operands;
    }

    public static ComplexNumber[] makeObjects(String[] args) {
        ComplexNumber[] numbers = new ComplexNumber[args.length/2 + args.length%2];
        int poz = 0;
        int re;
        int im;

        for (int i = 0; i < args.length; i += 2) {
            if (args[i].equals("+") || args[i].equals("-") || args[i].equals("*") || args[i].equals("/")) {
                System.out.println("The input data doesn't represent an arithmetic expression! \n");
            }
            else {
                String[] str = args[i].split("[+-]");

                if (args[i].indexOf(str[0]) == 0 && !str[0].equals("")) {
                    if (isNumeric(str[0])) {
                        if (str.length == 1) {
                            re = Integer.parseInt(str[0]);
                            im = 0;
                        }
                        else {
                            re = Integer.parseInt(str[0]);
                            if (str[1].length() == 1) {
                                im = 1;
                            }
                            else {
                                im = Integer.parseInt(str[1].split("[i]")[0]);
                            }

                            if (args[i].charAt(args[i].indexOf(str[1]) - 1) == '-') {
                                im = (-1) * im;
                            }
                        }
                    }
                    else {
                        re = 0;
                        im = 1;
                    }
                    ComplexNumber c = new ComplexNumber(re, im);
                    numbers[poz++] = c;
                }
                else {
                    if (isNumeric(str[1])) {
                        if (str.length == 2) {
                            re = (-1)*Integer.parseInt(str[1]);
                            im = 0;
                        }
                        else {
                            re = (-1) * Integer.parseInt(str[1]);
                            if (str[2].length() == 1) {
                                im = 1;
                            }
                            else {
                                im = Integer.parseInt(str[2].split("[i]")[0]);
                            }

                            if (args[i].charAt(args[i].indexOf(str[2]) - 1) == '-') {
                                im = (-1) * im;
                            }
                        }
                    }
                    else {
                        re = 0;
                        im = -1;
                    }
                    ComplexNumber c = new ComplexNumber(re, im);
                    numbers[poz++] = c;
                }
            }
        }
        return numbers;
    }

    public static ComplexNumber makeOperations(String[] args) {
        ComplexNumber result = new ComplexNumber();
        ComplexNumber[] numbers = makeObjects(args);
        String[] operands = makeOperands(args);
        boolean done = false;
        int index = 0;
        int numbersLength = numbers.length;
        int operandsLength = operands.length;

        while(numbersLength > 1 && !done) {
            for (int i = 0; i < operandsLength && !done; i++) {
                if (operands[i].equals("*")) {
                    index = i;
                    done = true;
                }
            }
            if (done) {
                numbers[index].product(numbers[index + 1]);
                for (int i = index + 2; i < numbersLength; i++) {
                    numbers[i - 1] = numbers[i];
                }
                numbersLength--;
                for (int i = index + 1; i < operandsLength; i++) {
                    operands[i - 1] = operands[i];
                }
                operandsLength--;
                done = false;
            }
            else {
                done = false;
                for (int i = 0; i < operandsLength && !done; i++) {
                    if (operands[i].equals("/")) {
                        index = i;
                        done = true;
                    }
                }
                if (done) {
                    numbers[index].division(numbers[index + 1]);
                    for (int i = index + 2; i < numbersLength; i++) {
                        numbers[i - 1] = numbers[i];
                    }
                    numbersLength--;
                    for (int i = index + 1; i < operandsLength; i++) {
                        operands[i - 1] = operands[i];
                    }
                    operandsLength--;
                    done = false;
                }
                else {
                    done = false;
                    for (int i = 0; i < operandsLength && !done; i++) {
                        if (operands[i].equals("+")) {
                            index = i;
                            done = true;
                        }
                    }
                    if (done) {
                        numbers[index].sum(numbers[index + 1]);
                        for (int i = index + 2; i < numbersLength; i++) {
                            numbers[i - 1] = numbers[i];
                        }
                        numbersLength--;
                        for (int i = index + 1; i < operandsLength; i++) {
                            operands[i - 1] = operands[i];
                        }
                        operandsLength--;
                        done = false;
                    }
                    else {
                        done = false;
                        for (int i = 0; i < operandsLength && !done; i++) {
                            if (operands[i].equals("+")) {
                                index = i;
                                done = true;
                            }
                        }
                        if (done) {
                            numbers[index].difference(numbers[index + 1]);
                            for (int i = index + 2; i < numbersLength; i++) {
                                numbers[i - 1] = numbers[i];
                            }
                            numbersLength--;
                            for (int i = index + 1; i < operandsLength; i++) {
                                operands[i - 1] = operands[i];
                            }
                            operandsLength--;
                            done = false;
                        }
                    }
                }
            }
        }
        result = numbers[0];
        return result;
    }

    public static void main(String[] args) {

        ComplexNumber[] complexNumbers = makeObjects(args);

        for (int i = 0; i < complexNumbers.length; i++) {
            System.out.println(complexNumbers[i].toString());
        }

        System.out.println(makeOperations(args));

        Polygon polygon = new Polygon(complexNumbers);
        System.out.println(polygon.perimetru());
    }
}
