/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'

const scripts = [

]

let Controller

class SectionConnectView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/SectionConnectController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = SectionConnectView

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
    const proxies = SectionConnectView.Controller !== SectionConnectView ? transformProxies(this.props.children) : {
      'sock-connect': [],
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
          <div id="tickets" className="af-class-section af-class-is--20padding af-class-wf-section">
            <div className="af-class-overflow_hidden">
              <div className="af-class-marquee-wrapper af-class-is--1">
                <div className="af-class-heading--154 af-class-is--marquee">Eclectic+creative+web3+</div>
                <div className="af-class-heading--154 af-class-is--marquee">Eclectic+creative+web3+</div>
                <div className="af-class-heading--154 af-class-is--marquee">Eclectic+creative+web3+</div>
                <div className="af-class-heading--154 af-class-is--marquee">Eclectic+creative+web3+</div>
              </div>
            </div>
            <div className="af-class-overflow_hidden">
              <div className="af-class-marquee-wrapper af-class-is--second">
                <div className="af-class-marquee-row-right">
                  <div className="af-class-heading--154 af-class-is--marquee">anything you want it to be&nbsp;</div>
                  <div className="af-class-heading--154 af-class-is--marquee">anything you want it to be&nbsp;</div>
                </div>
                <div className="af-class-marquee-row-right">
                  <div className="af-class-heading--154 af-class-is--marquee">anything you want it to be&nbsp;</div>
                  <div className="af-class-heading--154 af-class-is--marquee">anything you want it to be&nbsp;</div>
                </div>
              </div>
            </div>
            <div className="af-class-div-block-2">
              <div className="af-class-overflow_hidden">
                <div className="af-class-getticket-background">
                  {map(proxies['sock-connect'], props => <a href="#" {...{...props, className: `af-class-getticket-btn w-inline-block ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>
                    <div className="af-class-overflow_hidden">
                      <div className="af-class-hover-text-wrapper">
                        <div className="af-class-text_hover">CONNECT WALLET</div>
                        <div className="af-class-text_hover">CONNECT WALLET</div>
                      </div>
                    </div>
                  </React.Fragment>}</a>)}
                </div>
              </div>
            </div>
          </div>
        </span>
      </span>
    )
  }
}

export default SectionConnectView

/* eslint-enable */