class ListItem extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({mode: 'open'});
  }
  connectedCallback() {
    let content = JSON.parse(this.getAttribute('data')).id
    this.shadowRoot.innerHTML=`
      <style>
          .list {
              display: inline-block;
              background-color: green;
              border-radius: 50%;
              vertical-align: middle;
              color: white;
              padding: 15px;
              margin: 15px;
          }
      </style>
      <div class="list">List id = ${content}</list>
      `;
    }
}

function createTree(el){
  customElements.define(el, class extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
          let content = this.returnData(this.getAttribute('data'))
          this.shadowRoot.innerHTML=`<style>
              .branch {
                  background-color: brown;
                  border-style: inset;
                  color: white;
                  padding: 15px;
                  margin: 15px;
              }
          </style>
          <div class='branch'>Branch id = ${JSON.parse(this.getAttribute('data')).id} ${content}</div>`
      }

      returnData(data){
        data = JSON.parse(data)
        if (!data.items) {
            throw new DOMException("Custom-branch doesn't contain items")
        }
        let content = data.items.reduce((accum, item) => {
            let itemStringData = JSON.stringify(item);

            return accum + ((item.items && item.items.length) ?
                `<custom-branch data='${itemStringData}'></custom-branch>` :
                `<custom-list data='${itemStringData}'></custom-list>`)
        }, '');
        return content
      }
    })}

customElements.define("custom-list", ListItem);
createTree('custom-branch');
