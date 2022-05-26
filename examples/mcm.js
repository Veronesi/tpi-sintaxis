vars a, b, max, min, mcm, mcd

read("primer numero: ", a);
read("segundo numero: ", b);

mcd = 0;
if(a > b){
    max = a;
    min = b;
}else{
    min = a;
    max = b;
};
while(not [ min = 0 ]){
    mcd = min;
    min = max % min;
    max = mcd;
};
write("Maximo comun Divisor: ", mcd);

if(a > b){
    max = a;
    min = b;
}else{
    min = a;
    max = b;
};
mcm = (max / mcd) * min;
write("Minimo comun Multiplo: ", mcm);