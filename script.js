let supportedList = document.querySelector(".supported-list");
fetch("https://static.nvidiagrid.net/supported-public-game-list/gfnpc.json").then(i=>i.json()).then(json=>{
    document.querySelector(".total-supported-games .value").innerHTML = json.length;
    json.forEach(data => {
        let div = document.createElement("div");
        div.classList.add("list-item");
        if (data.isFullyOptimized) div.classList.add("li-fully-optimized");
        if (data.steamUrl) div.classList.add("li-steam-game");
        div.innerHTML = `
            <p class="li-title">${data.title}</p>
            <p class="li-publisher">${data.publisher}</p>
            <p class="li-support-state">${!data.isFullyOptimized ? "Not " : ""}Fully Optimized</p>
            ${data.steamUrl ? `<div class="li-steam-button"><a href="${data.steamUrl}"><img width="18" src="./steam_logo.png" /></a></div>` : ""}
        `;
        supportedList.appendChild(div);
    });
})