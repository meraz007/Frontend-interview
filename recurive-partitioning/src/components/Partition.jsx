import React from "react";

const Partition = ({ partition, onDivide }) => {
    return (
        <>
          <div
              className="border border-gray-300 h-full w-full flex flex-col justify-center items-center"
              style={{
                height: "100%",
                width: "100%",
                backgroundColor:partition.color
              }}
            >
              <div className="">
                  <button
                    className="bg-gray-700 text-white px-2 py-1 mr-2 rounded"
                    onClick={() => onDivide(partition.id, "horizontal")}
                  >
                    H
                  </button>
                  <button
                    className="bg-gray-700 text-white px-2 py-1 rounded"
                    onClick={() => onDivide(partition.id, "vertical")}
                  >
                    V
                  </button>
              </div>
          </div>
        </>
    )
}

export default Partition