# Complex-Numbers

Se citesc, ca parametri in linia de comanda, mai multe numere complexe de forma a+b*i si un operator (+, -, *, /).
1. Sa se verifice daca parametri cititi in linia de comanda, separati prin spatiu, reprezinta o expresie aritmetica de forma:
      n1 op n2 op n3 … op nK, unde n1, n2, nk sunt numere complexe de forma a+bi, iar op este operatorul dat.
    Exemplu: 2+3i + 5-6i + i + -2+i
             args[0]= 2+3i, args[1]= +, args[2]= 5-6i, args[3]= +, args[4]= i, args[5]=-2+i
2. Daca parametri cititi in linia de comanda reprezinta o expresie aritmetica de forma descrisa la punctul 1, se cere sa se afiseze rezultatul acestei expresii.
3. Considerand ca cele k numere citite sunt varfurile unui poligon in plan, sa se determine perimetrul poligonului.
Obs. Se vor define clasele NumarComplex si Poligon (care agrega un vector de numere complexe). Se vor folosi metode cu numar variabil de parametri.
