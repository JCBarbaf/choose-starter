class Confirmation extends HTMLElement {

    constructor () {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
      this.pokemon;
    }
  
    connectedCallback () {
      document.addEventListener('choose', (event => {
        this.pokemon = event.detail.pokemon
        this.confirmationControl();
      }));
      this.render();
    }
  
    render () {
      this.shadow.innerHTML =
      /*html*/`
      <style>
        :host {
            --name-color: rgb(185, 185, 30);
        }
        .confirmation-container {
            width: 70rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: auto;
            background: rgb(245, 245, 254) linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.1) 100%);
            color: rgb(60,60,60);
            border: 0.5rem solid rgb(160, 208, 224);
            border-radius: 1rem;
            transform: translateY(200%);
        }
        .confirmation-container.active {
          animation: pop-up 0.3s ease-in forwards;
        }
        .confirmation-text {
          font-weight: normal;
        }
        .pokemon-name {
            color: var(--name-color);
            font-weight: bold;
            text-transform: capitalize;
        }
        .button-container {
          display: flex;
          align-items: center;
          margin: 0 2%;
          font-size: 1.2rem;
        }
        button {
          background: none;
          color: inherit;
          border: none;
          cursor: pointer;
          font: inherit;
        }
        button:focus {
          outline: none;
        }
        .arrow {
          visibility: hidden;
        }
        .button-container:has(button:hover) .arrow, .button-container:has(button:focus) .arrow {
          visibility: visible;
        }
        @keyframes pop-up {
          from {
            transform: translateY(200%);
          }
          to {
            transform: translateY(0%);
          }
        }
      </style>
      <div class="confirmation-container">
        <h2 class="confirmation-text">So, you want to choose <span class="pokemon-name">Crabominable</span>?</h2>
        <div class="button-container">
          <p class="arrow">►</p>
          <button class="yes-button">Yes</button>
        </div>
        <div class="button-container">
          <p class="arrow">►</p>
          <button class="no-button">No</button>
        </div>
      </div>
      `
      const confirmation = this.shadow.querySelector('.confirmation-container');
      confirmation.addEventListener('click', (event) => {
        if (event.target.closest('.yes-button')) {
          document.dispatchEvent(new CustomEvent('choosen', {
            detail: {
              pokemon: this.pokemon
            }
          })); 
          confirmation.classList.remove('active');
        }
        if (event.target.closest('.no-button')) {
          document.dispatchEvent(new CustomEvent('choose', {
            detail: {
              pokemon: ''
            }
          })); 
          confirmation.classList.remove('active');
        }
      });
    }
    confirmationControl() {
      const confirmation = this.shadow.querySelector('.confirmation-container');
      const pokemonName = this.shadow.querySelector('.pokemon-name');
      pokemonName.innerHTML = this.pokemon;
      if (this.pokemon != "") {
        confirmation.classList.remove('active');
        setTimeout(() => {
          confirmation.classList.add('active');
        }, 1)
      } else {
        confirmation.classList.remove('active');
      }
    }
  }
  
  customElements.define('confirmation-component', Confirmation);