import React, { Component } from 'react';
import { Card, Button, Typography, withStyles } from '@material-ui/core';
import { Done, Close } from '@material-ui/icons';

const styles = theme => ({
  flex: {
    display: 'flex',
    margin: '40px auto',
    width: 1024
  },
  card: {
    width: 300,
    margin: 20,
    marginTop: 30,
    textAlign: 'center',
    overflow: 'visible',
    height: 350
  },
  title: {
    textAlign: 'center'
  },
  tick: {
    fontSize: 20,
    verticalAlign: 'middle',
    color: 'green',
    padding: 3,
    borderRadius: '50%',
    border: '2px solid green',
    marginRight: 10
  },
  cross: {
    fontSize: 20,
    verticalAlign: 'middle',
    color: 'red',
    padding: 3,
    borderRadius: '50%',
    border: '2px solid red',
    marginRight: 10
  },
  point: {
    margin: '10px 0 10px 40px',
    textAlign: 'left'
  },
  btn: {
    margin: '10px 0 10px 0'
  },
  amount: {
    padding: 10,
    margin: '-20px 0 20px 0',
    borderRadius: '50%',
    backgroundColor: theme.palette.secondary.main,
    display: 'inline-block',
    border: `1px solid ${theme.palette.primary.main}`,
    width: 90
  }
});

class PricingList extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.flex}>
        <div>
          <Typography variant="h4" className={classes.title}>
            Free
          </Typography>
          <Card className={classes.card}>
            <Typography variant="h4" className={classes.amount}>
              $ 0
            </Typography>
            <Typography className={classes.point}>
              <Done className={classes.tick} />3 Projects
            </Typography>
            <Typography className={classes.point}>
              <Done className={classes.tick} />3 collabarators
            </Typography>
            <Typography className={classes.point}>
              <Done className={classes.tick} />
              Burn Down Chart
            </Typography>
            <Typography className={classes.point}>
              <Done className={classes.tick} />
              Kanban Board
            </Typography>
            <Typography className={classes.point}>
              <Close className={classes.cross} />
              Import/Export Project
            </Typography>
          </Card>
        </div>
        <div>
          <Typography variant="h4" className={classes.title}>
            Basic
          </Typography>
          <Card className={classes.card}>
            <Typography variant="h4" className={classes.amount}>
              $ 5
            </Typography>
            <Typography className={classes.point}>
              <Done className={classes.tick} />5 Projects
            </Typography>
            <Typography className={classes.point}>
              <Done className={classes.tick} />
              10 collabarators
            </Typography>
            <Typography className={classes.point}>
              <Done className={classes.tick} />
              Burn Down Chart
            </Typography>
            <Typography className={classes.point}>
              <Done className={classes.tick} />
              Kanban Board
            </Typography>
            <Typography className={classes.point}>
              <Done className={classes.tick} />
              Import/Export Project
            </Typography>
            <Button
              variant="contained"
              className={classes.btn}
              color="primary"
              onClick={() => this.props.onBuy(5)}
            >
              Buy
            </Button>
          </Card>
        </div>

        <div>
          <Typography variant="h4" className={classes.title}>
            Standard
          </Typography>
          <Card className={classes.card}>
            <Typography variant="h4" className={classes.amount}>
              $ 15
            </Typography>
            <Typography className={classes.point}>
              <Done className={classes.tick} />
              20 Projects
            </Typography>
            <Typography className={classes.point}>
              <Done className={classes.tick} />
              30 collabarators
            </Typography>
            <Typography className={classes.point}>
              <Done className={classes.tick} />
              Burn Down Chart
            </Typography>
            <Typography className={classes.point}>
              <Done className={classes.tick} />
              Kanban Board
            </Typography>
            <Typography className={classes.point}>
              <Done className={classes.tick} />
              Import/Export Project
            </Typography>
            <Button
              variant="contained"
              className={classes.btn}
              color="primary"
              onClick={() => this.props.onBuy(15)}
            >
              Buy
            </Button>
          </Card>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PricingList);
