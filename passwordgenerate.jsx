import React, { useState,useCallback,useEffect,useRef} from 'react'

const passwordgenerate = () => {
  //length of password 
  const[length,setlength]=useState(8);
  //Number in password
  const[numberallow,setnumberallow]=useState('false');
  //character in password
  const [charallow,setcharallow]=useState('false');
  //pasword input box 
  const [password,setpassword]=useState('');
  const passwordref=useRef(()=>{})
//generate the password using callback
const generatePassword=useCallback(()=>{
  let  pass=""
  //password string 
  let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  //here if char or number TRUE to use it values 
    if (numberallow) str += '0123456789'
  if (charallow) str += '!@#$%^&*()_+~`|}{[]\:;?><,./-='
//loop so its change multiple time character in password
  for (let i = 1; i < length; i++) {
     const char=Math.floor(Math.random() * str.length+1)
     pass +=str.charAt(char) //appending password at character
    
  }
  setpassword(pass)
  // optimization allow while change 
},[length,charallow,numberallow])
 
//copypassword function 
const copyPasswordToClipboard=()=>{
   window.navigator.clipboard.writeText(password);
   passwordref.current.select() //select password in blue line
}


useEffect(()=>{
    generatePassword()
},[length,numberallow,charallow])
  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg  my-8 bg-gray-900 text-white'>
        <h1 className='text-white text-center mb-2 text-2xl'> Auto Password Generator</h1>  
        <div className=' flex shadow rounded-lg overflow-hidden mb-4'>  
          <input
           type="text" 
          value={password} //default value is password
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly  
          ref={passwordref}

          />
          <button 
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2' >
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={8}
            max={20}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>setlength(e.target.value)}
             name=""
              id="" />
          </div>
           {/*{length} is use for how much length user can select and labeluse for slider*/}
          <label htmlFor="length">Length:{length}</label> 
       </div>
     
          <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked={numberallow}
            onChange={(e)=>{setnumberallow((prev)=>!prev)} }
            name="" 
            id="" />
            <label htmlFor="number">Numbers</label>
      </div>
       <div className='flex items-center gap-x-1'>
            <input 
            type="checkbox" 
            defaultChecked={charallow}
            onChange={()=>{setcharallow((prev)=>!prev)} }
            name="" 
            id="" />
            <label htmlFor="char">Chararcter</label>

           
          
       </div>

    </div>
    
     
  )
}

export default passwordgenerate

