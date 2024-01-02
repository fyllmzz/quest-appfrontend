import React, {useState} from "react";
import {FormControl, FormHelperText, Input, InputLabel} from "@mui/material";
import Button from "@mui/material/Button";



function Auth(){
    const [username,setUsername]=useState("");
    const [password, setPassword]=useState("");

    const handlePassword = (value) =>{
        setPassword(value)
    }
    const  handleUsername = (value) =>{
        setUsername(value)
    }
    const sendRequest = (path)=>{
        fetch("/auth/"+path , {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(
                {
                    userName:username,
                    password:password,
                }),
        })
            .then((res)=>res.json())
            .then((result) => {
                if (result.message === "Kullanıcı adı zaten kullanımda.") {
                    alert(result.message);
                } else {
                    localStorage.setItem("tokenKey", result.message);
                    // localStorage.setItem("refreshKey", result.refreshToken);
                    localStorage.setItem("currentUser", result.userId);
                    localStorage.setItem("userName", username);
                    window.location.reload();
                }
            })
            .catch((err)=>console.log(err))
    }


    const handleRegister =()=>{
        if(username !== "" && password !=="" ) {
            sendRequest("register");
            setUsername("");
            setPassword("");
            //window.location.reload()

        } else {

           alert("Lütfen boş alanları doldurunuz.")
        }

    }
    const handleLogin=()=>{
        if(username !== "" && password !=="" ) {

            sendRequest("login");
            setUsername("");
            setPassword("");
            window.location.reload()

        } else {
            alert("Lütfen boş alanları doldurunuz.")
            //toast.error("Lütfen boş alanları doldurunuz.")
        }


    }
    return(
        <div style={{ width: '100%', display:"flex",justifyContent:"center" ,textAlign:"center", margin:"auto", marginTop:"80px"}}>
        <FormControl>

            <InputLabel>Kullanıcı Adı</InputLabel>
            <Input
                value={username}
                onChange={(e)=>handleUsername(e.target.value)}
            />
            <InputLabel style={{top:80}}>Şifre</InputLabel>
            <Input style={{top:40}}
                   value={password}
                   onChange={(e) => handlePassword(e.target.value)}
                   type="password"
            />
            <Button variant="contained"
                    style={{marginTop:60,
                    background:'linear-gradient(45deg,#2196F3 30%, #21CBF3 90%)',
                    color:'white'}}
                    onClick={handleRegister}
            > Kayıt Ol </Button>
            <FormHelperText>Hesabın Var Mı? </FormHelperText>
            <Button variant="contained"
                    style={{marginTop:10,
                        background:'linear-gradient(45deg,#2196F3 30%, #21CBF3 90%)',
                        color:'white'}}
                    onClick={handleLogin}
            > Giriş Yap </Button>

        </FormControl>
</div>
    )
}export default Auth;
