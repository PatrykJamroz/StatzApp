export default function About() {
  return (
    <div className={"flex flex-col max-w-3xl mx-auto gap-2 font-normal mt-5"}>
      <p>
        Welcome to StatzApp, a non-profit web application created for learning
        purposes. StatzApp is designed to help Strava users easily fetch and
        display their user data and activities in a simple and intuitive way.
      </p>
      <p>
        With StatzApp, users can log in with their Strava account and quickly
        fetch all their activity data. The app provides a user-friendly data
        grid that displays all activities in an organized manner, allowing users
        to sort and filter them based on various parameters.
      </p>
      <p>
        Whether you are a competitive athlete, or simply someone who wants to
        stay on top of their fitness goals, StatzApp has got you covered. Our
        easy-to-use interface and powerful sorting and filtering tools make it
        simple to view your Strava activities in one place.
      </p>
      <p>
        StatzApp takes user privacy seriously. We do not store any user data
        aside from browser local storage. Your personal information is safe and
        secure with us.
      </p>
      <p>
        So why wait? Access StatzApp today and take control of your Strava data
        like never before. Discover a whole new way to view your activities and
        track your progress over time!
      </p>
      <div className={"w-32 mx-auto mt-3"}>
        <a
          href={"https://github.com/PatrykJamroz/StatzApp"}
          target={"_blank"}
          rel="noreferrer"
        >
          <img
            loading="lazy"
            src={"/GitHub_Logo_White.png"}
            alt={"profile photo"}
          />
        </a>
      </div>
    </div>
  );
}
