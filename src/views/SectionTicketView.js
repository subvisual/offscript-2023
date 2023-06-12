/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'

const scripts = [

]

let Controller

class SectionTicketView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/SectionTicketController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = SectionTicketView

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
    const proxies = SectionTicketView.Controller !== SectionTicketView ? transformProxies(this.props.children) : {
      'sock-email': [],
      'sock-price-1': [],
      'sock-currency': [],
      'sock-buy-ticket': [],
      'sock-ticket-notice': [],
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
          <div className="af-class-section af-class-is--80padding af-class-wf-section">
            <div className="af-class-_1077_container">
              <div className="af-class-overflow_hidden">
                <div className="af-class-heading--137 af-class-_40margin-bottom-copy">CHECKOUT</div>
              </div>
              <div className="w-form">
                <form id="email-form" name="email-form" data-name="Email Form" method="get" className="af-class-form-2"><label htmlFor="Email-2" className="af-class-text--20">Email Address</label>{map(proxies['sock-email'], props => <input type="email" maxLength={256} name="Email" data-name="Email" placeholder="Your ticket is sent to this address" id="Email-2" required {...{...props, className: `af-class-text-field w-input ${props.className || ''}`}}>{props.children}</input>)}<label htmlFor="Email-3" className="af-class-text--20 af-class-_28 af-class-regular">Offscript experience</label>
                  <div className="af-class-_28margin-left af-class-no-margin">
                    <div className="af-class-text--20">Arrival April 1st - {map(proxies['sock-price-1'], props => <span {...{...props, className: `af-class-price-regular ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>$800</React.Fragment>}</span>)}</div>
                    <div className="af-class-text--20 af-class-_12">Inc. VAT @23%</div>
                    <div className="af-class-text--20 af-class-_16">Includes event, transportation, lodging, food, drinks. <br /><span className="af-class-bold">2 nights</span>, Check in April 1st Check out April 3rd</div>
                  </div><label htmlFor="field" className="af-class-text--20">Crypto Payment</label>{map(proxies['sock-currency'], props => <select id="field" name="field" data-name="Field" required {...{...props, className: `af-class-select-field w-select ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>
                    <option value>Select a currency</option>
                    <option value="ETH">ETH</option>
                    <option value="USDC">USDC</option>
                    <option value="USDT">USDT</option>
                    <option value="DAI">DAI</option>
                  </React.Fragment>}</select>)}{map(proxies['sock-buy-ticket'], props => <input type="submit" value="BUY TICKET" data-wait="Please wait..." {...{...props, className: `af-class-submit-button w-button ${props.className || ''}`}}>{props.children}</input>)}
                  {map(proxies['sock-ticket-notice'], props => <div {...{...props, className: `af-class-text--20 af-class-_16margin-top ${props.className || ''}`}}>{props.children ? props.children : <React.Fragment>Waiting placeholder...</React.Fragment>}</div>)}
                </form>
                <div className="af-class-success-message w-form-done">
                  <div className="af-class-text--20">Thank you! Your submission has been received!</div>
                </div>
                <div className="af-class-error-message w-form-fail">
                  <div className="af-class-text--20">Oops! Something went wrong while submitting the form.</div>
                </div>
              </div>
            </div>
          </div>
        </span>
      </span>
    )
  }
}

export default SectionTicketView

/* eslint-enable */