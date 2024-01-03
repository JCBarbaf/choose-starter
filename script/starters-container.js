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
          justify-content: space-evenly;
          align-items: center;
          padding: 3%;
        }
      </style>
      <div class="starters">
        <starter-component pokemon=""></starter-component>
        <starter-component pokemon=""></starter-component>
        <starter-component pokemon=""></starter-component>
      </div>
      `
      const pokemonNames = ['bulbasaur','charmander','squirtle','eevee','pikachu'];
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