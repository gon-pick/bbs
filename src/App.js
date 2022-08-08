import React, { useState, useEffect } from "react"
import {BrowserRouter, Link, Routes, Route} from "react-router-dom"

import Bbslist from "./Components/bbs/bbslist";
import Bbswrite from "./Components/bbs/bbswrite"
import Bbsdetail from "./Components/bbs/bbsdetail"
import Bbsupdate from "./Components/bbs/bbsupdate"
import Answer from "./Components/bbs/answer"
import Login from "./Components/member/login"
import Signup from "./Components/member/signup"

function App() {
  //로그인 상태 관리
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => { 
    if(localStorage.getItem('user_id') === null){
      setIsLogin(false);
    }else{
      setIsLogin(true);
    }

  },[isLogin]);

  const onlogout = () => {
      localStorage.removeItem('user_id');
      setIsLogin(false);
      alert("로그아웃 됐습니다. 다시 로그인 해주세요.");
  }

  return (
    <div>
      <header className="py-4">
        <div className="container text-center">
          <img alt="" src="open-holy.jpg" width='960' height='150' />
        </div>
      </header>
      
        <BrowserRouter>
            <nav className="navbar navbar-expand-md navbar-dark bg-info sticky-top">
              <div className="container">
                <div className="collapse navbar-collapse" id="navbar-content">
                {isLogin ?
                  <ul className="navbar-nav mr-auto"> 
                    <li className="nav-item">
                      <Link className="nav-link" to="/">홈</Link>
                    </li>

                    <li className="nav-item dropdown">
                      
                      <div className="nav-link dropdown-toggle" id="navbarDropdown" 
                        role="button" data-toggle="dropdown" aria-haspopup="true" 
                      aria-expanded="false">게시판</div>

                      <div className="dropdown-menu" aria-labelledby="navebarDropdown">
                        <Link className="dropdown-item" to="/bbslist">글목록</Link>
                        <Link className="dropdown-item" to="/bbswrite">글추가</Link>
                      </div>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" onClick={onlogout} to="/login">로그아웃</Link>
                    </li>
                  </ul>
                  : 
                  <ul className="navbar-nav mr-auto"> 
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">로그인</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup">회원가입</Link>
                    </li>
                  </ul>
                  }
                </div>
              </div>
            </nav>

            <main>
              <div className="py-4">
                <div className="container">

                  <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signup" element={<Signup />}></Route>
                    
                    <Route path="/bbslist" element={<Bbslist />}></Route>
                    <Route path="/bbswrite" element={<Bbswrite />}></Route>
                    <Route path="/bbsdetail" element={<Bbsdetail />}></Route>
                    <Route path="/bbsupdate" element={<Bbsupdate />}></Route>
                    <Route path="/answer" element={<Answer />}></Route>
                  </Routes>
                </div>
              </div>
            </main>
        </BrowserRouter>
        
      <footer className="py-4 bg-info text-light">
        <div className="container text-center">
          <ul className="nav justify-content-center mb-3">
            <li className="nav-item">
              <a className="nav-link" href="/">Top</a>
            </li>
          </ul>

          <p>
            <small>Copyright &copy;Graphic Arts</small>
          </p>
        </div>
      </footer>
    </div>
  );
}

function Home(){

  return (
    <div>
      <div className="container text-center">
          <h2> React </h2>
          <br />
          <img alt="" src="react.jpg" width='960' height='640' />
      </div>
    </div>
  )
}

export default App;