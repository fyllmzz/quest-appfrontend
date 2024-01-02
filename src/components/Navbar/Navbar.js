import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {LockOpen} from "@mui/icons-material";

function Navbar(){

    const logout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("userName");
        localStorage.removeItem("tokenKey");
        window.location.reload() //sayfayı yeniden yükle
    }
    return(
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className="title">
                        <Link className="link title" to="/">Home</Link>
                    </Typography>
                    <Typography variant="h6" >
                        {localStorage.getItem("currentUser") == null ?  <Link className="link" to="/auth">Giriş / Kayıt Ol</Link>
                            : <div>
                            <IconButton className="link title"  onClick={logout}><LockOpen>Çıkış</LockOpen></IconButton>
                            <Link className="link" to={{pathname:"/users/"+localStorage.getItem("currentUser")}}>Profil</Link>
                            </div>
                        }
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
} export default Navbar;