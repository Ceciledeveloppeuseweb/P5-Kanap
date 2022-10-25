
// methode fetch => requête aupres de l'API pour récupérer tous les produits
  fetch("http://localhost:3000/api/products")
  .then( data => data.json())
  .then((datas) => addProducts(datas))// les produits sont dans addProducts avec datas en paramètre
  
  
  //fonction qui va récupérer les données depuis le fetch(grâce au paramètre kanaps représentant les objets de l'API fournis ds les datas)
  //la fonction va créer pour chaque élément : un lien, un article kanap, une image, un altTxt et une description
  //va ensuite lier les éléments à un article kanap => appel de la fonction appenElementsToKanap
  //puis va lier l'article Kanap à l'anchor/ancre(lien a) => appel de la fonction appendKanapToArticle
  function addProducts(kanaps) {
    kanaps.forEach((kanap) => {
      const { _id, imageUrl, altTxt, name, description } = kanap;// => variables sur les clés de l'objet = destructuring
      const anchor = makeAnchor(_id);
      const article = document.createElement("article");
      const image = makeImage(imageUrl, altTxt);
      const h3 = makeH3(name);
      const p = makeParagraph(description);
      appendElementsToArticle(article, [image, h3, p] );// array en parametre pr la fonction suivante
      appendArticleToAnchor(anchor, article);
    });
  };
  
  
  // fonction avec boucle qui va append les 3 éléments du array(image, h3 et p dans article)
  function appendElementsToArticle(article, array) {
    array.forEach((item) => {//pr chacun des éléments : image,h3 et p
      article.appendChild(item) // remplace la suite : =>
    })
    // article.appendChild(image);
    // article.appendChild(h3);
    // article.appendChild(p)
  };
  

  
// fonction qui créé le lien et son attribut href
  function makeAnchor(id) {
    const anchor = document.createElement("a");
    anchor.href = "./product.html?id=" + id;
    return anchor;// => un return pour le appendchild
  };

  // fonction qui va append l'article dans le lien(a) et le lien dans la section si existante
  function appendArticleToAnchor(anchor, article) {
    const items = document.getElementById("items");
    if(items != null) {
      items.appendChild(anchor);
      anchor.appendChild(article);
    }
  };

  //fonction qui créee l'image avec ses attributs src et alt qui récup les données imageUrl et altTxt (depuis l'API)
  function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = altTxt;
    return image; //=> un return pour le append
  };

 //fonction qui créé un h3 avec dedans le "name" (récup de l'API) et une class
  function makeH3(name) {
    const h3 = document.createElement("h3");
    h3.textContent = name;
    h3.classList.add("productName")
    return h3;//pr le appenchild
    
  };

  //fonction qui créé un paragraphe pour la description (description en contenu = textContent) et une class
  function makeParagraph(description) {
    const p = document.createElement("p");
    p.textContent = description;
    p.classList.add("productDescription");
    return p

  };
    
    
   
  // ****************************************************************************************** //
  //                            AUTRE METHODE :   

  //variable de mon tableau de produits
  //let products = [] ;
  //fonction fetch qui permet de récupérer les éléments de l'API
  // fetch("http://localhost:3000/api/products")
  //    .then( data => data.json())
  //    .then(ListProducts => {
  //     //boucle qui prend la liste de tous les produits
  //     for(let product of ListProducts){
      //ma variable qui represente un produit de la liste puis le 2eme, puis le 3eme...   
          //insertion de l'élément article ds le HTML
          // document.querySelector(".items").innerHTML +=  `<a href="./product.html?id=${product._id}">
          //                                                    <article>
          //                                                      <img src="${product.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
          //                                                      <h3 class="productName">${product.name}</h3>
          //                                                      <p class="productDescription">${product.description}</p>
          //                                                    </article>
          //                                                 </a>` 
         
    //   }
    //  })

  




    


  

  


