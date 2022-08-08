import axios from "axios";
import {useState, useEffect} from "react";
import {useLocation, useNavigate} from 'react-router-dom';

function Bbsdetail() {
    const location = useLocation();
    const seq = location.state.seq;
    
    //detail bbs
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [review, setReview] = useState("");

    //reply bbs
    const [bbsreplay, setBbsreply] = useState([]);
    //const[totalCnt, setTotalCnt] = useState(0);
    const replyid = localStorage.getItem('user_id');;
    const[replyContent, setReplyContent] = useState("");

    const ContentChange = (e) => setReplyContent(e.target.value);

    let history = useNavigate();

    const fetchData = async () => {
        await axios.get("http://localhost:3000/getBbsReactdetail", { params:{"seq":seq}})
                    .then(function(resp){
                        setId(resp.data.id);
                        setTitle(resp.data.title);
                        setContent(resp.data.content);
                    })
                    .catch(function(error){
                        console.log(error);
                    })
    }

    const fetchData2 = async () => {
        await axios.get("http://localhost:3000/deleteBbsReact",{ params: {"seq":seq}})
                    .then(function(resp){
                        alert("게시물이 삭제되었습니다.");
                        history('/bbslist');
                    })
                    .catch(function(error){
                        alert("게시물이 삭제되지 않았습니다.");
                    })
    }

    const fetchreplay = async () => {
        await axios.get("http://localhost:3000/getReply",{params: {"seq" : seq}})
                    .then(function(resp){
                        setBbsreply(resp.data.bbsreply);
                        //setTotalCnt(resp.data.cnt);
                    })
                    .catch(function(error){
                        alert("답글 조회가 불가능합니다.");
                    })
    }
    
    const fetchinsertReply = async(i,c,s) => {
        await axios.get("http://localhost:3000/insertReply",{params: {"id":i,"content":c,"bbsSeq":s}})
        .then(function(resp){
            alert("답글이 작성됐습니다.");
            fetchreplay();
        })
        .catch(function(error){
            alert("답글이 작성 오류");
        })
    }

    const fetchdelReply = async(s) => {
        await axios.get("http://localhost:3000/deleteReply",{params : {"seq":s}})
                    .then(function(resp){
                        alert("답글을 삭제했습니다.");
                        fetchreplay();
                    })
                    .catch(function(error){
                        alert("답글 삭제 못했습니다.");
                    })
    }

    const fetchreview = async(id,bbsseq) => {
        await axios.get("http://localhost:3000/view",{params : {"id":id,"bbsseq":bbsseq}})
                    .then(function(resp){
                        setReview(resp.data);
                    })
                    .catch(function(error){
                        alert(error);
                    })
    }
    
    const updateBtn = () => {
        if(id !== replyid){
            alert("작성자만 수정가능합니다.")
        }else{
            alert("게시물을 수정하세요.");

            history('/bbsupdate',{
                state: {
                    seq: seq,
                    id: id,
                    title: title,
                    content: content
                }
            })
        }
        
    }

    const listBtn = () => {
        history('/bbslist');
    }

    const answerBtn = () => {
        history('/answer',{
            state: {
                seq: seq,
                id: id,
                title: title,
                content: content
            }
        })
    }

    const deleteBtn = () => {
        if(id !== replyid){
            alert("작성자만 삭제가능합니다.")
        }else{
            fetchData2();
        }
    }

    const replyBtn = () => {
        if(replyid===null || replyid.trim()===""){
            alert("id를 입력하세요.");
            return;
        }
        if(replyContent===null || replyContent.trim()===""){
            alert("내용을 입력하세요.");
            return;
        }

        fetchinsertReply(replyid,replyContent,seq);  
        setReplyContent("");
    }

    useEffect( () => {
        fetchData();
        fetchreplay();
        fetchreview(replyid,seq);
    },[]);

    
    const TableRow = (props) => {
        const deleteReply = () => {
            if(props.obj.id !== replyid){
                alert("작성자만 제거 가능합니다.");
            }else{
                fetchdelReply(props.obj.seq);
            }
        };

        return(
            <tr>
                <th>{props.cnt}</th>
                <td id="modid">{props.obj.id}</td>
                <td id="modcontent">{props.obj.content}</td>
                <td><button type="button" className="btn btn-primary" onClick={deleteReply} >답글삭제</button></td>
                <td>{props.obj.wdate}</td>
            </tr>
        );
    }

    return (
        <div>
        <div>
            <div>
                <h2>게시물 상세페이지</h2>
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
                            <input type="text" className="form-control" name="title" size="50px" value={title} readOnly/>
                        </td>
                    </tr>

                    <tr>
                        <th className="table-primary">조회수</th>
                        <td>
                            <input type="text" className="form-control" name="review" size="50px" value={review} readOnly/>
                        </td>
                    </tr>
                    
                    <tr>
                        <th className="table-primary">내용</th>
                        <td>
                            <textarea className="form-control" rows="10" name="content" value={content} readOnly></textarea>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className="my-5 d-flex justify-content-center">
                    <button type="button" className="btn btn-primary" onClick={updateBtn} style={{margin:"10px"}} >글수정  </button> 
                    <button type="button" className="btn btn-primary" onClick={deleteBtn} style={{margin:"10px"}} >글삭제</button> 
                    <button type="button" className="btn btn-primary" onClick={listBtn} style={{margin:"10px"}} >글목록</button> 
                    <button type="button" className="btn btn-primary" onClick={answerBtn} style={{margin:"10px"}}>댓글쓰기</button>
                </div>

                <table className="table">
                    <tbody>
                    <tr>
                        <th className="table-primary" >작성자 </th>
                        <td>
                            <input type="text" className="form-control" id="replyid" name="id" size="50px" value={replyid} readOnly/>
                        </td>
                        <td width="150">
                            <button type="button" className="btn btn-primary" onClick={replyBtn} >답글쓰기</button>
                        </td>
                    </tr>
                    <tr>
                        <th className="table-primary">내용</th>
                            <td colSpan="2">
                                <textarea className="form-control" rows="3" name="content" value={replyContent} onChange={ContentChange}></textarea>
                            </td>
                    </tr>
                    </tbody>
                </table>

                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th width="70">번호</th>
                        <th width="120">작성자</th>
                        <th >내용</th>
                        <th width="120">삭제</th>
                        <th width="120">작성시간</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        bbsreplay.map( function(object, i){ 
                            return (
                                <TableRow obj={object} key={i} cnt={i + 1} />
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    );
}

export default Bbsdetail;