document.addEventListener("DOMContentLoaded", () => {
  const charList = document.getElementById("char-list");    
    
    fetch("https://cdn.jsdelivr.net/gh/Randymaulana03/mywaifu-Project@main/data-karakter.json")
      .then(res => res.json())
      .then(data => {
        const list = document.getElementById("char-list");
        data.forEach(char => {
          const card = document.createElement("a");
          card.href = `profil.html?id=${char.id}`;
          card.className = "card";
          card.innerHTML = `
            <img src="${char.thumbnail}" alt="${char.nama}">
            <h3>${char.nama}</h3>
            <p>${char.anime}</p>
          `;
          list.appendChild(card);
        });
      })
      .catch(err => {
        console.error("Gagal memuat karakter:", err);
      });


  


  
})

