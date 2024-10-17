import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventsRequest, fetchLogoutRequest, fetchRegisteredEvent, registerEvent, unregisterEvent, updateMessage } from '../../store/actions/sportsActions';


function Events() {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.userId);
  const registered_events = useSelector((state) => state.user.registered_events)['events_registered'];
  const events = useSelector((state) => state.user.events);
  const messageApi = useSelector((state) => state.user.message);
  const status = useSelector((state) => state.user.status);

  useEffect(() => {
    dispatch(fetchEventsRequest());
  }, [dispatch]);

  useEffect(() => {
    if (userId && events) {
      dispatch(fetchRegisteredEvent({ "userId": userId }));
    }
  }, [dispatch, userId, events]);

  const handleRegister = (e) => {
    try {
      dispatch(registerEvent({ "userId": userId, "eventId": e._id }));
      dispatch(fetchRegisteredEvent({ "userId": userId }));
      // setTimeout(() => dispatch(updateMessage('')), 5000);
    } catch (error) {
      const errorMessage = 'Failed to Register for the event. Please try again.';
      // setTimeout(() => dispatch(updateMessage('')), 5000);
    }
  };

  const handleUnregister = (e) => {
    try {
      dispatch(unregisterEvent({ "userId": userId, "eventId": e._id }));
      dispatch(fetchRegisteredEvent({ "userId": userId }));
      // setTimeout(() => dispatch(updateMessage('')), 5000);
    } catch (error) {
      const errorMessage = 'Failed to Remove the event. Please try again.';
      // setTimeout(() => dispatch(updateMessage('')), 5000);
    }
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className='w-full pt-24 bg-gray-100 min-h-screen'>
      {/* Display error message if any */}
      {messageApi && (
        <div
          className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm ${status ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'} px-4 py-3 rounded shadow-md`}
          role="alert"
        >
          <strong className="font-bold">{status ? 'Success!' : 'Error!'}</strong>
          <span className="block sm:inline"> {messageApi}</span>
          <button
            onClick={() => dispatch(updateMessage(''))}
            className="absolute top-0 right-0 px-4 py-2 text-red-600 font-bold"
          >
            &times;
          </button>
        </div>
      )}
      <div className=" flex-1 container mx-auto p-4">
        <h1 className="text-xl font-bold mb-4 text-center">Registered Events</h1>
        {!registered_events || registered_events.length === 0 ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">No Registered Events!</strong>
            <span className="block sm:inline"> You have not registered for any events yet.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registered_events.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                <div class='w-64 p-2 rounded-lg bg-three flex flex-col space-y-4'>
                  <div class='flex flex-col space-y-1'>
                    <h1 class='text-xl font-bold'>{event.event_name}</h1>
                  </div>
                  <div class='flex flex-col space-y-2'>
                    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4">
                      <h2 className="text-lg font-semibold mb-2">Event Timing</h2>
                      <div className="flex flex-col space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 font-medium">Start: </span>
                          <span className="text-gray-800">{formatDateTime(event.start_time)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 font-medium">End:</span>
                          <span className="text-gray-800">{formatDateTime(event.end_time)}</span>
                        </div>
                      </div>
                    </div>
                    <button className="mt-3 bg-black text-[#00df9a] py-1 px-3 rounded hover:bg-blue-600" onClick={() => handleUnregister(event)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>)}
      </div>
      <div className=" flex-1 container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Sports Events</h1>
        {!events || events.length === 0 ? (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">No Sports Events Available!</strong>
            <span className="block sm:inline"> There are currently no sports events to register for.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                <div class='w-64 p-4 rounded-lg bg-three flex flex-col space-y-4'>
                  <div class='flex justify-between items-center'>
                    <div class='flex space-x-2 items-center'>
                      <div class='w-8 h-8 rounded-full bg-gray-800'></div>
                      <div class='text-sm font-medium'>{event.event_category}</div>
                    </div>

                  </div>
                  <div class='flex flex-col space-y-1'>
                    <h1 class='text-xl font-bold'>{event.event_name}</h1>
                  </div>
                  <div class='flex flex-col space-y-2'>
                    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
                      <h2 className="text-2xl font-semibold mb-4">Event Timing</h2>
                      <div className="flex flex-col space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-700 font-medium">Start:</span>
                          <span className="text-gray-900">{formatDateTime(event.start_time)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-700 font-medium">End:</span>
                          <span className="text-gray-900">{formatDateTime(event.end_time)}</span>
                        </div>
                      </div>
                    </div>
                    <button className="mt-3 bg-black text-[#00df9a] py-1 px-3 rounded hover:bg-blue-600" onClick={() => handleRegister(event)}>Register</button>
                  </div>
                </div>
              </div>
            ))}
          </div>)}
      </div>
    </div>
  );
}

export default Events;
