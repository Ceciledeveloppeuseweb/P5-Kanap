//redirection de la page produits à la page d'un produit via son id
let productId = new URL(window.location.href).searchParams.get("id"); // on récupére l'id avec les paramétres de l'url
console.log(productId);

//affiche le produit sélectionné grâce à son id

   
fetch("http://localhost:3000/api/products/" +productId)
  .then((response)=> response.json())
  .then((data)=>{let product=data;
    getproductData(product)})
  .catch((error)=>console.log(error));
   //variable fléchée va traiter les données en json pr pouvoir les exploiter
  

  

//affichage des données du produit via l'API
let getProductData = (product) =>{
  getProductImage(product);
  getProductTitle(product);
  getProductPrice(product);
  getProductDescription(product);
  getProductColors(product);
};
getProductData;

//affichage de l'image du produit
let getProductImage = (product) =>{
  document.querySelector(".item__img").innerHTML += `<img src="${product.imageURL} " alt="${product.altTxt} "/>`;
};

//affichage du nom du produit
let getProductTitle = (product) => {
  document.querySelector("#title").innerHTML = product.name;

};

/*let div= document.querySelector(".item__img"); 
let title=document.getElementById("title");
let price=document.getElementById("price");
let description=document.getElementById("description");
let colorsOption=document.getElementById("colors");*/

//fonction avec les informations du produit
/*async function showProduct(){
  await getProduct();//on attend que getProduct soit charger pour effectué showProduct

  let image = document.createElement("img");//création de l'image (img) placée dans sa div
  image.setAttribute('src', product.imageUrl);//insertion de l'image
  image.setAttribute('alt', product.altTxt);
  div.appendChild(image);

  title.innerHTML = product.name;//ajout du nom du produit
  
  price.innerHTML = product.price;//ajout du prix du produit
  

  description.innerHTML = product.description;//ajout de la description du produit

}
showProduct();*/




function showColorProduct(){
    let element=document.getElementById("colors");
    for(let i=0;i<product.colors.length;i++){
      let color=document.createElement("option")
    }
}
 






    




    
    

  





  
   