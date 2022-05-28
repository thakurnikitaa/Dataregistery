import React,{useState, useEffect} from 'react'
import { View } from './components/View';

// getting the values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('Data_list');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const App = () => {

  // main array of objects state || Data_list state || Data_list array of objects
  const [Data_list, setData_list]=useState(getDatafromLS());

  // input field states
  const [Name, setName]=useState('');
  const [Email, setEmail]=useState('');
  const [Phone, setPhone]=useState('');

  // form submit event
  const handleAddData_listubmit=(e)=>{
    e.preventDefault();
    // creating an object
    let book={
      Name,
      Email,
      Phone
    }
    setData_list([...Data_list,book]);
    setName('');
    setEmail('');
    setPhone('');
  }

  // delete book from LS
  const deleteBook=(Phone)=>{
    const filteredData_list=Data_list.filter((element,index)=>{
      return element.Phone !== Phone
    })
    setData_list(filteredData_list);
  }

  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('Data_list',JSON.stringify(Data_list));
  },[Data_list])

  return (
    <div className='wrapper'>
      <h1>Data_list</h1>
      <p>Add and view your Data_list using local storage</p>
      <div className='main'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
          onSubmit={handleAddData_listubmit}>
            <label>Name</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setName(e.target.value)} value={Name}></input>
            <br></br>
            <label>Email</label>
            <input type="email" className='form-control' required
            onChange={(e)=>setEmail(e.target.value)} value={Email}></input>
            <br></br>
            <label>Phone#</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setPhone(e.target.value)} value={Phone}></input>
            <br></br>
            <button type="submit" className='btn btn-success btn-md'>
              ADD
            </button>
          </form>
        </div>

        <div className='view-container'>
          {Data_list.length>0&&<>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Phone#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <View Data_list={Data_list} deleteBook={deleteBook}/>
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger btn-md'
            onClick={()=>setData_list([])}>Remove All</button>
          </>}
          {Data_list.length < 1 && <div>No Data_list are added yet</div>}
        </div>

      </div>
    </div>
  )
}

export default App