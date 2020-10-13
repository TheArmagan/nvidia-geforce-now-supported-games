const app = new Vue({
    el: "#vue-app",
    data: {
        allGames: [],
        filteredGames: [],
        filterText: "",
        topText: "GeForce NOW",
        isInSearchMode: false
    },
    mounted: async function () {
        let self = this;
        let games = await fetch("https://static.nvidiagrid.net/supported-public-game-list/gfnpc.json").then(i=>i.json());
        games = games.filter(i=>i.title);
        this.allGames.push(...games);
        this.filteredGames.push(...games);
        
        function __loop_topText() {
            self.topText = "GeForce NOW";
            setTimeout(()=>{
                self.topText = `<span style="font-size: 1.6rem; line-height: 2rem">Supported Games</span>`;
                setTimeout(()=>{
                    __loop_topText();
                }, 3000);
            }, 3000);
        };
        __loop_topText()

        M.AutoInit();
        M.updateTextFields();

        setTimeout(()=>{
            requestAnimationFrame(()=>{
                document.body.classList.remove("hidden");
            })
        },10);
    },
    updated: function () {
        M.updateTextFields();
    },
    methods: {
        onSearchInput: _.debounce(function(e){
            this.filterText = e.target.value;
        }, 500)
    },
    watch: {
        filterText: function (newVal, oldVal) {
            let results = this.allGames.filter(i=>{
                let result = false;
                result = result || i.title.toLowerCase().startsWith(newVal.toLowerCase());
                result = result || i.title.toLowerCase().includes(newVal.toLowerCase());
                result = result || i.publisher.toLowerCase().startsWith(newVal.toLowerCase());
                result = result || i.publisher.toLowerCase().includes(newVal.toLowerCase());

                return result;
            });

            this.filteredGames = results.sort((a,b)=>a-b);
        }
    }
})