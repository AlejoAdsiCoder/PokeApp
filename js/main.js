    $(document).ready(() => {

        let filters = getFilters();

        console.log("filtros: " + JSON.stringify([filters]))

        getPokemons(filters);
        renderColors();

        $(".filter-option").change((e) => {
            console.log(e);
            e.stopImmediatePropagation();
            for (let filter of Object.keys(filters)) {
                console.log(filter)
                if (e.target.attributes[filter]) {
                    
                    filters = updateFilters(
                        filters,
                        filter,
                        e.target.attributes[filter].value,
                        e.target.checked
                    );
                }
            }

            getPokemons(filters);
        });
        
    })

    


    function getFilters() {
        const filters = Array.from($("[filter]")).map(
            
            (el) => el.attributes.filter.value,
        );

        const dict = {};
        
        filters.forEach((filter) => {
            dict[filter] = [];
            console.log(dict)
        });


        return dict;
    }

    let types =  document.querySelector(".types");
    let products = document.querySelector(".products");

    function createTemplate(product) {
        return `
        <div class="col-md-4 mb-5">
        <div >
            <div class="view zoom overlay rounded z-depth-2" style="height: 260px;">
            <img class="img-fluid w-100"
                src="${renderSprite(product.url)}" alt="Sample">
            <a href="#!">
                <div class="mask">
                <img class="img-fluid w-100"
                    src="${product.url}">
                <div class="mask rgba-black-slight"></div>
                </div>
            </a>
            </div>
            <div class="text-center pt-4">
            <h5>${product.name}</h5>
            </div>
        </div>
        </div>
        `;
    }

    function renderSprite(pokeId) {
        const newUrl = pokeId.split('/');
        const id = newUrl[newUrl.length - 2];

        return `
            https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png
        `
    }

    function getPokemons() {
        fetch('https://pokeapi.co/api/v2/pokemon')
            .then(response => response.json())
            .then(json => renderPokemons(json.results))
    }

    function renderPokemons(pokes) {
        const template =
        pokes.length === 0 ? `
        <p>No matching results found.</p>
        ` : pokes.map((pok) => createTemplate(pok)).join("\n");
        products.innerHTML = template;
    }

    function renderColors() {
        let colors = [];

        $.get("https://pokeapi.co/api/v2/pokemon-color", (poke) => {
            colors.push(poke)
        })
        .fail(() => { console.log("error"); 
        }); 

        console.log(colors);
    }

    function updateFilters(filters, filter, option, value) {

        

        
        // await fetch('https://pokeapi.co/api/v2/pokemon-color')
        //     .then(response => response.json())
        //     .then(json => colors.push( json.results[0].name ))
        
        // console.log(colors)

        console.log(filters)
        const dict = { ...filters };
        if (filter === "gender") {
            dict.price = [option];
            console.log(dict.price)
        } else if (filter === "color") {
            dict.color = [option];
            console.log(dict.color)
        } else if (value && filters[filter].indexOf(option) === -1)
            dict[filter].push(option);
        else if (!value)
            dict[filter] = dict[filter].filter((entry) => entry !== option);

        return dict;
    }   
