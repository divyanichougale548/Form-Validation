import React, { useEffect, useState } from 'react';
import'./LoginSignup/Loginsignup.css';
function FormValidation() {
 
    const initialvalues ={username:"",email:"",password:""};
    const [formValues,setFormValues]=useState(initialvalues);
    const [formErros,setFormErros]=useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange =(e)=>{
         const {name,value}=e.target;
        setFormValues({...formValues,[name]:value});
    };
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        setFormErros (validate(formValues));
        setIsSubmit(true);
    };

    const validate =(values)=>{
      const errors = {};
      const Regex =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!values.username){
        errors.username ="Username is required!";
      }
      if(!values.email){
        errors.email ="Email is required!";
      } else if (!Regex.test(values.email)){
         errors.email = "This is not a valide email format!"
      }
      if(!values.password){
        errors.password ="Password is required!";
      }else if (values.password.length < 4){
        errors.password = "Password cannot be less than 4 char "
     }
     else if (values.password.length > 10){
        errors.password = "Password cannot exceed more than 10 char"
     }
      return errors;
    ;}

    useEffect (()=>{
        console.log(formErros);
        if(Object.keys(formErros).length === 0 && isSubmit){
            console.log(formValues)
        }
    },[formErros]);

  return (
   <div className='container'>
        {Object.keys(formErros).length === 0 && isSubmit ? (
        <div>Signed in Successfilly</div>):(
        <pre>{JSON.stringify(formValues,undefined,2)}</pre>
        )}
    <form onSubmit={handleSubmit}>
        <h1 className='header'> Login Form </h1>
        <div className='inputs'>
        <div>
            <label>UserName</label>
            <input className='input' type='text' name='username' placeholder='Username' value={formValues.username} onChange={handleChange}></input>
        </div>
        <p>{formErros.username}</p>
        <div >
            <label>Email</label>
            <input className='input' type='email' name='email' placeholder='Email' value={formValues.email} onChange={handleChange}></input>
        </div>
        <p>{formErros.email}</p>
        <div >
            <label>Password</label>
            <input  className='input'type='password' name='password' placeholder='Password' value={formValues.password} onChange={handleChange}></input>
        </div>
        </div>
       
        <p>{formErros.password}</p>
        <button style={{color:"blue", height:40,width:80,backgroundColor:"gary"}}> Submit</button>
    </form>
   </div>
  );
}

export default FormValidation;
