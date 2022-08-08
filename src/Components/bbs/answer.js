import axios from "axios";
import {useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';

function Answer() {
    const location = useLocation();
    const locSeq = location.state.seq;
    const locId = location.state.id;
    const locTitle = location.state.title;
    const locContent = location.state.content;
    
    //detail bbs
    const id = localStorage.getItem('user_id');
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const titleChange = (e) => setTitle(e.target.value);
    const ContentChange = (e) => setContent(e.target.value);

    let history = useNavigate();
    const answerBtn = () =>{
        fetchData(locSeq,id,title,content);
    }

    const fetchData = async (p,i,t,c) => {
        await axios.get("http://localhost:3000/answer", { params:{"seq":p, "id":i, "title":t, "content":c}})
                    .then(function(resp){
                        alert('댓글이 완료 됐습니다.');
                        history('/bbslist');
                    })
                    .catch(function(error){
                        alert('없는 아이디입니다.');
                        console.log(error);
                    })
    }

    return (
    <div>
        <div>
            <div>
                <h2>답글 부모글</h2>
                <br />
                <table className="table">
                    <tbody>
                    <tr>
                        <th className="table-primary" >아이디</th>
                        <td>
                            <input type="text" className="form-control" id="id" name="id" size="50px" value={locId} readOnly/>
                        </td>
                    </tr>
                    
                    <tr>
                        <th className="table-primary">제목</th>
                        <td>
                            <input type="text" className="form-control" name="title" size="50px" value={locTitle} readOnly/>
                        </td>
                    </tr>
                    
                    <tr>
                        <th className="table-primary">내용</th>
                        <td>
                            <textarea className="form-control" rows="10" name="content" value={locContent} readOnly></textarea>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div>
            <div>
                <h2>댓글 작성</h2>
                <br />
                <table className="table">
                    <tbody>
                    <tr>
                        <th className="table-primary" >아이디</th>
                        <td>
                            <input type="text" className="form-control" id="id" name="id" size="50px" value={id} readOnly/>
                        </td>
                    </tr>
                    
                    <tr>
                        <th className="table-primary">제목</th>
                        <td>
                            <input type="text" className="form-control" name="title" size="50px" value={title} onChange={titleChange}/>
                        </td>
                    </tr>
                    
                    <tr>
                        <th className="table-primary">내용</th>
                        <td>
                            <textarea className="form-control" rows="10" name="content" value={content} onChange={ContentChange}></textarea>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className="my-5 d-flex justify-content-center">
                    <button type="button" className="btn btn-primary" onClick={answerBtn} >댓글달기</button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Answer;