const ProductsWarpper = document.getElementById("ProductsWarpper");
const checkoutWarpper = document.getElementById("checkoutWarpper");

let sumAmount = 0;
let sumPrices = 0;
const DISCOUNT = 10 / 100;

const products = [
  {
    productTitle: "BlackTea",
    productDescription: "a black tea with very cappaned",
    productPrice: 40,
    img: "https://picsum.photos/id/12/150/150",
  },
  {
    productTitle: "YellowTea",
    productDescription: "a Yellow tea with light cappaned and tasty",
    productPrice: 8,
    img: "https://picsum.photos/id/5/150/150",
  },
  {
    productTitle: "greenTea",
    productDescription: "a green tea with very cappaned",
    productPrice: 5,
    img: "https://picsum.photos/id/8/150/150",
  },
];

// example for adding product

products.forEach((product, i) => {
  product.id = ++i;
  ProductsWarpper.appendChild(
    createNewProduct({
      id: ++i,
      title: product.productTitle,
      desc: product.productDescription,
      price: product.productPrice,
      img: product.img,
    })
  );
});


addingNewProduct({
  title: "test",
  desc: "asdasasd",
  price: 19,
  img: "https://picsum.photos/id/11/150/150",
});

// CHECKOUT SECTION

// CHECKOUT BUTTON
const checkoutButton = document.createElement("button");
checkoutButton.type = "button";
checkoutButton.id = "checkoutButton";
checkoutButton.innerHTML = "Checkout";
// CHECKPUT MESSAGE DIV ** Parent
const checkoutMessgage = createElement({
  className: "checkoutMessgage",
  id: "checkoutMessgageID",
});
checkoutMessgage.style.display = "none";
checkoutMessgage.style.backgroundColor = "rgb(52, 177, 166)";
// BLESS DIV
const blessDiv = createElement({ innerHTML: "thank you for buying" });
// TOTAL ANOUNT TEXT
const totalText = createElement({
  tag: "span",
  innerHTML: "total amount of item: ",
});
// SPAN ITEMS AMOUNT
const totalItemsAmount = createElement({
  tag: "span",
  id: "totalItemAmountID",
});
// total Prices Massage
const totalPricesMassage = createElement({
  tag: "span",
  className: "totalPricesMassage",
  id: "totalPricesMassage",
  innerHTML: "total prices is: ",
});
// TOTAL PRICES
const totalPrices = createElement({ tag: "span", className: "totalPrices" });
// DISCOUNT
const calDiscount = createElement({ tag: "span", id: "discount" });
checkoutMessgage.append(
  blessDiv,
  totalText,
  totalItemsAmount,
  totalPricesMassage,
  totalPrices,
  calDiscount
);
checkoutWarpper.appendChild(checkoutButton);
checkoutWarpper.appendChild(checkoutMessgage);

// remove products
const binArray = Array.from(document.getElementsByClassName("bin"));

binArray.forEach((bin) => {
  bin.onclick = () => {
    const parent = bin.parentNode;
    let currProductId = parent.id;
    if (currProductId === bin.id) {
      products.splice(currProductId - 1, 1);
    }
    parent.remove();
  };
});

// FUNCTIONS

// function removeProduct(bin) {
//   console.log("click");
//   let parent =  bin.parentNode;
//   debugger
//   console.log(parent);
// }

function createNewProduct({ title, disc, price, img, id }) {
  // H2
  const currTitle = createElement({
    className: "productTitle",
    innerHTML: title,
  });
  // DISCRIPTION
  const currDiscreption = createElement({ className: "productDescription" });
  currDiscreption.innerHTML = disc;
  //  PRICE
  const currPrice = createElement({
    tag: "span",
    className: "productPrice",
    innerHTML: price,
  });
  // AMOUNT ** Parent
  const currAmount = createElement({ className: "productAmount" }); // newElement("div");
  // AMOUNT SPAN
  const currSpanAmount = createElement({ tag: "span", innerHTML: "Amount" });
  // AMOUNT INPUT
  const currInputAmount = createElement({ tag: "input" });
  currInputAmount.type = "number";
  // ADIING THE TWO ELEMENT TO THE AMOUNT PARENT
  currAmount.appendChild(currSpanAmount);
  currAmount.appendChild(currInputAmount);
  //GAP
  const currGap = createElement({ className: "gap" }); //newElement("div");
  // currGap.style = "display:inline-block;";
  // PRODUCT IMG
  const productIamge = createElement({ className: "productIamge" });
  //IMG
  const currImg = createElement({
    tag: "img",
    className: "images",
    parent: productIamge,
  });
  currImg.src = img;
  // BIN
  // if i want to pass an object as a paramenter in need to put it inside a property
  const bin = createElement({ id: id, className: "bin" });
  // INSERT ALL THE ELEMENT TO TO INFO PRODUCTS
  const productInfo = createElement({
    className: "productInfo",
    children: [currTitle, currDiscreption, currPrice, currAmount],
  });
  // INSERT ALL THE ELEMENT TO DIV PRODUCTS
  const productDiv = createElement({
    id: id,
    className: "product",
    children: [bin, productInfo, currGap, productIamge],
  });
  // productDiv.appendChild(bin);
  // productDiv.appendChild(productInfo);
  // productDiv.appendChild(currGap);
  // productDiv.appendChild(productIamge);
  return productDiv;
}
// create new element with any kind of attributes or tags
// the attr paramter get an object type.
function createElement({
  id,
  className,
  tag = "div",
  innerHTML,
  children,
  parent,
  // attr:{value:{}},
} = {}) {
  let element = document.createElement(tag);
  if (className) {
    element.classList.add(className);
  }
  if (id) {
    element.id = id;
  }
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  if (children) {
    element.append(...children);
  }
  if (parent) {
    parent.appendChild(element);
  }
  // if (attr) {
  //   element.setAttribute(attr.name, attr.value);
  // }

  return element;
}
// ADDING NEW PRODUCT
// TODO: how to add to an array product a new object with a function
function addingNewProduct({ title, desc, price, img }) {
  let lastElement = +products.length;
  debugger
  products.push({
    productTitle: title,
    productDescription: desc,
    productPrice: price,
    img: img,
    id: lastElement,
  });
   return ProductsWarpper.appendChild(createNewProduct({title: title,disc:desc,price: price,img:img,id: lastElement}))
}
console.log(products);
checkoutButton.addEventListener("click", renderCalculation);

function renderCalculation() {
  // let blackTea = products[0].productPrice;
  // let yellowTea = products[1].productPrice;
  // let greenTea = products[2].productPrice;

  const inputs = document.getElementsByTagName("input");
  let arrayInputs = [...inputs];
  checkoutMessgage.style.display = "block";
  console.log(arrayInputs);
  //SUM ITEMS
  arrayInputs.forEach((input, i) => {
    const currInputValue = +input.value;
    sumAmount += currInputValue;
    sumPrices += products[i].productPrice * currInputValue;
  });
  totalItemsAmount.innerHTML = sumAmount + " ";

  // let firstItemAmount = document.getElementById("firstItemAmount");
  // let secoundItemAmount = document.getElementById("secoundItemAmount");
  // let thirdItemAmount = document.getElementById("thirdItemAmount");
  //   Number(firstItemAmount.value) +
  //   Number(secoundItemAmount.value) +
  //   Number(thirdItemAmount.value);
  // sumPrices =
  //   Number(firstItemAmount.value) * blackTea +
  //   Number(secoundItemAmount.value) * yellowTea +
  //   Number(thirdItemAmount.value) * greenTea;

  // adding validation if we add minus

  let totalDiscount = sumPrices - sumPrices * DISCOUNT;
  console.log(sumPrices);
  if (sumAmount > 20 || sumPrices > 100) {
    calDiscount.innerHTML = `the discount is ${totalDiscount} `;
    totalPricesMassage.style.display = "none";
  } 
   if (sumAmount < 50 && sumAmount > 10) {
    console.log(1);
  } 
  if (sumAmount < 10 && (sumAmount > 0 && sumPrices < 100)) {
    console.log(2);
  } 
  //ceck wy nor working
 if (sumAmount === 15 && (sumPrices < 200 && sumPrices > 100)) {
  
    console.log(3);
  } else {
    totalPrices.innerHTML = `${sumPrices}`;
  }
  arrayInputs.forEach((input) => {
    input.value = "";
  });
  sumAmount = 0;
  sumPrices = 0;
}

