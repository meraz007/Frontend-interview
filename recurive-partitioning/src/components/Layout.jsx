import React, { useState } from "react";
import Partition from "./Partition";
import getRandomColor from "../common";

const Layout = () => {
    const [partitions, setPartitions] = useState([
        { id: 1, color: getRandomColor(), direction: null, children: [] },
    ]);
    // console.log(partitions)
    const applyDivide = (partition, id, direction) => {
        if (partition.id === id && partition.children.length === 0) {
            // Split the partition into two child partitions
            const child1 = {
                id: partition.id * 2,
                color: partition.color, // Retain the old color for the first partition
                direction: null,
                children: [],
            };
            const child2 = {
                id: partition.id * 2 + 1,
                color: getRandomColor(), // Assign a new random color for the second partition
                direction: null,
                children: [],
            };

            // Update the partition with the new children and direction
            return { ...partition, direction, children: [child1, child2] };
        }

        if (partition.children.length > 0) {
            // Recursively update the partition's children
            return {
            ...partition,
            children: partition.children.map((child) =>
                applyDivide(child, id, direction)
            ),
            };
        }

        return partition;
    };

    const handleDivide = (id, direction) => {
        const newPartitions = partitions.map((partition) =>
            applyDivide(partition, id, direction)
        );
        setPartitions(newPartitions);
    };

    const renderPartition = (partition) => {
        if (partition.children.length === 0) {
            return (
                <Partition key={partition.id} partition={partition} onDivide={handleDivide} />
            );
        } else {
            return (
                <div
                key={partition.id}
                className={`flex ${partition.direction === "horizontal" ? "flex-col" : "flex-row"} w-full h-full`}
                >
                {partition.children.map((child) => renderPartition(child))}
                </div>
            );
        }
    };

    return (
        <div className="h-[600px] flex justify-center items-center bg-gray-100">
            <div className="w-3/4 h-3/4 border border-gray-300">
                {partitions.map((partition) => renderPartition(partition))}
            </div>
        </div>
    );
}

export default Layout