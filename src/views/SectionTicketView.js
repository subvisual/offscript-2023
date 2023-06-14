/* eslint-disable */

import React from "react";
import { createScope, map, transformProxies } from "./helpers";

const scripts = [];

let Controller;

class SectionTicketView extends React.Component {
  static get Controller() {
    if (Controller) return Controller;

    try {
      Controller = require("../controllers/SectionTicketController");
      Controller = Controller.default || Controller;

      return Controller;
    } catch (e) {
      if (e.code == "MODULE_NOT_FOUND") {
        Controller = SectionTicketView;

        return Controller;
      }

      throw e;
    }
  }

  componentDidMount() {
    /* View has no WebFlow data attributes */

    scripts.concat(null).reduce((active, next) =>
      Promise.resolve(active).then((active) => {
        const loading = active.loading.then((script) => {
          new Function(`
          with (this) {
            eval(arguments[0])
          }
        `).call(window, script);

          return next;
        });

        return active.isAsync ? next : loading;
      })
    );
  }

  render() {
    const proxies =
      SectionTicketView.Controller !== SectionTicketView
        ? transformProxies(this.props.children)
        : {
            "sock-email": [],
            "sock-price-1": [],
            "sock-currency": [],
            "sock-buy-ticket": [],
            "sock-ticket-notice": [],
          };

    return (
      <span>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @import url(/css/normalize.css);
          @import url(/css/webflow.css);
          @import url(/css/offscript-tickets.webflow.css);


          * {
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          }
        `,
          }}
        />
        <span className="af-view">
          <div className="section is--80padding wf-section">
            <div className="_1077_container">
              <div className="overflow_hidden">
                <div className="heading--137 _40margin-bottom-copy">
                  CHECKOUT
                </div>
              </div>
              <div className="w-form">
                <form
                  id="email-form"
                  name="email-form"
                  data-name="Email Form"
                  method="get"
                  className="form-2"
                  data-wf-page-id="6215154fc24aa1b66fc6f102"
                  data-wf-element-id="d4c0632d-ec9b-03aa-3da0-cdb12516edff"
                >
                  <label htmlFor="Email-2" className="text--20">
                    Email Address
                  </label>
                  {map(proxies["sock-email"], (props) => (
                    <input
                      type="email"
                      maxLength={256}
                      name="Email"
                      data-name="Email"
                      placeholder="Your ticket is sent to this address"
                      id="Email-2"
                      required
                      {...{
                        ...props,
                        className: `text-field w-input ${
                          props.className || ""
                        }`,
                      }}
                    >
                      {props.children}
                    </input>
                  ))}
                  <label htmlFor="Email-3" className="text--20 _28 regular">
                    Offscript experience
                  </label>
                  <div className="_28margin-left no-margin">
                    <div className="text--20 margin-bottom-20">
                      €990 / €790 for 2022 POAP holders
                      {map(proxies["sock-price-1"], (props) => (
                        <span
                          {...{
                            ...props,
                            className: `price-regular ${props.className || ""}`,
                          }}
                        >
                          {props.children}
                        </span>
                      ))}
                    </div>
                    <div className="text--20 margin-bottom-20">
                      · Arrival Friday Oct 20
                      <br />· Departure Sunday Oct 22
                    </div>
                    <div className="text--20 _16">
                      Includes: <br />
                      Event, 2 nights Accommodation, Meals &amp; drinks, Airport
                      transfer, Activities, Local taxes
                    </div>
                    <div className="text--20 _12">
                      **Shared rooms or suite. Private/family room upgrade
                      available at cost, on request
                    </div>
                  </div>
                  <label htmlFor="field" className="text--20">
                    Crypto Payment
                  </label>
                  {map(proxies["sock-currency"], (props) => (
                    <select
                      id="field"
                      name="field"
                      data-name="Field"
                      required
                      {...{
                        ...props,
                        className: `select-field w-select ${
                          props.className || ""
                        }`,
                      }}
                    >
                      {props.children ? (
                        props.children
                      ) : (
                        <React.Fragment>
                          <option value style={{ color: "black" }}>
                            Select a currency
                          </option>
                          <option value="USDC" style={{ color: "black" }}>
                            USDC
                          </option>
                          <option value="DAI" style={{ color: "black" }}>
                            DAI
                          </option>
                        </React.Fragment>
                      )}
                    </select>
                  ))}
                  {map(proxies["sock-buy-ticket"], (props) => (
                    <input
                      type="submit"
                      value="BUY TICKET"
                      data-wait="Please wait..."
                      {...{
                        ...props,
                        className: `submit-button w-button ${
                          props.className || ""
                        }`,
                      }}
                    >
                      {props.children}
                    </input>
                  ))}
                  {map(proxies["sock-ticket-notice"], (props) => (
                    <div
                      {...{
                        ...props,
                        className: `text--20 _16margin-top ${
                          props.className || ""
                        }`,
                      }}
                    >
                      {props.children ? (
                        props.children
                      ) : (
                        <React.Fragment>Waiting placeholder...</React.Fragment>
                      )}
                    </div>
                  ))}
                </form>
                <div className="success-message w-form-done">
                  <div className="text--20">
                    Thank you! Your submission has been received!
                  </div>
                </div>
                <div className="error-message w-form-fail">
                  <div className="text--20">
                    Oops! Something went wrong while submitting the form.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </span>
      </span>
    );
  }
}

export default SectionTicketView;

/* eslint-enable */
