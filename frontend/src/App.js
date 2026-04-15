
import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api";

function App() {

const [isLoggedIn,setIsLoggedIn] = useState(false);
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [userId,setUserId] = useState(null);

const [cart,setCart] = useState([]);
const [showCart,setShowCart] = useState(false);
const [showPopup,setShowPopup] = useState(false);
const [showQR,setShowQR] = useState(false);

const handleLogin = async () => {

if(!email || !password){
alert("Enter Email & Password");
return;
}

try{

const res = await fetch(`${API_URL}/login`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({email,password})
});

const data = await res.json();

if(res.ok){

setIsLoggedIn(true);
setUserId(data.user.id);
fetchCart(data.user.id);

}else{

alert("Login Failed");

}

}catch(err){

alert("Backend not connected");

}

};

const fetchCart = async(uid)=>{

try{

const res = await fetch(`${API_URL}/cart/${uid}`);
const data = await res.json();

setCart(data || []);

}catch(err){

console.log(err);

}

};


const products = [
{ id:1, name:"Smart Watch", price:7999, image:"https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800" },
{ id:2, name:"Headphones", price:3499, image:"https://images.unsplash.com/photo-1518443895914-6a4b9a5c0d06?w=800" },
{ id:3, name:"Running Shoes", price:4999, image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800" },
{ id:4, name:"Laptop", price:70000, image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800" },
{ id:5, name:"T Shirt", price:1799, image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800" },

{ id:6, name:"Samsung S23", price:19999, image:"https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=800" },
{ id:7, name:"iPhone 14", price:69999, image:"https://images.unsplash.com/photo-1661961112951-f2bfd6a7b9f2?w=800" },
{ id:8, name:"Sony Headphones", price:29999, image:"https://images.unsplash.com/photo-1585386959984-a415522316e0?w=800" },
{ id:9, name:"HP Laptop", price:54999, image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800" },
{ id:10, name:"Boat Headphones", price:1499, image:"https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800" },

{ id:11, name:"Samsung Smart TV", price:32999, image:"https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800" },
{ id:12, name:"Nike Shoes", price:4999, image:"https://images.unsplash.com/photo-1528701800489-20be3c3b9d43?w=800" },
{ id:13, name:"Apple Watch", price:39999, image:"https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800" },
{ id:14, name:"Power Bank", price:1999, image:"https://images.unsplash.com/photo-1609592806596-4d8b6f2f3a7c?w=800" },
{ id:15, name:"Canon Camera", price:41999, image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800" },

{ id:16, name:"Wireless Mouse", price:799, image:"https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800" },
{ id:17, name:"Keyboard", price:2999, image:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=800" },
{ id:18, name:"Air Fryer", price:8999, image:"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800" },
{ id:19, name:"Induction Stove", price:2499, image:"https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800" },
{ id:20, name:"Backpack", price:1899, image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800" },

{ id:23, name:"Tablet", price:21999, image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800" },
{ id:24, name:"Microwave Oven", price:12499, image:"https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800" },
{ id:25, name:"Office Chair", price:6999, image:"https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800" },

{ id:28, name:"Washing Machine", price:18999, image:"https://images.unsplash.com/photo-1626808642875-0aa545482dfb?w=800" },
{ id:29, name:"Printer", price:12999, image:"https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=800" },
{ id:30, name:"External Hard Drive", price:5499, image:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800" },

{ id:34, name:"Coffee Maker", price:5999, image:"https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800" },
{ id:35, name:"Refrigerator", price:25999, image:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800" },

{ id:39, name:"Router", price:2999, image:"https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800" },
{ id:40, name:"Wireless Charger", price:1999, image:"https://images.unsplash.com/photo-1587033411391-5d9e51cce126?w=800" },

{ id:43, name:"Earbuds", price:2999, image:"https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800" },
{ id:45, name:"Gaming Laptop", price:85999, image:"https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800" },

{ id:49, name:"Water Bottle", price:499, image:"https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800" },
{ id:50, name:"Men Casual Shirt", price:1299, image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800" },

{ id:58, name:"Mini Projector", price:8999, image:"https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800" },
{ id:60, name:"VR Headset", price:12999, image:"https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800" },

{ id:62, name:"LED Monitor", price:12999, image:"https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800" },

{ id:68, name:"Fitness Band", price:2999, image:"https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=800" },
{ id:70, name:"Drone Camera", price:25999, image:"https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800" },

{ id:74, name:"Action Camera", price:15999, image:"https://images.unsplash.com/photo-1519183071298-a2962eadc0c7?w=800" },

{ id:78, name:"Security Camera", price:4999, image:"https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800" },

{ id:81, name:"Electric Scooter", price:45999, image:"https://images.unsplash.com/photo-1549921296-3ecf3d7bffb3?w=800" },

{ id:85, name:"Air Purifier", price:12999, image:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800" },

{ id:89, name:"Hair Dryer", price:1999, image:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800" },

{ id:92, name:"Perfume", price:3499, image:"https://images.unsplash.com/photo-1541643600914-78b084683601?w=800" },

{ id:100, name:"Mini Refrigerator", price:8999, image:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800" }
];




const addToCart = async(product)=>{

try{

await fetch(`${API_URL}/cart`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
user_id:userId,
product_id:product.id,
quantity:1
})
});

setShowPopup(true);

setTimeout(()=>{
setShowPopup(false);
},1500);

fetchCart(userId);

}catch(err){

console.log("Cart error",err);

}

};




const removeFromCart = async(productId)=>{

try{

await fetch(`${API_URL}/cart/${userId}/${productId}`,{
method:"DELETE"
});

fetchCart(userId);

}catch(err){

console.log(err);

}

};




const totalAmount = cart.reduce((sum,item)=>sum + Number(item.price),0);



if(!isLoggedIn){

return(

<div style={{
height:"100vh",
display:"flex",
justifyContent:"center",
alignItems:"center",
background:"linear-gradient(135deg,#667eea,#764ba2)"
}}>

<div style={{
background:"white",
padding:"40px",
borderRadius:"12px",
width:"350px",
boxShadow:"0 10px 30px rgba(0,0,0,0.2)"
}}>

<h2 style={{textAlign:"center"}}>Login</h2>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{width:"100%",padding:"10px",marginTop:"15px"}}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{width:"100%",padding:"10px",marginTop:"15px"}}
/>

<button
onClick={handleLogin}
style={{
width:"100%",
marginTop:"20px",
padding:"12px",
background:"#111",
color:"white",
border:"none"
}}
>
Login
</button>

</div>

</div>

);

}




return(

<div style={{fontFamily:"Arial",background:"#f4f4f4",minHeight:"100vh"}}>

{/* Popup */}
{showPopup && (

<div style={{
position:"fixed",
top:"20px",
right:"20px",
background:"green",
color:"white",
padding:"15px 25px",
borderRadius:"8px",
boxShadow:"0 5px 20px rgba(0,0,0,0.3)"
}}>

Item added to cart successfully 

</div>

)}

<header style={{
background:"linear-gradient(90deg,#000,#434343)",
color:"white",
padding:"20px",
textAlign:"center"
}}>

<h1>My Ecommerce Store</h1>

<button
onClick={()=>{

setShowCart(!showCart);

if(!showCart){
fetchCart(userId);
}

}}
style={{marginTop:"10px",padding:"10px 20px"}}
>

{showCart ? "Back to Shop" : `Cart (${cart.length})`}

</button>

</header>


{/* PRODUCTS */}

{!showCart ? (

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
gap:"20px",
padding:"40px"
}}>

{products.map(product=>(

<div
key={product.id}
style={{
background:"white",
borderRadius:"10px",
padding:"15px",
textAlign:"center",
boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
}}
>

<img
src={product.image}
alt={product.name}
style={{width:"100%",height:"180px",objectFit:"cover"}}
/>

<h3>{product.name}</h3>

<p>₹{product.price}</p>

<button
onClick={()=>addToCart(product)}
style={{
background:"#111",
color:"white",
padding:"10px",
border:"none",
borderRadius:"5px"
}}
>

Add to Cart

</button>

</div>

))}

</div>

) : (

<div style={{padding:"40px"}}>

<h2>Your Cart</h2>

{cart.length === 0 ? (
<p>Cart is empty</p>
) : (

cart.map(item=>(

<div
key={item.product_id}
style={{
display:"flex",
justifyContent:"space-between",
background:"white",
padding:"15px",
marginBottom:"10px",
borderRadius:"8px"
}}
>

<div style={{display:"flex",gap:"15px"}}>

<img
src={item.image}
alt={item.name}
style={{width:"70px",height:"70px"}}
/>

<div>

<h4>{item.name}</h4>
<p>₹{item.price}</p>

</div>

</div>

<button
onClick={()=>removeFromCart(item.product_id)}
style={{
background:"red",
color:"white",
border:"none",
padding:"8px 15px",
borderRadius:"5px"
}}
>

Remove

</button>

</div>

))

)}

<h2>Total ₹{totalAmount}</h2>

<button
onClick={()=>setShowQR(true)}
style={{
background:"green",
color:"white",
padding:"12px 30px",
border:"none",
marginTop:"10px",
borderRadius:"6px"
}}
>

Checkout

</button>

</div>

)}


{/* QR PAYMENT */}

{showQR && (

<div style={{
position:"fixed",
top:0,
left:0,
width:"100%",
height:"100%",
background:"rgba(0,0,0,0.6)",
display:"flex",
justifyContent:"center",
alignItems:"center"
}}>

<div style={{
background:"white",
padding:"40px",
borderRadius:"10px",
textAlign:"center"
}}>

<h2>Scan to Pay</h2>

<img
src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?am=${totalAmount}`}
alt="QR"
/>

<p>Pay using PhonePe / Google Pay / Paytm</p>

<button
onClick={()=>setShowQR(false)}
style={{
marginTop:"20px",
padding:"10px 20px"
}}
>
Close
</button>

</div>

</div>

)}

</div>

);

}

export default App;