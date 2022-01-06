import { useEffect, useState } from 'react';
import { getUser } from '../../../api/api';

export default function Dashboard() {
  const [username, setUsername] = useState('loading...');

  useEffect(() => {
    getUser()
      .then((res) => {
        console.log(res.data);

        if (res.data) setUsername(res.data.username);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.err);
        }
      });
  }, []);
  return (
    <div
      style={{
        height: '100%',
        width: '100wh',
        display: 'grid',
        justifyItems: 'center',
        alignContent: 'center',
      }}
    >
      <div>Здравствуйте! {username}</div>
      {/* <div>
        <button onClick={
         () => {
          logout()
         } 
        }>logout</button>
      </div> */}
    </div>
  );
}
