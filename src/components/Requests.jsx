import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {
                withCredentials: true
            });
            dispatch(removeRequest(_id));
        } catch (err) {
            console.log(err);
        }
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/request", {
                withCredentials: true
            });
            dispatch(addRequests(res.data.data));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) return;

    if (requests.length == 0) return <h1 className="flex justify-center my-10">No requests found!!</h1>

    return (
        <div className="text-center my-10 px-4">
            <h1 className="font-bold text-white text-3xl mb-6">Connection Requests</h1>
            {requests.map((request) => {
                const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
                return (
                    <div key={_id} className="flex flex-col sm:flex-row items-center sm:justify-between p-4 rounded-lg bg-base-300 w-full sm:w-3/4 lg:w-1/2 mx-auto my-4 shadow-md">
                        <div className="mb-3 sm:mb-0">
                            <img alt="User" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full" src={photoUrl} />
                        </div>
                        <div className="text-center sm:text-left sm:mx-4">
                            <h2 className="font-bold text-lg sm:text-xl">{firstName} {lastName}</h2>
                            {age && gender && <p className="text-sm">{age}, {gender}</p>}
                            <p className="text-sm">{about}</p>
                        </div>
                        <div className="flex flex-row mt-3 sm:mt-0">
                            <button className="btn btn-primary mx-1 sm:mx-2 px-3 py-2 text-sm sm:text-base" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                            <button className="btn btn-secondary mx-1 sm:mx-2 px-3 py-2 text-sm sm:text-base" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Requests;