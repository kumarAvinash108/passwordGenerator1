import { useState, useCallback, useEffect,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolAllowed, setSymbolAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copyStatus, setCopyStatus] = useState(false);
const passwordRef = useRef(null);

  let passwordGenerator = useCallback(() => {
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) string += "0123456789";
    if (symbolAllowed) string += "!@#$%^&*()_+";
    let pass = "";
    for (let i = 0; i < length; i++) {
      pass += string.charAt(Math.floor(Math.random() * string.length) + 1);
    }
    setPassword(pass);
  }, [numberAllowed, symbolAllowed, length, setPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [symbolAllowed, numberAllowed, passwordGenerator]);

  return (
    <>
      <h1 className="text-5xl text-white font-normal text-center">
        Password Generator{" "}
      </h1>
      <div className="w-full h-[50vh] mt-[2vh] flex justify-center ">
        <div className="w-[50%] h-[48%] bg-gray-700 rounded-xl flex item-center justify-center flex-col">
          <div className="w-full h-fit flex px-2 ">
            <input
              type="text"
              readOnly
              value={password}
              ref={passwordRef}
              className="w-[70%] py-2 mt-[1vh] outline-1 rounded-md text-orange-900"
            />

            <button
              className="px-4 text-lg rounded-md text-white  mt-[1vh]"
              style={
                copyStatus
                  ? { backgroundColor: "green" }
                  : { backgroundColor: "blue" }
              }
              onClick={() => {
                passwordRef.current.select();
                setCopyStatus(!copyStatus);
                setTimeout(() => {
                  setCopyStatus(false);
                }, 2000);
                navigator.clipboard.writeText(password);
              }}
            >
              {copyStatus ? "copied" : "copy"}
            </button>
          </div>
          <div className="w-[60%] h-[10vh] mx-2  flex items-center justify-center overflow-auto">
            <input
              type="range"
              name="range"
              max={100}
              min={8}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="range" className="text-red-900">
              Length: {length}
            </label>
            <input
              type="checkbox"
              name="number"
              onChange={() => {
                setNumberAllowed(!numberAllowed);
              }}
              className="ml-2"
            />
            <label htmlFor="number" className="text-red-900">
              Number
            </label>
            <input
              type="checkbox"
              name="symbol"
              onChange={() => {
                setSymbolAllowed(!symbolAllowed);
              }}
              className="ml-2"
            />
            <label htmlFor="symbol" className="text-red-900">
              Symbol
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
