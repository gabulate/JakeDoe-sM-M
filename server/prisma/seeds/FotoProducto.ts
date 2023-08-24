import fs from "fs"; //sirve para leer el contenido de un archivo de imagen en bytes y luego se almacena en la base de datos.

export const FotoProductos = [
  //1
  {
    ProductoId: 1,
    Foto: fs
      .readFileSync("images/producto1_img1(midnights).jpg")
      .toString("base64"),
  },
  //2
  {
    ProductoId: 1,
    Foto: fs
      .readFileSync("images/producto1_img2(midnights).jpg")
      .toString("base64"),
  },
  //3
  {
    ProductoId: 1,
    Foto: fs
      .readFileSync("images/producto1_img3(midnights).jpg")
      .toString("base64"),
  },
  //4
  {
    ProductoId: 2,
    Foto: fs
      .readFileSync("images/producto2_img1_(3cheers).jpg")
      .toString("base64"),
  },
  //5
  {
    ProductoId: 2,
    Foto: fs
      .readFileSync("images/producto2_img2_(3cheer).jpg")
      .toString("base64"),
  },
  //6
  {
    ProductoId: 2,
    Foto: fs
      .readFileSync("images/producto2_img3(3cheers).jpg")
      .toString("base64"),
  },
  //7
  {
    ProductoId: 3,
    Foto: fs
      .readFileSync("images/producto3_img1(slashGuitar).jpg")
      .toString("base64"),
  },
  //8
  {
    ProductoId: 3,
    Foto: fs
      .readFileSync("images/producto3_img2(slashGuitar).jpg")
      .toString("base64"),
  },
  //9
  {
    ProductoId: 4,
    Foto: fs
      .readFileSync("images/producto4_img1(camisa424).jpg")
      .toString("base64"),
  },
  //10
  {
    ProductoId: 5,
    Foto: fs
      .readFileSync("images/producto5_img1(beach).jpg")
      .toString("base64"),
  },
  //11
  {
    ProductoId: 5,
    Foto: fs
      .readFileSync("images/producto5_img2(beach).jpg")
      .toString("base64"),
  },
  //12
  {
    ProductoId: 6,
    Foto: fs.readFileSync("images/producto6_img1.jpg").toString("base64"),
  },
  //13
  {
    ProductoId: 6,
    Foto: fs.readFileSync("images/producto6_img2.jpg").toString("base64"),
  },
  //14
  {
    ProductoId: 7,
    Foto: fs.readFileSync("images/producto7_img1.jpg").toString("base64"),
  },
  //15
  {
    ProductoId: 7,
    Foto: fs.readFileSync("images/producto7_img2.jpg").toString("base64"),
  },
  //16
  {
    ProductoId: 8,
    Foto: fs.readFileSync("images/producto8_img1.jpg").toString("base64"),
  },
  //17
  {
    ProductoId: 8,
    Foto: fs.readFileSync("images/producto8_img2.jpg").toString("base64"),
  },
  //18
  {
    ProductoId: 9,
    Foto: fs.readFileSync("images/producto9_img1.jpg").toString("base64"),
  },
  //19
  {
    ProductoId: 10,
    Foto: fs.readFileSync("images/producto10_img1.jpg").toString("base64"),
  },
];
