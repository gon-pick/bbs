import React, { useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"

import "./login.css";

function Login() {
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    
    const handleInputId = (e) => {
        setInputId(e.target.value);
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }

    const onClickLogin = () => {
        fetchData(inputId,inputPw);
    }

    const fetchData = async (id,pwd) => {
        await axios.post("http://localhost:3000/login",null ,{ params:{ "id":id, "pwd":pwd} } )
        .then(function(resp){
            if(resp.data.id === undefined){
                alert('입력하신 id가 일치하지 않습니다.');
            } else if(resp.data.id === null){
                alert('입력하신 비밀번호가 일치하지 않습니다.');
            } else{
                alert('로그인 됐습니다.');
                localStorage.setItem('user_id', inputId);
                window.location.reload(); // 새로고침
            }
         })
         .catch(function(error){
                console.log(error);
         })
    }

    return(
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>로그인</h3>
                        <div className="d-flex justify-content-end social_icon">
                            <span><i className="fab fa-facebook-square"></i></span>
                            <span><i className="fab fa-google-plus-square"></i></span>
                            <span><i className="fab fa-twitter-square"></i></span>
                        </div>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input type="text" className="form-control" name='input_id' value={inputId} onChange={handleInputId} placeholder="userid" />
                                
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input type="password" className="form-control" name='input_pw' value={inputPw} onChange={handleInputPw} placeholder="password" />
                            </div><br />
                            <div className="form-group">
                                <Link className="btn float-right login_btn" onClick={onClickLogin} to="/">Login </Link>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                            Don't have an account?<Link to="/signup">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
