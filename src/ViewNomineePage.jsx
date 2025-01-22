import { Link, useParams } from "react-router-dom"
import { useContext, useEffect } from "react";
import AppContext from "./Contex";
import { useNavigate } from "react-router-dom";

function ViewNomineePage() {
    const { id } = useParams();
    const { data ,setData } = useContext(AppContext);
    const navigate = useNavigate();

    let obj = data.filter((obj) => obj.id === id);
    obj = obj[0];
    console.log(obj);
    let date = new Date(obj.dob);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, '0');

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data));
    }, [data])

    function handleDelete(id) {
        let filteredData = data.filter((info) => info.id != id);
        setData(filteredData);
        navigate("/");
    }


    return (
        <div className="details-container" >
            <div className="details">
                <div>Name :  {obj.name}</div>
                <div>DOB :  {`${year}-${month}-${day}`}</div>
                <div>Address :  {obj.currentAddress || obj.permanantAddress}</div>
                <div>Pincode :  {obj.pincode}</div>
                <div>City :  {obj.city}</div>
                <div>State :  {obj.state}</div>
                <div>Country : {obj.country}</div>
                <div>
                    <button className="btn green"><Link className="link" to="/">Home</Link></button>
                    <button className="btn green"><Link className="link" to={`/update/${id}`}>Update</Link></button>
                    <button className="btn red" onClick={() => { handleDelete(id) }}> Delete</button>
                </div>
            </div>
        </div>
    )
}

export default ViewNomineePage