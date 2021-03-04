import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

type CntProps = {
  name: string;
  birth: string;
  inner_opened: number;
  inner_new: number;
  outer_opened: number;
  outer_new: number;
  logAt: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 275,
    marginBottom: theme.spacing(2),
  },
  gridRoot: {
      flexGrow: 1,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(3)
  },
  birth: {
      paddingTop: theme.spacing(1)
  },
}));

function Cnt({ name, birth, inner_opened, inner_new, outer_opened, outer_new, logAt }: CntProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography className={classes.birth} color="textSecondary">
          {birth}
        </Typography>
        <div className={classes.gridRoot}>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                겉 기저귀
                </Grid>
                <Grid item xs={8}>
                개봉 {outer_opened}, 미개봉 {outer_new}
                </Grid>
                <Grid item xs={4}>
                속 기저귀
                </Grid>
                <Grid item xs={8}>
                개봉 {inner_opened}, 미개봉 {inner_new}
                </Grid>
            </Grid>
        </div>
        <Typography  color="textSecondary">
          입력시간 {logAt}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium">자세히 </Button>
      </CardActions>
    </Card>
  );
}

export default Cnt;