
window.onload = async function(){
    
    const response = await fetch("http://localhost:3000/getSketches")
    const data = await response.text()
    console.log(data);
}