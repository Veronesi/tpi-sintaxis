vars Elem, Primero, I
read("Ingresar un numero: ", Elem);
I = 0;
while (Elem > 0 and Elem < 30) {
    read("nuevo valor de Elem: ", Elem);
    if (I = 0) {
        Primero = Elem;
    };
    I = I + 1;
};
if (Elem = 0) {
    write("la cantidad de numeros ingresados fue: ", I);
} else {
    write("el primero ingresado fue ", Primero);
};