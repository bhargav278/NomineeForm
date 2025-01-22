import { useEffect, useState } from "react";
import { object, string, date } from 'yup';
import axios from "axios";
import { useContext } from "react";
import AppContext from "./Contex";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Update(){

    const {id} = useParams();

    const {data,setData} =  useContext(AppContext);
    const [error,setError] = useState("");
    const [toggle,setToggle] = useState(false);

    let pincodeValidation = object({
        pincode :string().required().matches(/^[0-9]+$/, "Must be only digits").min(6, 'Must be exactly 6 digits').max(6, 'Must be exactly 6 digits') 
    })
    useEffect(()=>{
        localStorage.setItem('data',JSON.stringify(data));
        setError("");
    },[data])

    let nomineeSchema = object({
        id: string().required(),
        name: string().required(),
        relationship: string().required(),
        dob: date().max(new Date()).required(),
        permanantAddress : string().required(),
        currentAddress : string(),
        pincode :string().required().matches(/^[0-9]+$/, "Must be only digits").min(6, 'Must be exactly 6 digits').max(6, 'Must be exactly 6 digits'),
        city : string().required(),
        state : string().required(),
        country : string().required()
      });

    let obj = data.filter((obj)=>obj.id===id);
    obj = obj[0];
    const [objData,setObjData] = useState(obj);
    // console.log(obj);
    let navigate = useNavigate();

    async function handleSubmit(e){  
        e.preventDefault();

        

        console.log("working")
        try{
            let user =await nomineeSchema.validate(objData);
            let updatedData = data.map((info)=>
                (info.id==id) ? user : info
            )
    
            setData(updatedData);
            navigate('/')
        }
        catch(e){
            setError(e.message)
        }
    }

    async function handleFetching(e){
        try{
            const {name,value}  = e.target;
        setObjData((prev)=>(
            {...prev,[name]:value}
        ))
        if(value.length === 6 ){
            let validPincode = await pincodeValidation.validate({pincode :value});
            
            let data =await axios.get(`https://api.postalpincode.in/pincode/${validPincode.pincode}`);
            if(data?.data[0]?.Status==="Error") throw new Error("Not valid pincode")
            const {District , State , Country} = data?.data[0]?.PostOffice[0]
            setObjData((prev)=>({...prev,city:District,state:State ,country : Country}))

        }
        else{
            setObjData((prev)=>({...prev,city:"",state:"" ,country : ""}))
        }
        }
        catch(e){
            setError(e.message);
        }
        

    }
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      };


    function handleChange(e){
        const {name,value} = e.target;
        setObjData((prev)=>(
            {...prev,[name]:value}
        ))
    }

    return(
        <div className="add-container">
        <h1 className="add-title">Update Nominee</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-container">
                <div className="div-1">
                    <label>
                            Relationship :
                        <select  name="relationship" onChange={handleChange} >
                        <option >Select</option>
                            <option value="Spouse" >Spouse</option>
                            <option value="Parent">Parent</option>
                            <option value="Child">Child</option>
                            <option value="Sibling">Sibling</option>
                            <option value="Grandparent">Grandparent</option>
                            <option value="Grandchild">Grandchild</option>
                            <option value="Friend">Friend</option>
                            <option value="Relative">Relative</option>
                            <option value="Partner">Partner</option>
                            <option value="Legal Guardian">Legal Guardian</option>
                        </select>
                    </label>
                    <label>
                            Nominee Name  :
                        <input type="text" name="name" value={objData.name} onChange={handleChange} required />
                    </label>
                </div>
                <label className="dob">
                        Date of Birth :
                    <input type="date" name="dob" value={formatDate(new Date(objData.dob))} onChange={handleChange} required />
                </label>
                <div>Address : 
                    <label className="radio">
                        <input type="radio" name="addr"  onChange={()=>setToggle(false)}/>
                        Field to Enter Complete Address
                    </label>
                    <label className="radio">
                        <input type="radio" name="addr" onChange={()=>setToggle(true)}/>
                        Same as my address
                    </label >
                    <div><textarea name="currentAddress" disabled={(toggle)?true :false} onChange={handleChange} value={(toggle)?objData.permanantAddress:objData.currentAddress}></textarea></div>
                </div>
                <div>
                    <label >
                        <span className="addr-data">Pincode : </span>
                        <input type="number" name="pincode" value={objData.pincode} onChange={handleFetching} required/>
                    </label>
                    <br />
                    <label >
                    <span className="addr-data">City : </span>
                        <input type="text" name="city" value={objData.city} disabled />
                    </label><br />
                    <label >
                    <span className="addr-data">State : </span>
                        <input type="text" name="state" value={objData.state} disabled />
                    </label><br />
                    <label >
                    <span className="addr-data">Country : </span>
                        <input type="text" name="country" value={objData.country} disabled />
                    </label>
                </div>
                {
                    (error)? <div>{error}</div> : <></>
                }
                

            </div>
            <button className="btn green" type="submit">Update</button>
            <button className="btn red"><Link className="link" to="/">Cancel</Link></button>
        </form>
    </div>
    )
}

export default Update