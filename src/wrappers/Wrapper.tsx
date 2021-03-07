import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Footer from '../components/Footer';
import DrawerContents from '../components/DrawerContents';

type MainContainerProps = {
    children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    footer: {
        padding: theme.spacing(6),
    },
}));

function MainContainer({ children }: MainContainerProps) {
    const [showMenu, setShowMenu] = useState(false);

    const toggleDrawer = () => {
        setShowMenu(!showMenu);
    }

    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        DIAPERS
                    </Typography>
                    <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>

                <Drawer anchor="left" open={showMenu} onClose={toggleDrawer}>
                    <DrawerContents toggleDrawer={toggleDrawer} />
                </Drawer>
            </div>
            
            <main>
                { children }
            </main>
            
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default MainContainer;