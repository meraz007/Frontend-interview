import Partition from "./Partition";
import getRandomColor from "../common";
import React, { useState } from "react";

const Layout = () => {
    const [partitions, setPartitions] = useState([
        { 
            id: 1, 
            color: getRandomColor(), 
            direction: null, 
            children: [] 
        },
    ]);

    const dividePartition = (partition, id, direction) => {
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
                dividePartition(child, id, direction)
            ),
            };
        }

        return partition;
    };

    const removePatitation = (partition, id) => {
        // If the partition is found, remove it
        if (partition.id === id) {
          return null;
        }
    
        // If there are children, we need to filter them out if they match the `id`
        if (partition.children.length > 0) {
            const updatedChildren = partition.children
                .map((child) => removePatitation(child, id))
                .filter((child) => child !== null); // Remove null children
        
            return { ...partition, children: updatedChildren };
        }
    
        return partition;
    };

    const handleRemove = (id) => {
        const newPartitions = partitions
        .map((partition) => removePatitation(partition, id))
        .filter((partition) => partition !== null); // Remove null partitions
        setPartitions(newPartitions);
    };

    const handleDivide = (id, direction) => {
        const newPartitions = partitions.map((partition) =>
            dividePartition(partition, id, direction)
        );

        setPartitions(newPartitions);
    };

    const renderPartition = (partition) => {
        if (partition.children.length === 0) {
            return (
                <Partition 
                    key={partition.id} 
                    partition={partition} 
                    onDivide={handleDivide}
                    onRemove={handleRemove}
                />
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