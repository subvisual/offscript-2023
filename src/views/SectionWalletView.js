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
      'sock-img': [],
      'sock-nft-name': [],
      'sock-discount': [],
    }

    return (
      <span>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url(/css/normalize.css);
          @import url(/css/webflow.css);
          @import url(/css/offscript-website-325e235569d243ef7486b.webflow.css);


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
              <div className="w-layout-grid grid-2 _60margin-top">
                <div id="w-node-e2e35535-a98f-e88a-d04f-a98790cb6379-6fc6f102" className="overflow_hidden">{map(proxies['sock-img'], props => <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt {...{...props, className: `nft-image ${props.className || ''}`}}>{props.children}</img>)}</div>
                <div id="w-node-_17ceab8d-208d-78c7-d89d-d56af4a5e241-6fc6f102">
                  {map(proxies['sock-nft-name'], props => <div {...{...props, className: `heading--56 ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>NFT&nbsp;name... </React.Fragment>}</div>)}
                  {map(proxies['sock-discount'], props => <div {...{...props, className: `faq--question-title _16margin-top ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>Discount info</React.Fragment>}</div>)}
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