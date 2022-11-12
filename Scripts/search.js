import {navbar} from "../Components/navbar.js"

let header=document.querySelector("#header")
header.innerHTML=navbar()
// console.log(navbar());
document.getElementById("logo").onclick=()=>{
    window.location.href="index.html" 
}


async function searchTerm(sortLH){

    let search=document.getElementById("mysearch").value;
    try{
        

        let response= await fetch(`https://boiling-brook-19493.herokuapp.com/posts?q=${search}`);

        let data=await response.json();
        // console.log("data:",data)

        // appendData(data);
        filter(data);
    }
    catch(error){
        console.log("error:",error)
    }
}

//filter functionality-->

// let filter_btn=document.getElementById("price_filter");

// filter_btn.addEventListener("change",function(){
//     priceFilter();
// });



function filter(data){
    let search=document.getElementById("mysearch").value;

    let dataArr=[];
    data.forEach((el)=>{
        if(el.category==search){
            dataArr.push(el);
        }
    })
    //console.log(dataArr)
    let sortFunction=document.getElementById("price_filter");
    sortFunction.addEventListener("change", sortLH);

    function sortLH(){
        //console.log("data",dataArr)
        let val=document.getElementById("price_filter").value;
        console.log(val)
        if(val=="high"){
                dataArr.sort((a,b)=>b.price-a.price); 
        }else{
            dataArr.sort((a,b)=>a.price-b.price);
        }
        appendData(dataArr);
        }


    appendData(dataArr);
}

function appendData(data){
    // console.log(data)
    let products_div=document.getElementById("products");

    products_div.innerHTML=null;

    data.forEach((el,i)=>{
        //console.log(el)
        let div=document.createElement("div");
        div.className="card"

        let img=document.createElement("img");
        img.src=el.image;
        img.className="image_s";
        img.addEventListener("click",()=>{
            addToCart(el)
           
            window.location.href="cartproductinfo.html"
        })

        let p_name=document.createElement("p");
        p_name.innerText= el.discount;
        p_name.className="title";

        let p_price=document.createElement("p");
        p_price.innerText=el.price;
        p_price.className="prc"

        let myp_div=document.createElement("div");
        myp_div.className="flex";
        myp_div.append(p_name,p_price)
        div.append(img,myp_div);

        products_div.append(div);

 
    });


}

let searchFun=document.getElementById("mysearch");

searchFun.addEventListener("input",function(){
    debouncing(searchTerm(),1000);
})

let id;

function debouncing(func,delay){

    if(id){
        clearTimeout(id)
    }
    id=setTimeout(function(){

        func();
    },delay)

}

function addToCart(el){

    let cartData=[];
    cartData.push(el);

    localStorage.setItem("cart",JSON.stringify(cartData));

}





   

