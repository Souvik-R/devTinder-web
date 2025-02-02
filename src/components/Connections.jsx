import axios from 'axios';
import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { connect, useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length == 0) return <h1 className="flex justify-center my-10">No connections found!!</h1>

  return (
    <div className="text-center my-10 px-4">
      <h1 className="font-bold text-white text-3xl mb-6">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
        return (
          <div key={_id} className="flex flex-col sm:flex-row items-center sm:justify-start p-4 rounded-lg bg-base-300 w-full sm:w-3/4 lg:w-1/2 mx-auto my-4 shadow-md">
            <div className="mb-3 sm:mb-0">
              <img alt="User" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full" src={photoUrl} />
            </div>
            <div className="text-center sm:text-left sm:ml-4">
              <h2 className="font-bold text-lg sm:text-xl">{firstName} {lastName}</h2>
              {age && gender && <p className="text-sm">{age}, {gender}</p>}
              <p className="text-sm">{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Connections