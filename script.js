
const add = document.querySelector("#Add");
const form = document.querySelector("#form");
const clse = document.querySelector(".close");
const proddiv = document.querySelector(".products");

const prodarr =JSON.parse(localStorage.getItem("products")) ||[];
let editIndex = null;

let ui = () => {
    proddiv.innerHTML = "";

    prodarr.forEach((element, index) => {
        proddiv.innerHTML += `
            <div class="product-card">
                <div class="image">
                    <img src="${element.image}" alt="${element.productname}">
                </div>

                <div class="text">
                    <h3>${element.productname}</h3>
                    <p>${element.discription}</p>
                    <p>₹${element.price}</p>
                </div>

                <div class="btns">
                    <button onclick="updateproduct(${index})">Update</button>
                    <button onclick="deleteProduct(${index})">Delete</button>
                </div>
            </div>
        `;
    });
};

add.addEventListener("click", () => {
    editIndex = null;
    form.reset();
    form.style.display = "flex";
});

clse.addEventListener("click", () => {
    form.style.display = "none";
});

form.addEventListener("submit", (event) => {

    event.preventDefault();

    let productname = event.target[1].value;
    let price = event.target[2].value;
    let discription = event.target[3].value;
    let image = event.target[4].value;

    if (
        productname.trim() === "" ||
        discription.trim() === "" ||
        price.trim() === "" ||
        image.trim() === ""
    ) {
        alert("Please Fill All Fields");
        return;
    }

    let obj = {
        productname,
        discription,
        price,
        image
    };

    if (editIndex === null) {
        prodarr.push(obj);
        localStorage.setItem("products",JSON.stringify(prodarr))
    } else {
        prodarr[editIndex] = obj;
             

        editIndex = null;
           localStorage.setItem("products",JSON.stringify(prodarr))
    }

    ui();

    form.reset();
    form.style.display = "none";
});

function deleteProduct(index) {
    prodarr.splice(index, 1);
            localStorage.setItem("products",JSON.stringify(prodarr))

    ui();
}

function updateproduct(index) {

    editIndex = index;

    let products = prodarr[index];

    form.style.display = "flex";

    form[1].value = products.productname;
    form[2].value = products.price;
    form[3].value = products.discription;
    form[4].value = products.image;

    
}
ui();