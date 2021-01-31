import React, { Component } from "react";
import axios from "../../axios-instance";
import { getDistance } from "geolib";

import TableHeader from "../../components/UI/TableHeader/TableHeader";
import TableRow from "../../components/UI/TableRow/TableRow";
import TableFooter from "../../components/UI/TableFooter/TableFooter";
import Spinner from "../../components/UI/Spinner/Spinner";
import Isolation from '../Isolation/Isolation';

class MainPage extends Component {
  state = {
    loading: false,
    finishedAllCalcs: false,
    finishedDestCalc: false,
    finishSort: false,
    finishedCalcDistance: false,
    greenIndex: null,
    redIndex: null,
    error: false
  };

  mockData = [
    {
      agent: "007",
      country: "Brazil",
      address: "Av. Vieira Souto, 168 Ipanema, Rio de Janeiro",
      date: "Dec 17, 1995, 9:45:17 PM"
    },
    {
      agent: "005",
      country: "Poland",
      address: "Rynek Glowny 12, Krakow",
      date: "Apr 5, 2011, 5:05:12 PM"
    },
    {
      agent: "007",
      country: "Morocco",
      address: "27 Derb Lferrane, Marrakech",
      date: "Jan 1, 2001, 12:00:00 AM"
    },
    {
      agent: "005",
      country: "Brazil",
      address: "R. Roberto Simonsen 122, Sao Paulo",
      date: "May 5, 1986, 8:40:23 AM"
    },
    {
      agent: "011",
      country: "Poland",
      address: "swietego Tomasza 35, Krakow",
      date: "Sep 7, 1997, 7:12:53 PM"
    },
    {
      agent: "003",
      country: "Morocco",
      address: "Rue Al-Aidi Ali Al-Maaroufi, Casablanca",
      date: "Aug 29, 2012, 10:17:05 AM"
    },
    {
      agent: "008",
      country: "Brazil",
      address: "R. tamoana 418, tefe",
      date: "Nov 10, 2005, 1:25:13 PM"
    },
    {
      agent: "013",
      country: "Poland",
      address: "Zlota 9, Lublin",
      date: "Oct 17, 2002, 10:52:19 AM"
    },
    {
      agent: "002",
      country: "Morocco",
      address: "Riad Sultan 19, Tangier",
      date: "Jan 1, 2017, 5:00:00 PM"
    },
    {
      agent: "009",
      country: "Morocco",
      address: "atlas marina beach, agadir",
      date: "Dec 1, 2016, 9:21:21 PM"
    }
  ];

  mockDataAsc = [];
  destLocation = [];
  dist = null;
  shortDistance = null;
  ongDistance = null;
  greenIndex = null;
  redIndex = null;

  componentDidMount() {
    this.mockDataAsc = this.setMockDataAscending();
    this.destLocation = this.setLatLongOfDest();
  }

  setMockDataAscending = () => {
    let ascData = [];
    ascData = [...this.mockData].sort((a, b) =>
      new Date(a.date) > new Date(b.date) ? 1 : -1
    );
    this.setState({ finishSort: true });
    return ascData;
  };

  setLatLongOfDest = () => {
    let latLongDest = [];
    axios
      .get("json", {
        params: {
          address: encodeURIComponent("10 Downing St, Westminster, London"),
          key: encodeURIComponent("AIzaSyCLPzeI-mGUtobzSTxYFkFoFaxeX7BkNog")
        }
      })
      .then(res => {
        latLongDest.push(
          res.data.results[0].geometry.location.lat,
          res.data.results[0].geometry.location.lng
        );
        this.setState({ finishedDestCalc: true });
        this.findDistance(res.data.results[0].geometry.location.lat,
          res.data.results[0].geometry.location.lng)
        return latLongDest;
      })
      .catch(error => {
        this.setState({ error: true, finishedDestCalc: true });
      });
  };

  findDistance = (lat, lon) => {
    
    for (const [index, value] of this.mockDataAsc.entries()) {
      axios
        .get("json", {
          params: {
            address: encodeURIComponent(value.address),
            key: encodeURIComponent("AIzaSyCLPzeI-mGUtobzSTxYFkFoFaxeX7BkNog")
          }
        })
        .then(res => {
          if (res.data.status === "OK") {
            this.dist = getDistance(
              {
                latitude: res.data.results[0].geometry.location.lat,
                longitude: res.data.results[0].geometry.location.lng
              },
              { latitude: lat, longitude: lon }
            );

            if (this.dist < this.shortDistance || (!this.shortDistance && !this.greenIndex)) {
              this.shortDistance = this.dist;
              this.greenIndex = index;
              this.setState({greenIndex: index});
            }

            if (this.dist > this.longDistance || (!this.longDistance && !this.redIndex)) {
              this.longDistance = this.dist;
              this.redIndex = index;
              this.setState({redIndex: index});
            }
          }
        })
        .catch(error => {});
    }
    this.setState({finishedCalcDistance: true});
  };

  render() {
    let items = [];
    if (this.state.finishSort && this.state.finishedDestCalc && this.state.finishedCalcDistance) {
      items = [];
      this.mockDataAsc.map((obj, index) => {
        if (index === this.state.greenIndex)
        {
          items.push(<TableRow key={Math.random()} color="green" data={obj} />);
          
        }
        if (index === this.state.redIndex)
        {
          items.push(<TableRow key={Math.random()} color="red" data={obj} />);
          
        }
        if (index !== this.state.redIndex && index !== this.state.greenIndex) {
          items.push(<TableRow key={Math.random()} data={obj} />);
        }
        return items;
        
      });
    } else {
      items.push(<Spinner />);
    }

    return (
      <div>
        <TableHeader />
        {items}
        <TableFooter numOfMissions={this.mockData.length} />
        <Isolation data={this.mockData}/>
      </div>
    );
  }
}

export default MainPage;
