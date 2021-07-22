vars n, n1, n2, nextTerm, i
n1 = 0;
n2 = 1;
i = 1;
i = i + 1;
read("Serie Fibonacci, valor de n:", n);
while (i < n) {
    write("n-esimo termino: ", n1);
    nextTerm = n1 + n2;
    n1 = n2;
    n2 = nextTerm;
    i = i + 1;
};