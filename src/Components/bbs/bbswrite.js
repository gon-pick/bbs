import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom"

function Bbswrite(){

    //insert bbs
    const id = localStorage.getItem('user_id');
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    //isnert check
    let history = useNavigate();

    const fetchData = async (i,t,c) => {
        await axios.get("http://localhost:3000/writeBbs", { params:{"id":i, "title":t, "content":c}})
                    .then(function(resp){
                        console.log(resp.data);

                        if(resp.data==="NO"){
                            alert("게시판을 작성할 수 없습니다.");
                        }else if(resp.data==="OK"){
                            alert("게시판을 작성했습니다.")
                            history('/bbslist');
                        }
                    })
                    .catch(function(error){
                        alert("없는 아이디 입니다.");
                    })
    }
    const titleChange = (e) => setTitle(e.target.value);
    const ContentChange = (e) => setContent(e.target.value);

    const checkBtn = () => {
        fetchData(id,title,content);
    }

    return (
        <div>
            <div>
                <div>
                    <table className="table">
                        <tbody>
                        <tr>
                            <th className="table-primary" >아이디</th>
                            <td>
                                <input type="text" className="form-control" id="id" name="id" size="50px" value={id}/>
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
                        <button type="button" className="btn btn-primary" onClick={checkBtn}>글쓰기</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bbswrite;