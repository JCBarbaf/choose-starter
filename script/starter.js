class Starter extends HTMLElement {

    constructor () {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
      this.pokemon = this.getAttribute('pokemon');
    }
  
    connectedCallback () {
      document.addEventListener('choose', (event => {
        this.removeActive();
      }));
      document.addEventListener('choosen', (event => {
        this.removeActive();
        this.makeChoosen(event.detail.pokemon);
      }));
      this.render()
    }
  
    render () {
      this.shadow.innerHTML =
      /*html*/`
      <style>
        :host {
          --top-part-color: rgb(238, 64, 53);
          --bottom-part-color: rgb(236, 236, 236);
          --middle-part-color: rgb(88, 88, 90);
          --button-color: rgb(178, 177, 178);
          --pokeball-size: 20rem;
          --opening-time: 0.3s;
        }
        .starter-container {
          position: relative;
          color: var(--white);
        }
        .choosen, .not-choosen {
          pointer-events: none;
        }
        .arrow {
          display: block;
          width: 4rem;
          visibility: hidden;
          margin: 0 auto;
          animation: float 2s ease-in-out infinite;
        }
        .starter-container:hover .arrow {
          visibility: visible;
        }
        .pokeball {
          position: relative;;
          width: var(--pokeball-size);
          height: var(--pokeball-size);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 5% auto;
          border: 0.5rem solid var(--middle-part-color);
          border-radius: 50%;
          box-shadow: 0.5rem 0.5rem 0 0 rgb(0,0,0,0.2);
          transform-origin: 50% 100%;
        }
        .pokeball:hover {
          animation: pokeball-shake 0.5s ease-in-out forwards;
        }
        .choosen .pokeball {
          filter: brightness(0.5);
        }
        .star {
          width: 3rem;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          visibility: hidden;
          margin: auto;
          z-index: 500;
        }
        .choosen .star {
          visibility: visible;
          animation: star 0.3s ease-in forwards;
        }
        .star:nth-of-type(1) {
          --initial-x: -10rem;
          --final-x: -11rem;
          --initial-y: -8rem;
          --final-y: -9rem;
          --initial-rotation: -35deg;
          --final-rotation: -40deg;
          --initial-scale: 2;
          --final-scale: 2.2;
        }
        .star:nth-of-type(2) {
          --initial-x: 0rem;
          --final-x: 0rem;
          --initial-y: -11rem;
          --final-y: -12rem;
          --initial-rotation: 2deg;
          --final-rotation: 5deg;
          --initial-scale: 0.5;
          --final-scale: 0.7;
        }
        .star:nth-of-type(3) {
          --initial-x: 9rem;
          --final-x: 10rem;
          --initial-y: -8rem;
          --final-y: -9rem;
          --initial-rotation: 20deg;
          --final-rotation: 24deg;
          --initial-scale: 1;
          --final-scale: 1.3;
        }
        @keyframes star {
          0% {
            transform: translate(var(--initial-x),var(--initial-y)) rotate(var(--initial-rotation)) scale(var(--initial-scale));
            opacity: 1;
          }
          100% {
            transform: translate(var(--final-x),var(--final-y)) rotate(var(--final-rotation)) scale(var(--final-scale));
            opacity: 0;
          }
        }
        .top-part {
          flex: 1;
          background: var(--top-part-color) linear-gradient(150deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.2) 100%);
        }
        .bottom-part {
          flex: 1;
          background: var(--bottom-part-color) linear-gradient(150deg, rgba(255,255,255,0.2) 0%, rgba(0, 0, 0, 0.2) 80%, rgba(0,0,0,0.2) 100%);
        }
        .middle-part {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          height: 5%;
          margin: auto;
          background-color: var(--middle-part-color);
        }
        .middle-circle {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          --size: 30%;
          width: var(--size);
          height: var(--size);
          margin: auto;
          background-color: var(--middle-part-color);
          border-radius: 50%;
        }
        .pokeball-button {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          --size: 20%;
          width: var(--size);
          height: var(--size);
          display: flex;
          justify-content: center;
          align-items: center;
          margin: auto;
          background: var(--button-color) linear-gradient(150deg, rgba(255,255,255,0.2) 0%, rgba(0, 0, 0, 0.2) 90%, rgba(0,0,0,0.2) 100%);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          transition-property: width height;
          transition: var(--opening-time) ease-in;
        }
        .pokeball-button:hover {
          transform: scale(1.1);
        }
        .starter-container.active .pokeball-button {
          --size: 100%;
        }
        .starter-image {
          --size: 0%;
          --final-size: 50%;
          width: var(--size);
          height: var(--size);
        }
        .starter-container.active .starter-image {
          animation: pokemon-reveal 0.3s var(--opening-time) ease-in forwards;
        }
        .pokemon-name {
          opacity: 0;
          text-align: center;
          text-transform: capitalize;
        }
        .starter-container.active .pokemon-name {
          animation: name-reveal 0.6s var(--opening-time) ease-in forwards;
        }
        @keyframes pokemon-reveal {
          0% {
              width: 0%;
              height: 0%;
          }
          100% {
              width: var(--final-size);
              height: var(--final-size);
          }
        }
        @keyframes name-reveal {
          0% {
              opacity: 0;
          }
          100% {
              opacity: 1;
          }
        }
        @keyframes float {
          0% {
              transform: translateY(10%);
          }
          50% {
              transform: translateY(-10%);
          }
          100% {
              transform: translateY(10%);
          }
        }
        @keyframes pokeball-shake {
          0% {
              transform: rotate(0deg);
          }
          33% {
              transform: rotate(20deg);
          }
          66% {
              transform: rotate(-20deg);
          }
          100% {
              transform: rotate(0deg);
          }
        }
        @media screen and (max-width: 550px) {
          :host {
            --pokeball-size: 8rem;
          }
          .arrow {
            display: none;
          }
          .pokemon-name {
            font-size: 0.7rem;
          }
        }
      </style>
      <div class="starter-container">
        <svg class="arrow" viewBox="0 0 142 167" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M97 2H44V89.75H4.31604L71 164L137.684 89.75H97V2Z" fill="#4098D7"/>
            <path d="M97 2H44V89.75H4.31604L71 164L137.684 89.75H97V2Z" fill="url(#paint0_linear_1_18)" fill-opacity="0.2"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M42.5 0.5H98.5V88.25H141.047L71 166.245L0.952759 88.25H42.5V0.5ZM45.5 3.5V91.25H7.67934L71 161.755L134.321 91.25H95.5V3.5H45.5Z" fill="#F8EFED"/>
            <defs>
            <linearGradient id="paint0_linear_1_18" x1="4" y1="90" x2="138" y2="90" gradientUnits="userSpaceOnUse">
            <stop stop-color="white"/>
            <stop offset="0.397941" stop-color="white"/>
            <stop offset="0.555282"/>
            <stop offset="1"/>
            </linearGradient>
            </defs>
        </svg>
        <img class="star" src="img/star.svg">
        <img class="star" src="img/star.svg">
        <img class="star" src="img/star.svg">
        <div class="pokeball">
            <div class="top-part"></div>
            <div class="bottom-part"></div>
            <div class="middle-part"></div>
            <div class="middle-circle"></div>
            <button class="pokeball-button">
              <img src="img/pokemon/${this.pokemon}.webp" alt="${this.pokemon}" title="${this.pokemon}" class="starter-image">
            </button>
        </div>
        <h2 class="pokemon-name">${this.pokemon}</h2>
      </div>
      `
      const button = this.shadow.querySelector('.pokeball-button');
      const starter = this.shadow.querySelector('.starter-container');
      button.addEventListener('click', () => {
          if (!starter.classList.contains('active')) {
            document.dispatchEvent(new CustomEvent('choose', {
                detail: {
                    pokemon: this.pokemon
                }
            }));
            starter.classList.add('active');
        } else {
            document.dispatchEvent(new CustomEvent('choose', {
                detail: {
                    pokemon: ''
                }
            }));          
        }
      });
    }
    removeActive() {
      const starter = this.shadow.querySelector('.starter-container');
      starter.classList.remove('active');
    }
    makeChoosen(pokemon) {
      const starter = this.shadow.querySelector('.starter-container');
      const button = this.shadow.querySelector('.pokeball-button');
      button.disabled = true;
      if (pokemon == this.pokemon) {
        starter.classList.add('choosen');
      } else {
        starter.classList.add('not-choosen');
      }
    }
  }
  
  customElements.define('starter-component', Starter);