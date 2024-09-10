import React, {useState} from "react";

const GridLayout = () => {
    const [outputString, setOutputString] = useState("")
    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

    const handleAlphabet = (letter) => {
        let newString = outputString + letter;

        if (newString.length >= 3) {
            const lastThree = newString.slice(-3);
            if (lastThree[0] === lastThree[1] && lastThree[1] === lastThree[2]) {
                newString = newString.slice(0, -3) + "_";
            }
        }
            setOutputString(newString);
        }

    return (
        <>
        <div className="flex flex-col">
            <div className="mt-20 py-12 flex items-center justify-center">
                <div className="grid grid-cols-6 gap-4 p-4">
                    {alphabet.map((letter, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center bg-blue-500 text-white text-2xl font-bold h-16 w-16 rounded-lg cursor-pointer"
                        onClick={() => handleAlphabet(letter)}
                    >
                        {letter}
                    </div>
                    ))}
                </div>
            </div>
            
            <div className="flex justify-center mb-10">
                <div className="text-white font-bold capitalize w-1/2 bg-blue-500 py-4 flex flex-col">
                    <span>output String</span>
                    <div className="flex justify-center py-2">
                        <span className="text-black">
                            {outputString}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default GridLayout