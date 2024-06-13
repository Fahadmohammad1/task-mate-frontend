import banner from "../../assets/task-banner.gif";
const Banner = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <img src={banner} className="" />
        <div>
          <h1 className="text-4xl font-bold lg:text-6xl">
            Organize your life better with TaskMate
          </h1>
          <p className="py-6">
            Manage your work, timelines and team mates all at once, Set and
            follow timelines, assign tasks and keep your projects in check.
          </p>
          <button className="btn btn-primary">Lets's explore</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
