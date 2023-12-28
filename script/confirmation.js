class Confirmation extends HTMLElement {

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
        :host {
            --name-color: rgb(185, 185, 30);
        }
        .confirmation-container {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .confirmation-text {
        }
        .pokemon-name {
            color: var(--name-color);
        }
      </style>
      <div class="confirmation-container">
        <h2 class="confirmation-text">So, you want to choose <span class="pokemon-name">Crabominable</span>?<h2>
        <button class="yes-button">Yes</button>
        <button class="no-button">No</button>
      </div>
      `
    }
  }
  
  customElements.define('confirmation-component', Confirmation);