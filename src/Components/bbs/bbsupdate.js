import axios from "axios";
import {useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';

function Bbsupdate() {
    const location = useLocation();
    const locSeq = location.state.seq;
    const locId = location.state.id;
    const locTitle = location.state.title;
    const locContent = location.state.content;

    const [title, setTitle] = useState(locTitle);
    const [content, setContent] = useState(locContent);

    const titleChange = (e) => setTitle(e.target.value);
    const ContentChange = (e) => setContent(e.target.value);

    let history = useNavigate();

    const updateBtn = () => {
        fetchData(locSeq,title,content);
    }

    const fetchData = async (s,t,c) => {
        await axios.get("http://localhost:3000/UpdateBbsReact", { params:{"seq":s, "title":t, "content":c}})
                    .then(function(resp){
                        if(resp.data==="OK"){
                            alert("게시물 변경이 완료됐습니다.");
                            history('/bbsdetail',{
                                state: {
                                    seq: locSeq,
                                }
                            })
                        }else if(resp.data==="NO"){
                            alert("게시물이 업데이트 되지 않았습니다.");
                        }else{
                            alert(resp.data);
                        }
                    })
                    .catch(function(error){
                        alert(error);
                    })
    }

    return (
    <div>
        <div>
            <div>
                <h2>게시물 수정페이지</h2>
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
                    <button type="button" className="btn btn-primary" onClick={updateBtn} >글수정</button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Bbsupdate;