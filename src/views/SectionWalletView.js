/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'

const scripts = [

]

let Controller

class SectionWalletView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/SectionWalletController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = SectionWalletView

        return Controller
      }

      throw e
    }
  }

  componentDidMount() {
    /* View has no WebFlow data attributes */

    scripts.concat(null).reduce((active, next) => Promise.resolve(active).then((active) => {
      const loading = active.loading.then((script) => {
        new Function(`
          with (this) {
            eval(arguments[0])
          }
        `).call(window, script)

        return next
      })

      return active.isAsync ? next : loading
    }))
  }

  render() {
    const proxies = SectionWalletView.Controller !== SectionWalletView ? transformProxies(this.props.children) : {
      'sock-address': [],
      'sock-already-ticket': [],
      'sock-buy': [],
    }

    return (
      <span>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url(/css/normalize.css);
          @import url(/css/webflow.css);
          @import url(/css/offscript-tickets.webflow.css);


          * {
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          }
        ` }} />
        <span className="af-view">
          <div className="section is--80padding wf-section">
            <div className="_1077_container">
              <div className="overflow_hidden">
                <div className="heading--137 _24margin-bottom">Wallet Connected</div>
              </div>
              {map(proxies['sock-address'], props => <div {...{...props, className: `faq--question-title ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>WALLET ADDRESS</React.Fragment>}</div>)}
              {map(proxies['sock-already-ticket'], props => <div {...{...props, className: `text--20 info ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>You already have a ticket.</React.Fragment>}</div>)}
              <div className="_60margin-top _20-tablet">
                <div className="overflow_hidden">
                  <div className="getticket-background small">
                    {map(proxies['sock-buy'], props => <a href="#" {...{...props, className: `getticket-btn-2 _100 w-inline-block ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>
                      <div className="overflow_hidden">
                        <div className="hover-text-wrapper small animation-fadein">
                          <div className="text_hover">BUY TICKET</div>
                          <div className="text_hover">connect wallet</div>
                        </div>
                      </div>
                    </React.Fragment>}</a>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </span>
      </span>
    )
  }
}

export default SectionWalletView

/* eslint-enable */