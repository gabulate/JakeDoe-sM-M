import fs from "fs"; //sirve para leer el contenido de un archivo de imagen en bytes y luego se almacena en la base de datos.

export const FotoProductos = [
//1
{
  ProductoId: 1,
  Foto: fs.readFileSync("images/producto1_img1(midnights).jpg"),
},
//2
 {
  ProductoId: 1,
  Foto: fs.readFileSync("images/producto1_img2(midnights).jpg"),
},
//3
{
  ProductoId: 1,
  Foto: fs.readFileSync("images/producto1_img3(midnights).jpg"),
}, 
//4
{
  ProductoId: 2,
  Foto: fs.readFileSync("images/producto2_img1_(3cheers).jpg"),
},
//5
{
  ProductoId: 2,
  Foto: fs.readFileSync("images/producto2_img2_(3cheer).jpg"),
},
//6
{
  ProductoId: 2,
  Foto: fs.readFileSync("images/producto2_img3(3cheers).jpg"),
}, 
//7
{
  ProductoId: 3,
  Foto: fs.readFileSync("images/producto3_img1(slashGuitar).jpg"),
},
//8
{
  ProductoId: 3,
  Foto: fs.readFileSync("images/producto3_img2(slashGuitar).jpg"),
}, 
//9
{
  ProductoId: 4,
  Foto: fs.readFileSync("images/producto4_img1(camisa424).jpg"),
},
//10
{
  ProductoId: 5,
  Foto: fs.readFileSync("images/producto5_img1(beach).jpg"),
},
//11
/* {
  ProductoId: 5,
  Foto: fs.readFileSync("images/producto5_img2(beach).jpg"),
}, */
//12
{
  ProductoId: 6,
  Foto: fs.readFileSync("images/producto6_img1.jpg"),
},
//13
/* {
  ProductoId: 6,
  Foto: fs.readFileSync("images/producto6_img2.jpg"),
}, */
];
