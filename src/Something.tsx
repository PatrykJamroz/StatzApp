// import React, { useEffect, useState } from 'react';
//
// export function Something(): JSX.Element {
//     const [activitiesList, setActivitiesList] = useState([]);
//     const login = () => {
//         window.open('http://localhost:8080/auth/strava', '_self');
//     };
//
//     const [user, setUser] = useState(null);
//     const [activities, setActivities] = useState(null);
//
//     const fetchUser = async () => {
//         const userPromise = await fetch('./user');
//         const loggedUser = await userPromise.json();
//         setUser(loggedUser);
//     };
//
//     const fetchActivities = async () => {
//         const activitiesPromise = await fetch(`/activities`);
//         const activitiesData = await activitiesPromise.json();
//         setActivities(activitiesData);
//     };
//
//     useEffect(() => {
//         fetchUser();
//     }, []);
//
//     return (
//         <div>
//             <p>StravaStats</p>
//             {!user && (
//                 <button type="button" onClick={login}>
//                     <img src="btn_strava_connectwith_orange.png" />
//                 </button>
//             )}
//             {user && (
//                 <>
//                     <img src="https://dgalywyr863hv.cloudfront.net/pictures/athletes/30743339/9214019/7/medium.jpg" />
//                     <p>{user.displayName}</p>
//                     <button type="button" onClick={fetchActivities}>
//                         Fetch activities
//                     </button>
//                 </>
//             )}
//             {activities && JSON.stringify(activities)}
//         </div>
//     );
// }
