import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import MobTable from '../components/people/MobTable';
import PeopleTable from '../components/people/PeopleTable';
import PeopleForm from '../components/people/PeopleForm';
import { fetchPeople } from '../routines';

class People extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupOpen: false,
      index: -1,
    };
  }

  componentDidMount() {
    this.props.fetchPeople();
  }

  handleOpen = () => {
    this.setState({ index: -1 });
  };

  handleClose = () => {
    this.props.history.push("/people");
  };

  render() {
    if (this.props.people.loading) {
      return <div> Loading.. </div>;
    }
    const { index } = this.state;
    const { data } = this.props.people;
    console.log(data);
    return (
      <div className="page">
        <h3>People</h3>
        <div className="page-button">
          <Link to="/people/new">
            <Button
              label="Create People"
              style={{color: '#2196f3'}}
              onClick={this.handleOpen}
            />
          </Link>
        </div>
        <Route
          path="/people/:peopleId"
          render={() => (
            <PeopleForm
              handleClose={this.handleClose}
              data={index === -1 ? {} : data[index]}
              peopleFormSubmit={this.peopleFormSubmit}
            />
          )}
        />
        <div className="table">
          <PeopleTable peopleData={data} handleOpen={this.handleOpen} />
        </div>
        <div className="mobtable">
          <MobTable
            mobPeopleData={data}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    people: state.people
  }),
  { fetchPeople }
)(withRouter(People));
