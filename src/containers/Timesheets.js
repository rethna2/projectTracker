import React, { Component } from "react";
import { Link, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import moment from "moment";

import MobTable from "../components/timesheets/MobTable";
import TimesheetTable from "../components/timesheets/TimesheetTable";
import TimesheetForm from "../components/timesheets/TimesheetForm";
import DateForm from "../components/timesheets/DateForm";
import Loader from '../components/Loader';
import { fetchTimesheets } from "../routines";

class Timesheets extends Component {
  constructor(props) {
    super(props);
    var dateObj = new Date();
    var momentObj = moment(dateObj);
    var data = momentObj.format("YYYY-MM-DD");
    this.state = {
      isPopupOpen: false,
      index: -1,
      date: data
    };
  }

  componentDidMount() {
    this.props.fetchTimesheets();
  }

  handleOpen = () => {
    this.setState({ index: -1 });
  };

  handleClose = () => {
    this.props.history.push("/timesheet");
  };

  showDateForm = data => {
    this.dateValue(data);
  };

  dateValue = date => {
    this.setState({ date });
  };

  dayValue = (val, e) => {
    this.dateValue(val);
  };

  filter_array = test_array => {
    var index = -1,
      arr_length = test_array ? test_array.length : 0,
      resIndex = -1,
      result = [];
    while (++index < arr_length) {
      var value = test_array[index];
      if (value) {
        result[++resIndex] = value;
      }
    }
    return result;
  };

  render() {
    if (this.props.timesheets.loading) {
      return <Loader />;
    }
    const { index } = this.state;
    const { data } = this.props.timesheets;

    /*logic for onclick get data set date*/
    let dateVal = this.state.date;
    let docDate;
    let loggedHrs = 0;
    let dateKeys;;
    const forEachVal = data.map(e => {
      let docData = this.filter_array(e.timesheet);
      let dataKeys = docData
        .map(o => {
          return Object.keys(o);
        })
        .reduce((prev, curr) => {
          return prev.concat(curr);
        })
        .filter((col, i, arr) => {
          return arr.indexOf(col) == i;
        });
      dateKeys = dataKeys;
      docDate = dataKeys.find(val => {
        return dateVal == val;
      });
    });

    let tableData;
    if (docDate == dateVal) {
      data.map(values => {
        this.filter_array(values.timesheet).find(ele => {
          return (tableData = ele[docDate]);
        });
      });
    } else {
      tableData = [];
    }
    /*date logic header*/
    let now = new Date(dateVal);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];
    let day = days[now.getDay()];
    let numDay = now.getDate();
    let month = months[now.getMonth()];
    let dayOfWeek = now.getDay();

    let startDate = new Date(dateVal);
    startDate.setDate(numDay - dayOfWeek);
    startDate.setHours(0, 0, 0, 0);

    let endDate = new Date(dateVal);
    endDate.setDate(numDay + (6 - dayOfWeek));
    endDate.setHours(0, 0, 0, 0);

    let dateArray = [];
    let currentDate = moment(startDate);
    let stopDate = moment(endDate);
    while (currentDate <= stopDate) {
      let srchDate = moment(currentDate).format("YYYY-MM-DD");
      data.map(values => {
        this.filter_array(values.timesheet).map(data => {
          if (dateKeys.some(a => a === srchDate)) {
            Object.keys(data).map((val, index) => {
              if (val === srchDate) {
                loggedHrs = 0;
                data[val].map((value, index) => {
                   loggedHrs+=parseInt(value.spendTime);
                });
              }
            });
          } else if (dateKeys.some(a => a != srchDate)) {
             loggedHrs = 0;
          }
        });
      });
      dateArray.push({
        loggedHrs: loggedHrs,
        date: moment(currentDate).format("YYYY-MM-DD"),
        day: moment(currentDate).format("ddd")
      });
      currentDate = moment(currentDate).add(1, "days");
    }

    return (
      <div className="page">
        <div className="headingTop">
          <h3>Timesheets</h3>
          <Link to="/timesheet/new">
            <Button
              label="Create Timesheets"
              primary={true}
              style={{ color: "#2196f3" }}
              onClick={this.handleOpen}
            />
          </Link>
        </div>
        <div className="section-sides">
          <div>
            <div className="timeline-top">
              <div className="date-header">
                <p>{month}</p>
                <p>{numDay}</p>
                <p>{day}</p>
              </div>
              <div className="date-section">
                <DateForm 
                 dateVal={this.state.date} 
                 showDateForm={this.showDateForm} />
              </div>
            </div>
            <Route
              path="/timesheet/:timesheetId"
              render={() => (
                <TimesheetForm
                  handleClose={this.handleClose}
                  data={index === -1 ? {} : data[index]}
                  dateValue={this.state.date}
                  timesheetsFormSubmit={this.timesheetsFormSubmit}
                />
              )}
            />
            <div className="table">
              <div className="day-timesheet">
                {dateArray.map(val => {
                  return (
                    <Button
                      type="submit"
                      backgroundColor="#eee"
                      label={val.day + "(" + val.loggedHrs + "hrs" + ")"}
                      value={val.date}
                      className={val.day === day ? "cdateBtn" : "dateBtn"}
                      onClick={this.dayValue.bind(this, val.date)}
                    />
                  );
                })}
              </div>
              <TimesheetTable
                timesheetsData={tableData}
                dateValue={this.state.date}
                handleOpen={this.handleOpen}
              />
            </div>
            <div className="mobtable">
              <MobTable
                mobTimetableData={tableData}
                dateValue={this.state.date}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    timesheets: state.timesheets
  }),
  { fetchTimesheets }
)(withRouter(Timesheets));
