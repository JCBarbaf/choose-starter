class StartersContainer extends HTMLElement {

    constructor () {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
    }
  
    connectedCallback () {
      this.render()
    }
  
    render () {
      this.shadow.innerHTML =
      /*html*/`
      <style>
        .starters {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-evenly;
          align-items: center;
          padding: 3%;
        }
        @media screen and (max-width: 550px) {
          .starters {
            margin-top: 5%;
          }
        }
      </style>
      <div class="starters">
        <starter-component pokemon=""></starter-component>
        <starter-component pokemon=""></starter-component>
        <starter-component pokemon=""></starter-component>
      </div>
      `
      const pokemonNames = ['bulbasaur','charmander','squirtle','pikachu','eevee','magikarp','chikorita','cyndaquil','totodile','treecko','torchic','mudkip','turtwig','chimchar','piplup','snivy','tepig','oshawott','chespin','fennekin','froakie','rowlet','litten','popplio','grookey','scorbunny','sobble','sprigatito','fuecoco','quaxly','espeon','umbreon','pichu','ditto','picachu','mewtwo','trubbish'];
      const starterComponents = this.shadow.querySelectorAll('starter-component');
      const usedPokemon = new Set();
      starterComponents.forEach(starter => {
        let randomPokemon; 
        do {
          randomPokemon = Math.floor(Math.random() * pokemonNames.length);
        } while (usedPokemon.has(pokemonNames[randomPokemon]));
        starter.setAttribute('pokemon', pokemonNames[randomPokemon]);
        usedPokemon.add(pokemonNames[randomPokemon]);
      });
    }
  }
  
  customElements.define('starters-container-component', StartersContainer);