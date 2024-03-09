import { useState , useCallback , useEffect ,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed]= useState(false);
  const [characterAllowed,setcharacterAllowed]= useState(false);
  const[password,setPassword]=useState("");

  const passwordRef=useRef(null)
  
  const passwordGenerator= useCallback(() => 
  {
    let pass=""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed){
      str =str+"0123456789";
    }
    if(characterAllowed){
      str=str+"#$%^&*(){}[]"
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1); // Using Math.random() JS concept to generate random value
      pass = pass+ str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(() => 
  {
    //PASSWORD GENERATOR FUNCTION
    passwordGenerator()
  },
  [length,numberAllowed,characterAllowed,passwordGenerator]
  )

  //COPYPASSWORD FUNCTION
  const copyPasswordToClipBoard= useCallback(()=>{
    passwordRef.current?.select(); //optimisation to give user highlighted text that the password is slected 
    passwordRef.current?.setSelectionRange(0,100); 
    window.navigator.clipboard.writeText(password)
  },
  [password])

  return (
    <>
    <div className= " flex justify-center items-start mt-8  text-green-500 text-xl">PASSWORD GENERATOR</div>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-600 bg-gray-700">
        <div className="flex shadow rounded-lg overflow-hidden mb-4 my-3 py-4">
          <input 
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 rounded-l-xl"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipBoard} className="bg-blue-700 py-2 px-3 rounded-e-xl text-white transition-transform transform active:scale-95">COPY</button>
        </div>
        <div className="flex text-sm gap-x-2 py-1">
          <div className="flext items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={length} // Fix variable name
              className="cursor-pointer"
              onChange={(e) => {setLength(e.target.value)}}

            />

            <label> Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
            />
            <label htmlFor="numberInput">Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={characterAllowed}
            id="characterInput"
            onChange={() => {
              setcharacterAllowed((prev) => !prev);
            }}
            />
            <label htmlFor="characterInput">Character
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
export default App
