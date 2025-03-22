import React from 'react';

const plotActivityStartTime = (eldData) => {
    if (!Array.isArray(eldData)) return null;

    const statusMapping = {
        offDuty: 0,
        sleeperBerth: 1,
        driving: 2,
        onDuty: 3
    };

    const containerWidth = 1200; // Assuming EldContainer's width is 1200px
    const containerHeight = 400; // Assuming EldContainer's height is 400px
    const hoursPerDay = 24;
    const pixelsPerHour = containerWidth / hoursPerDay;
    const pixelsPerStatus = containerHeight / Object.keys(statusMapping).length;

    const renderDots = eldData.map((activity, index) => {
        const { statusType, startHour } = activity;

        const x = startHour * pixelsPerHour;
        const y = statusMapping[statusType] * pixelsPerStatus + pixelsPerStatus / 2; // Centering the dot vertically within its status row

        return (
            <div
                key={index}
                style={{
                    position: 'absolute',
                    left: `${x}px`,
                    top: `${y}px`,
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'red',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
            />
        );
    });

    return <>{renderDots}</>;
};

export default plotActivityStartTime;
