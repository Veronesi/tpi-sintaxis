vars val1, val2, sumatoria, val1inical, productoria
read("valor1: ", val1);
read("valor2: ", val2);

productoria = 1;

val1inical = val1;

while(val1 <= val2){
  sumatoria = sumatoria + val1;
  val1 = val1 + 1;
};
write("sumatoria: ", sumatoria);

val1 = val1inical;
while(val1 <= val2){
  productoria = productoria * val1;
  val1 = val1 + 1;
};
write("productoria: ", productoria);