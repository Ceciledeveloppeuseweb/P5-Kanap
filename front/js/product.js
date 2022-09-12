

//redirection de la page produits à la page d'un produit via son id
let productId = new URL(window.location.href).searchParams.get("id"); // on récupére l'id avec les paramétres de l'url
//on récupère l'URL de la page active et on extrait l'ID
let nameProduct = document.querySelector("title");//balise du HEAD pointée
let title = document.getElementById("title");//je pointe la balise
let price = document.getElementById("price");//je pointe la balise
let description = document.getElementById("description");//je pointe la balise
let colorsElements = document.getElementById("colors");//je pointe la balise

let quantity = document.querySelector("#quantity");//je pointe la balise


//récupération des données de l'API avec méthode fetch et répartition des infos dans les balises attribuées
//affichage du produit sélectionné grâce à son id
async function getProduct() {
  await fetch("http://localhost:3000/api/products/" + productId)  //donne une promesse
    .then((response) => response.json() //promesse qui formate la réponse en response json
    .then((product) => {
        document.querySelector(".item__img").innerHTML = `<img src=${product.imageUrl}  alt=${product.altTxt} />`;
        title.innerHTML = product.name;//instruction sur l'élément pointé
        //console.log(title);
        nameProduct.innerHTML = product.name;//pour afficher le nom du produit ds l'onglet
        price.innerHTML = product.price;//instruction sur l'élément pointé
        //console.log(price);
        description.innerHTML = product.description;//instruction sur l'élément pointé
        product.colors.forEach(color => {     //instruction sur l'élément pointé
          colorsElements.insertAdjacentHTML('beforeend', `<option value="${color}">${color}</option>`);
          //console.log(color);
        });
        quantity.addEventListener("input", (e) =>{
          quantity.innerHTML = e.target.value;//la valeur entrée est injectée ds l'input
        });
      })) 
    .catch((err) => console.log(`Erreur : ` + err));  //si l'appel à l'Url(1er .then) plante
  };
  getProduct();
        
        
  let basket = [];
  //creér un panier dans le localstorage
  function saveBasket(basket){
    localStorage.setItem("basket", JSON.stringify(basket));
  };// prend le parametre(basket) et utilise la fct localstorage pr ajouter ds le panierqqch
  
  //obtenir le panier du localestorage
  /*function getBasket(){
    let basket = JSON.parse(localStorage.getItem("basket"));
    if(basket != null){
      return basket;
    }else{
      return [];
    }
  };*/
  //*************************************** */
  function getBasket(){
    let basket = localStorage.getItem('basket');
    return basket ? JSON.parse('basket'):[];
  };
  //************************************ */
  //ajouter dans le panier en prenant l'identifiant(id) du produit et ses descriptions
  function addToBasket(){
     let basket = getBasket();
     let btn = document.querySelector("#addToCart");
     //évènement déclenché au clic
     btn.addEventListener("click", () =>{
      let color = colorsElements.value;//on récupère la valeur de la couleur et l'on met dans une variable nommée color
      let quantityArticle = quantity.value;
      //récupérer la valeur de la couleur sélectionnée et envoyer la quantité et la couleur sélectionnée du produit
     //la quantité doit être entre 1 et 100 et positive
      saveBasket();
      if(quantityArticle>0 && quantityArticle<=100 && color != undefined){ //récup des variables=plus parlant
       //on ajoute le pdt ds le panier que si qté >0 et <100 et couleur définie
        console.log(productId);
        console.log(quantityArticle);
        console.log(color);
        basket.push({
         "id" : productId,
         "color" : color,
         "quantity" : quantityArticle
        });//je prends le pdt rassemblé( 3 éléments) et je les envoie dans le panier
        saveBasket(basket);//on appelle le nx panier
      }else{
        alert("Veuillez saisir une quantité et une couleur du produit")
      };
     saveBasket(basket);
     
    });
    // let product = basket.find(p => p.id == id);
    //  if(product != undefined){
    //   product.quantity ++;
    //  }else{
    //   product.quantity = 1;
    //   basket.push(product);
    //  }
    //  saveBasket;
  };
 // getBasket();

  /* function numberElementsOfProduct() {
    let elements = 8;
    let basket = getBasket();
    if( elements>=8){
      getBasket.clear;
    }
  }; */
    
    

     
     
      
        
       
        
        
    








    
   
 /*function getQuantityOfProduct(){
  let basket = getBasket();//on récupère le panier
  console.log(basket);
  //let color = colorsElements.value;
  //let quantityArticle = quantity.value
  
  let product = basket.find(product => product.id == productId);
  if(quantityArticle != undefined && color != undefined){
    product ++;
  };
  saveBasket();
  console.log(product);

 

};
getQuantityOfProduct;*/
         


/*let product = basket.find(product => product.id == productId);
    if(quantityArticle != undefined && color != undefined){
      product ++;
    };*/


    
      
    
      

    
    
    
     
      
    
  
  










        
       
        

        
       


































