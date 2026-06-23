(()=>{
    const y = new Date().getFullYear();
    document.querySelector("footer>.copyright").textContent = "Created by Nguyenhx © 2026" + (y>2026?` - ${y}`:"");
})();