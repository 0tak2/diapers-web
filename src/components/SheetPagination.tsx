import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

type SheetPaginationProps = {
  rowsPerPageOptions: number[];
  isLast: boolean;
  rowsPerPage: number;
  page: number;
  onChangePage: (newPage: number) => void;
  onChangeRowsPerPage: (e: any) => void;
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
  centerWrapper: {
    textAlign: 'center',
  },
  leftWrapper: {
    textAlign: 'left',
  },
  rightWrapper: {
    textAlign: 'right',
  },
  labelLeft: {
    marginRight: theme.spacing(1),
  }
}));

function SheetPagination({ rowsPerPageOptions, isLast, rowsPerPage, page, onChangePage, onChangeRowsPerPage }: SheetPaginationProps) {
  const classes = useStyles();

  // local state
  const [ rowsPerPageFromUser, setPerPageFromUser ] = useState(rowsPerPage);

  useEffect(() => {
    setPerPageFromUser(rowsPerPage);
  }, [rowsPerPage])

  const onClickPageBtn = (direction: string) => {
    if (direction === 'prev') {
      onChangePage(page - 1);
    } else if (direction === 'next') {
      onChangePage(page + 1);
    }
  }

  return (
    <div>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={4}>
            <div className={classes.leftWrapper}>
              <span className={classes.labelLeft}>데이터 개수:</span>
              <Select
                id="rows-per-a-page-select"
                value={rowsPerPageFromUser}
                onChange={onChangeRowsPerPage}
              >
                {rowsPerPageOptions.map((val, index) => (
                  <MenuItem value={val} key={index}>{val}</MenuItem>
                ))}
              </Select>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.centerWrapper}>
              현재 {page + 1} 페이지
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={classes.rightWrapper}>
              { page > 0 ?
                <IconButton
                  aria-label="go to previous page"
                  component="span"
                  onClick={() => onClickPageBtn("prev")}
                >
                  <NavigateBeforeIcon />
                </IconButton>
                :
                <IconButton
                  disabled
                  aria-label="go to previous page"
                  component="span"
                  onClick={() => onClickPageBtn("prev")}
                >
                  <NavigateBeforeIcon />
                </IconButton> 
              }

              { isLast ?
                <IconButton
                  disabled
                  aria-label="go to next page"
                  component="span"
                  onClick={() => onClickPageBtn("next")}
                >
                  <NavigateNextIcon />
                </IconButton>
                :
                <IconButton
                  aria-label="go to next page"
                  component="span"
                  onClick={() => onClickPageBtn("next")}
                >
                  <NavigateNextIcon />
                </IconButton> 
              }
            </div>
          </Grid>
        </Grid>
    </div>
  );
}

export default SheetPagination;