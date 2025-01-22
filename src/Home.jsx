import { Link } from "react-router-dom"
import { useContext, useEffect } from "react"
import AppContext from "./Contex"

function Home() {
    const { data, setData } = useContext(AppContext);

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data));
    }, [data])

    function handleDelete(id) {
        let filteredData = data.filter((info) => info.id != id);
        setData(filteredData);
    }


    return (
        <div className="container">
            <h1 className="title">All Nominees</h1>
            <button className="add-btn" ><Link className="link" to="/add">Add +</Link></button>
            <div className="card-container">
                {
                    data.map((info) =>
                        <div key={info.id} className="card">
                            <div>Name : {info.name}</div>
                            <div>City : {info.city}</div>
                            <Link className="see-more" to={`/nominee/${info.id}`}>See more...</Link>
                            <div>
                                <button className="btn green"><Link className="link" to={`/update/${info.id}`}>Update</Link></button>
                                <button className="btn red" onClick={() => { handleDelete(info.id) }}> Delete</button>
                                
                            </div>

                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Home