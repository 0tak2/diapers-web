import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

interface LoginPanelProps {
    realname: string;
    username: string;
    description: string;
    level: number;
    onClick: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 275,
    marginBottom: theme.spacing(2),
  },
  gridRoot: {
      flexGrow: 1,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(0.5)
  },
}));

function LoginPanel({ realname, username, description, level, onClick }: LoginPanelProps) {
  const classes = useStyles();

  const levelString = (level: number) => {
      switch(level) {
          case 0:
            return "일반"
          case 1:
            return "관리자"
          case 2:
            return "시스템 관리자"
          default:
            return ""
      }
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h6" component="h1">
          {realname} ({username})
        </Typography>
        <div className={classes.gridRoot}>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                소속/직위
                </Grid>
                <Grid item xs={8}>
                {description}
                </Grid>
                <Grid item xs={4}>
                권한
                </Grid>
                <Grid item xs={8}>
                {levelString(level)} ({level})
                </Grid>
            </Grid>
        </div>
      </CardContent>
      <CardActions>
        <Button size="medium" onClick={onClick}>로그아웃</Button>
      </CardActions>
    </Card>
  );
}

export default LoginPanel;