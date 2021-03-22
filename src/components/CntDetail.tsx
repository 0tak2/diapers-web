import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

type CntDetailProps = {
    description: string;
    birth: string;
    inner_product: string;
    outer_product: string;
    deactivated: boolean;
    name: string;
    cntId: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 275,
    marginBottom: theme.spacing(2),
  },
  gridRoot: {
      flexGrow: 1,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2)
  },
  birth: {
      paddingTop: theme.spacing(1)
  },
}));

function CntDetail({ cntId, name, birth, description, inner_product, outer_product, deactivated }: CntDetailProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
            {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
            {cntId}
        </Typography>
        <Typography variant="body2">
            생년월일: {birth}
        </Typography>
        <Typography variant="body2">
            이용자 설명: {description}
        </Typography>
        <Typography variant="body2">
            기본 겉 기저귀: {outer_product}
        </Typography>
        <Typography variant="body2">
            기본 속 기저귀: {inner_product}
        </Typography>
        {deactivated ? <Typography variant="body2">
            비활성화된 이용자
        </Typography> : ""}
      </CardContent>
      <CardActions>
      <Button size="medium" component={RouterLink} to={`/log/${cntId}`}>이용자 정보 편집</Button>
      </CardActions>
    </Card>
  );
}

export default CntDetail;