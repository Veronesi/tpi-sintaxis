vars n1, n2, n3, n4, n5, n6, n7, n8, n9, xval, seguir, tesoro
n1 = 1;
n2 = 2;
n3 = 3;
n4 = 4;
n5 = 5;
n6 = 6;
n7 = 7;
n8 = 8;
n9 = 9;
seguir = 1;
tesoro = 4;

write("  1  |  2  |  ", n3);
write("  4  |  5  |  ", n6);
write("  7  |  8  |  ", n9);

while(seguir = 1){
  read("X: elige una casilla: 1..9: ", xval);
  if(tesoro = xval){
    seguir = 0;
    write("ganaste! el tesoro estaba en la casilla ", tesoro);
  }else{
    if(xval = 1){
      n1 = 0;
    };
    if(xval = 2){
      n2 = 0;
    };
    if(xval = 3){
      n3 = 0;
    };
    if(xval = 4){
      n4 = 0;
    };
    if(xval = 5){
      n5 = 0;
    };
    if(xval = 6){
      n6 = 0;
    };
    if(xval = 7){
      n7 = 0;
    };
    if(xval = 8){
      n8 = 0;
    };
    if(xval = 9){
      n9 = 0;
    };

    if([ n1 = 0 ] and [ n2 = 0 ]){
      write(" 0 | 0 | ", n3);
    }else{
      if(n1 = 0){
        write(" 0 | 2 | ", n3);
      };

      if(n2 = 0){
        write(" 1 | 0 | ", n3);
      };
      if(not [ n1 = 0 or n2 = 0 ]){
        write(" 1 | 2 | ", n3);
      };
    };

    if([ n4 = 0 ] and [ n5 = 0 ]){
      write(" 0 | 0 | ", n6);
    }else{
      if(n4 = 0){
        write(" 0 | 5 | ", n6);
      };

      if(n5 = 0){
        write(" 4 | 0 | ", n6);
      };
      if(not [ n4 = 0 or n5 = 0 ]){
        write(" 4 | 5 | ", n6);
      };
    };

    if([ n7 = 0 ] and [ n8 = 0 ]){
      write(" 0 | 0 | ", n9);
    }else{
      if(n7 = 0){
        write(" 0 | 8 | ", n9);
      };

      if(n8 = 0){
        write(" 7 | 0 | ", n9);
      };
      if(not [ n7 = 0 or n8 = 0 ]){
        write(" 7 | 8 | ", n9);
      };
    };

  };
};