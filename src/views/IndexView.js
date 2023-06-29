/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'
import SectionConnectView from './SectionConnectView'
import SectionWalletView from './SectionWalletView'
import SectionMintView from './SectionMintView'
import SectionTicketView from './SectionTicketView'
import SectionTicketSuccessView from './SectionTicketSuccessView'

const scripts = [
  { loading: fetch("https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=6215154fc24aa10549c6f101").then(body => body.text()), isAsync: false },
  { loading: fetch("js/webflow.js").then(body => body.text()), isAsync: false },
  { loading: Promise.resolve("const html=document.querySelector(\"html\"),madeBy=document.createComment(\"MADE BY ONDASTUDIO.CO\");document.insertBefore(madeBy,html);"), isAsync: false },
  { loading: Promise.resolve("
   /*     
  if (screen.width>992){
  document.write(\"<script src=\'https://mzrt2z.csb.app/script.js\'></scr\"+\"ipt>\");
  };
  if (screen.width<992){
  document.write(\"<script src=\'https://mzrt2z.csb.app/script-mobile.js\'></scr\"+\"ipt>\");
  };
  */
  "), isAsync: false },
]

let Controller

class IndexView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/IndexController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = IndexView

        return Controller
      }

      throw e
    }
  }

  componentDidMount() {
    const htmlEl = document.querySelector('html')
    htmlEl.dataset['wfPage'] = '6215154fc24aa1b66fc6f102'
    htmlEl.dataset['wfSite'] = '6215154fc24aa10549c6f101'

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
    const proxies = IndexView.Controller !== IndexView ? transformProxies(this.props.children) : {

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
          <div>
            <div className="af-class-body">
              <div className="w-embed">
                <style dangerouslySetInnerHTML={{__html: "\n.af-view .af-class-graph-rotating {\n  white-space: nowrap;\n  will-change: transform;\n  animation: graph-rotating 20s linear infinite;\n  /* manipulate the speed of the marquee by changing \"40s\" line above*/\n}\n@keyframes graph-rotating {\n  .af-view from {\n    transform: rotate(0deg);\n  }\n  .af-view to {\n    transform: rotate(359deg);\n  }\n}\n.af-view .af-class-is--first-img{\n  white-space: nowrap;\n  will-change: transform;\n  animation: is--first-img 20s linear infinite;\n  /* manipulate the speed of the marquee by changing \"40s\" line above*/\n}\n@keyframes is--first-img {\n  .af-view from {\n    transform: rotate(0deg);\n  }\n  .af-view to {\n    transform: rotate(-359deg);\n  }\n}\n.af-view .af-class-marquee-row-logos {\n  white-space: nowrap;\n  will-change: transform;\n  animation: marquee-row-logos 35s linear infinite;\n  /* manipulate the speed of the marquee by changing \"40s\" line above*/\n}\n@keyframes marquee-row-logos {\n  .af-view from {\n    transform: translate(0%, 0px);\n  }\n  .af-view to {\n    transform: translate(-100%, 0px);\n  }\n}\n.af-view .af-class-rotating-glob {\n  white-space: nowrap;\n  will-change: transform;\n  animation: rotating-glob 5s linear infinite;\n  /* manipulate the speed of the marquee by changing \"40s\" line above*/\n}\n@keyframes rotating-glob {\n  .af-view from {\n    transform: rotatey(0deg);\n  }\n  .af-view to {\n    transform: rotatey(359deg);\n  }\n}\n.af-view * {\ntext-rendering: optimizeLegibility;\n-webkit-font-smoothing: antialiased;\nfont-smoothing: antialiased;\n-moz-osx-font-smoothing: grayscale;\n}\n.af-view .af-class-_1440container.af-class-is--explore {\n  pointer-events: none;\n}\n.af-view .af-class-explore-img {\n  pointer-events: none;\n}\n.af-view {\n  overflow-x: hidden;\n}\n.af-view .af-class-map-link {\n  pointer-events: auto !important;\n}\n@media only screen and (max-width: 1919px) and (min-width: 1442px) {\n  .af-view {\n    font-size: 0.06vw;\n  }\n}\n" }} />
              </div>
              <div className="af-class-navbar_parent af-class-wf-section">
                <div className="af-class-navbar_grid">
                  <a href="https://www.web3creatives.com/" className="af-class-brand_link w-inline-block"><img src="images/OffScript-Logo-2.png" loading="lazy" sizes="(max-width: 479px) 56vw, (max-width: 767px) 44vw, (max-width: 991px) 27vw, (max-width: 1919px) 15vw, 11vw" srcSet="images/OffScript-Logo-2-p-500.png 500w, images/OffScript-Logo-2-p-800.png 800w, images/OffScript-Logo-2-p-1080.png 1080w, images/OffScript-Logo-2.png 2708w" alt="Offscript logo" className="af-class-brand_img" /></a>
                </div>
              </div>
              <div className="af-class-section af-class-is--80padding af-class-no-bottom af-class-wf-section">
                <div className="af-class-_1077_container">
                  <div className="af-class-heading--137 af-class-_24margin-bottom">OFFSCRIPT 2023<br />TICKETS</div>
                  <div className="af-class-_60margin-top">
                    <div id="w-node-_3dc5a527-52b0-4f8c-ecfd-3fbeff791524-6fc6f102" className="af-class-vertical-line" />
                    <div id="w-node-_3dc5a527-52b0-4f8c-ecfd-3fbeff791525-6fc6f102" className="af-class-right">
                      <div className="af-class-overflow_hidden">
                        <div className="af-class-faq--question-title">Buy with crypto:<br /></div>
                        <div className="af-class-text--20">· Apply OffscriptNFT discount<br />· Buy with DAI or USDC on Ethereum Mainnet<br />· Buy with fiat <a href="https://ti.to/offscript" target="_blank">here</a><br />‍<br />
                          <a href="https://www.notion.so/web3creatives/Offscript-Terms-and-conditions-569cc25f4714418b9055bdac45ffbc94?pvs=4" target="_blank">Terms &amp; Conditions</a><br />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="af-class-text--20 af-class-_60margin-top">Connect your wallet to Buy a Ticket </div>
                </div>
              </div>
              <SectionConnectView.Controller />
              <SectionWalletView.Controller />
              <SectionMintView.Controller />
              <SectionTicketView.Controller />
              <SectionTicketView.Controller-success />
              <div className="af-class-section af-class-is--footer af-class-wf-section">
                <div className="af-class-_1360_container af-class-is--20padding-tablet">
                  <div className="af-class-_200-spacing" />
                  <div className="af-class-overflow_hidden">
                    <a href="https://www.web3creatives.com/" className="af-class-brand_link w-inline-block"><img src="images/OffScript-Logo-2.png" loading="lazy" sizes="(max-width: 479px) 89vw, (max-width: 767px) 91vw, (max-width: 991px) 95vw, (max-width: 1919px) 94vw, (max-width: 3814px) 71vw, 2708px" srcSet="images/OffScript-Logo-2-p-500.png 500w, images/OffScript-Logo-2-p-800.png 800w, images/OffScript-Logo-2-p-1080.png 1080w, images/OffScript-Logo-2.png 2708w" alt="Offscript logo" className="af-class-footer_logo af-class-animation-fadein" /></a>
                  </div>
                </div>
                <div className="af-class-line" />
                <div className="af-class-_1360_container af-class-is--footer">
                  <div className="w-layout-grid af-class-grid--footer af-class-is--crendentials">
                    <div id="w-node-a09e21ea-20ba-9d3e-69cf-fead278e4391-6fc6f102" className="af-class-overflow_hidden">
                      <div className="af-class-text--20 af-class-font-gradient-3 af-class-animation-fadein">© Offscript 2022</div>
                    </div>
                    <div id="w-node-_2dccd64b-e470-8fbb-93cd-30bb53cb9e49-6fc6f102" className="af-class-overflow_hidden">
                      <div className="af-class-text--20 af-class-is--50opacity af-class-animation-fadein">
                        <a href="https://www.iubenda.com/privacy-policy/85578480" aria-label="Privacy Policy" rel="noopener" target="_blank" className="af-class-credentialslink">Privacy Policy</a>
                      </div>
                    </div>
                    <div id="w-node-_6fc7bdae-7f9d-4b12-9c8e-da48b4f287ac-6fc6f102" className="af-class-overflow_hidden">
                      <div className="af-class-text--20 af-class-is--50opacity af-class-animation-fadein">
                        <a href="https://web3creatives.notion.site/Offscript-Terms-and-conditions-569cc25f4714418b9055bdac45ffbc94" aria-label="Privacy Policy" rel="noopener" target="_blank" className="af-class-credentialslink">Terms &amp; Conditions</a>
                      </div>
                    </div>
                    <div id="w-node-c73cba14-1723-949f-1ab3-2bdf72efdb80-6fc6f102" className="af-class-overflow_hidden">
                      <div className="af-class-text--20 af-class-animation-fadein">Made by <a href="https://www.ondastudio.co/" aria-label="Onda's website" rel="noopener" target="_blank" className="af-class-credentialslink">Onda</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="af-class-map-popup af-class-tickets">
                <div className="af-class-map-wrapper af-class-tickets">
                  <div className="af-class-map-close-wrapper af-class-tickets">
                    <div data-w-id="6eb0cf48-6b60-fd6f-177b-846434655d77" className="af-class-close-btn">
                      <div className="af-class-text--20">Close</div><img src="images/close.svg" loading="lazy" alt="Close icon" className="af-class-close_icon" />
                    </div>
                  </div>
                  <div className="af-class-tickets-actions-wrapper-2">
                    <div className="af-class-overflow_hidden">
                      <div className="af-class-align-center">
                        <div className="af-class-heading--56 af-class-animation-fadein">Get Tickets</div>
                      </div>
                    </div>
                    <div className="af-class-_16margin-top">
                      <div className="af-class-overflow_hidden">
                        <div className="af-class-align-center">
                          <div className="af-class-text--20 af-class-animation-fadein">Connect (Ethereum) wallet to check for discounts and buy with crypto (ETH, DAI, USDC, USDT) or Buy with fiat to use Paypal or Creditcard.</div>
                        </div>
                      </div>
                    </div>
                    <div className="af-class-_60margin-top">
                      <div className="af-class-grid-2">
                        <div className="af-class-overflow_hidden">
                          <div className="af-class-getticket-background af-class-small af-class-animation-fadein">
                            <a href="#" className="af-class-getticket-btn-2 af-class-_100 w-inline-block">
                              <div className="af-class-overflow_hidden">
                                <div className="af-class-hover-text-wrapper af-class-small af-class-animation-fadein">
                                  <div className="af-class-text_hover">connect wallet</div>
                                  <div className="af-class-text_hover">connect wallet</div>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                        <div className="af-class-overflow_hidden">
                          <div className="af-class-getticket-background af-class-small af-class-animation-fadein">
                            <a href="https://ti.to/offscript/offscript" target="_blank" className="af-class-getticket-btn-2 af-class-_100 w-inline-block">
                              <div className="af-class-overflow_hidden">
                                <div className="af-class-hover-text-wrapper af-class-small af-class-animation-fadein">
                                  <div className="af-class-text_hover">BUY WITH FIAT</div>
                                  <div className="af-class-text_hover">BUY WITH FIAT</div>
                                </div>
                              </div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default IndexView

/* eslint-enable */