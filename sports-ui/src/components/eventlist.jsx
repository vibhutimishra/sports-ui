import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import Events from './events';


function EventList() {
    return (
        <>
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
                <Events />
            </div>
        </div>
        </>
    );
}

export default EventList;
