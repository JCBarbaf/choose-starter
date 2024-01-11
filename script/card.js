class Card extends HTMLElement {

    constructor () {
      super()
      this.shadow = this.attachShadow({ mode: 'open' })
      this.pokemon = 'bulbasaur';
    }
  
    connectedCallback () {
      document.addEventListener('choosen', (event => {
        setTimeout(() => {
          this.pokemon = event.detail.pokemon;
          if (this.pokemon == 'picachu') {
            this.pokemon = 'mimikyu';
          }
          this.render();
          this.activateScreen();
        },600);
      }));
      this.render()
    }
  
    render () {
      this.shadow.innerHTML =
      /*html*/`
      <style>
        :host {
          --background-color: rgb(245, 245, 254);
          --footer-color: rgb(238, 64, 53);
          --button-color: rgb(178, 177, 178);
          --name-color: rgb(185, 185, 30);
          --border-color: rgb(88, 88, 90);
          --border-image-color: rgb(160, 208, 224);
          --black: rgb(60,60,60);
          --gradient: linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.1) 100%);
          --border: 0.5rem solid var(--border-color);
        }
        .screen {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          visibility: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.3);
          z-index: 600;
        }
        .screen.active {
          visibility: visible;
        }
        .card {
          width: 60%;
          overflow: hidden;
          border: var(--border);
          border-radius: 2rem;
        }
        .card-main {
          display: flex;
          justify-content: space-around;
          align-items: flex-start;
          padding: 3% 1%;
          background: var(--background-color) var(--gradient);
          border-bottom: var(--border);
        }
        .pokemon-img {
          --size: 25rem;
          width: var(--size);
          height: var(--size);
          margin: 1%;
          background-color: var(--background-color);
          border: var(--border);
          border-color: var(--border-image-color);
          border-radius: 1rem;
          object-fit: cover;
        }
        .text {
          flex: 1;
          margin: 1%;
          color: var(--black);
          font-size: 1.5rem;
        }
        .pokemon-name {
          color: var(--name-color);
          text-transform: capitalize;
        }
        .pokemon-nickname {
          text-transform: capitalize;
        }
        .text h3 {
          margin-bottom: 3%;;
        }
        .rename {
          display: none;
        }
        .rename.active {
          display: block;
        }
        .rename-question {
          display: none;
        }
        .buttons {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20%;
          margin: 3% 0;
        }
        .rename-question.active {
          display: block;
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
        .nickname-input-container {
          display: none;
        }
        .nickname-input-container.active {
          display: block;
        }
        .input-button {
          display: flex;
          justify-content: space-around;
          align-items: stretch;
          gap: 2%;
          margin: 3% 0;
        }
        .input-button input {
          flex: 1;
          padding: 1% 2%;
          background-color: var(--background-color);
          border: var(--border);
          border-color: rgb(0,0,0,0.2);
          border-width: 0.2rem;
          border-radius: 0.2rem;
          font: inherit;
          font-size: 0.75rem;
        }
        .input-button input:focus {
          border-color: rgb(0,0,0,0.3);
          outline: none;
        }
        .input-button button {
          --size: 3rem;
          width: var(--size);
          height: var(--size);
          display: flex;
          justify-content: center;
          align-items: center;
          background: var(--background-color);
          border: var(--border);
          border-color: rgb(0,0,0,0.2);
          border-width: 0.2rem;
          border-radius: 0.2rem;
          font-size: 0.7rem;
        }
        .input-button button:hover {
          border-color: rgb(0,0,0,0.3);
          filter: brightness(1.1);
        }
        .pokemon-info {
          display: none;
        }
        .pokemon-info.active {
          display: block;
          font-weight: bold;
        }
        .pokemon-info span {
          color: inherit;
          font-weight: normal;
        }
        .card-footer {
          height: 20%;
          display: flex;
          justify-content: center;
          background: var(--footer-color) var(--gradient);
        }
        .card-footer a {
          margin: 1% 0;
          padding: 0.5% 5%;
          background: var(--button-color) var(--gradient);
          color: var(--black);
          border: var(--border);
          border-width: 0.2rem;
          border-radius: 2rem;
          text-decoration: none;
        }
        .card-footer a:hover {
          filter: brightness(1.1);
          transform: scale(1.1);
        }
      </style>
      <div class="screen">
        <div class="card">
          <main class="card-main">
              <img class="pokemon-img" src="img/pokemon/${this.pokemon}.webp" alt="Bulbasaur" title="Bulbasaur">
              <div class="text">
                <div class="rename active">
                  <h3>You recived a <span class="pokemon-name">${this.pokemon}</span>!</h3>
                  <div class="rename-question active">
                    <p>Do you want to give <span class="pokemon-name">${this.pokemon}</span> a nickname?</p>
                    <div class="buttons">
                      <div class="button-container">
                        <p class="arrow">►</p>
                        <button class="yes-button">Yes</button>
                      </div>
                      <div class="button-container">
                        <p class="arrow">►</p>
                        <button class="no-button">No</button>
                      </div>
                    </div>
                </div>
                <div class="nickname-input-container">
                    <label for="nickname"><span class="pokemon-name">${this.pokemon}</span>'s nickname?</label>
                    <div class="input-button">
                      <input class="nickname-input" type="text" name="nickname" maxlength="40">
                      <button class="ok-button">OK</button>
                    </div>
                </div>
              </div>
              <div class="pokemon-info">
                <p>Pokémon: <span class="pokemon-name">${this.pokemon}</span></p>
                <p>Name: <span class="pokemon-nickname">${this.pokemon}</span></p>
              </div>
            </div>
          </main>
          <footer class="card-footer">
            <a href="">Choose again</a>
          </footer>
        </div>
      </div>
      `
      const card = this.shadow.querySelector('.card');
      const nameInput = this.shadow.querySelector('.nickname-input');
      card.addEventListener('click', (event) => {
        if (event.target.closest('.yes-button')) {
          this.toggleQuestion();
          this.toggleNameInput();
        }
        if (event.target.closest('.no-button')) {
          this.toggleRename();
          this.toggleInfo();
        }
        if (event.target.closest('.ok-button')) {
          if (nameInput.value) {
            this.changeName(nameInput.value);
          } else {
            this.changeName(this.pokemon);
          }
          this.toggleRename();
          this.toggleInfo();
        }
      });
      nameInput.addEventListener('keyup', (event) => {
        if (event.key == 'Enter') {
          if (nameInput.value) {
            this.changeName(nameInput.value);
          } else {
            this.changeName(this.pokemon);
          }
          this.toggleRename();
          this.toggleInfo();
        }
      });
    }
    activateScreen() {
      const screen = this.shadow.querySelector('.screen');
      screen.classList.add('active');
    }
    toggleRename() {
      const rename = this.shadow.querySelector('.rename');
      rename.classList.toggle('active');
    }
    toggleQuestion() {
      const question = this.shadow.querySelector('.rename-question');
      question.classList.toggle('active');
    }
    toggleNameInput() {
      const inputContainer = this.shadow.querySelector('.nickname-input-container');
      const nameInput = this.shadow.querySelector('.nickname-input');
      inputContainer.classList.toggle('active');
      nameInput.focus();
    }
    toggleInfo() {
      const info = this.shadow.querySelector('.pokemon-info');
      info.classList.toggle('active');
    }
    changeName(name) {
      const nickname = this.shadow.querySelector('.pokemon-nickname');
      nickname.innerHTML = name;
    }
  }
  
  customElements.define('card-component', Card);