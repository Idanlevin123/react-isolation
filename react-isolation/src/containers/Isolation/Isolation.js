import React, { Component } from "react";

import styles from './Isolation.module.css';

class Isolation extends Component {

    state = {
        doneCalc: false,
        numOfIsolatedAgentsInCountry: null
    }

    country = null;
    counter = 0;

  componentDidMount() {
     
      let counterAgents = null;
      let counterCountries = null;
      let countriesWithIsolatedAgents = [];

      for (const [index, value] of this.props.data.entries()) {
        counterAgents = this.props.data.reduce((acc, cur) => cur.agent === value.agent ? ++acc : acc, 0);
          if (counterAgents === 1) {
            countriesWithIsolatedAgents.push(value.country);
          }
      }

      for (const [index, value] of countriesWithIsolatedAgents.entries()) {
        counterCountries = countriesWithIsolatedAgents.reduce((acc, cur) => cur === value ? ++acc : acc, 0);

        if (counterCountries > this.counter)
        {
            this.counter = counterCountries;
            this.country = value;
        }
      }

  }

  render() {
    return <div className={styles.Isolation}><strong>{this.country}</strong>  with an isolation degree of <strong>{this.counter}</strong></div>;
  }
}

export default Isolation;
