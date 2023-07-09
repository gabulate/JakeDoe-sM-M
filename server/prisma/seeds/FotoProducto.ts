import fs from "fs"; //sirve para leer el contenido de un archivo de imagen en bytes y luego se almacena en la base de datos.

export const FotoProductos = [
  //1
  {
    ProductoId: 1,
    Foto: fs.readFileSync("images/midnights.jpg"),
  },
  //2
  {
    ProductoId: 2,
    Foto: fs.readFileSync("images/threeCheers.jpg"),
  },
  //3
  {
    ProductoId: 3,
    Foto: fs.readFileSync("images/slashsGuitar.jpg"),
  },
  //4
  {
    ProductoId: 4,
    Foto: fs.readFileSync("images/424camisa.jpg"),
  },
  //5
  {
    ProductoId: 5,
    Foto: fs.readFileSync("images/plasticBeachVinyl.jpg"),
  },
  //6
  /*{
    ProductoId: 6,
    Foto: fs.readFileSync("images/erasTourPoster.jpg"),
  },*/
];
