import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="AboutUs">
      <div className="Team">Meet our team:</div>

      <div className="card-list">
        <div className="card">
          <img
            className="card-img-top"
            src={require("../../assets/images/team/Niki.jpg")}
            alt="User Card"
            style={{ width: 348, height: 453.5 }}
          />
          <h2>Nikola Doychev</h2>
          <a href="https://gitlab.com/doychikun" rel="noreferrer" target={'_blank'}>GitLab Profile</a>
        </div>

        <div className="card">
          <img
            className="card-img-top"
            src={require("../../assets/images/team/Sasheto.JPG")}
            alt="User Card"
            style={{ width: 348, height: 453.5 }}
          />
          <h2>Sasho Milenov</h2>
          <a href="https://gitlab.com/sasashi33" rel="noreferrer" target={'_blank'}>GitLab Profile</a>
        </div>

        <div className="card">
          <img
            className="card-img-top"
            src={require("../../assets/images/team/Yana.jpg")}
            alt="User Card"
            style={{ width: 348, height: 453.5 }}
          />
          <h2>Yana Sheinkova</h2>
          <a href="https://gitlab.com/YanaSheinkova" rel="noreferrer" target={'_blank'}>GitLab Profile</a>
        </div>
        <div className="About">
          "Yoga not only changes the way we see the world, yoga transforms the
          person who sees it. Practice with love and inspiration..."
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
