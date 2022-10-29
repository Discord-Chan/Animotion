function SelectModel(model) {
  window.localStorage.setItem("vrm", model);
  GoTo("webapp/index.html");
}

function GoTo(link) {
  window.location.href = link;
}

export default function Home() {
  return (
    <>
      <p id="logo" className="glitch" data-text="Animotion">Animotion</p>
      <div className="vrm-container">
        <button
          className="vrm-selector glow-on-hover"
          type="button"
          onClick={() => {
            SelectModel(
              "https://cdn.glitch.global/14365248-98f0-4e5a-a5a3-1a7cd5ad47c8/yorforger.vrm?v=1666725192965"
            );
          }}
        >
          <img
            className="vrm-image"
            src="/images/vrms/yor2_blackbackground.jpg"
            alt="virtual model black haired boy with glasses"
          />
        </button>

        <button
          className="vrm-selector glow-on-hover"
          type="button"
          onClick={() => {
            SelectModel(
              "https://cdn.glitch.global/14365248-98f0-4e5a-a5a3-1a7cd5ad47c8/felix.vrm?v=1666724550269" 
            );
          }}
        >
          <img
            className="vrm-image"
            src="/images/vrms/vampire_blackbackground.jpg"
            alt="virtual model black haired boy with glasses"
          />
        </button>

        <button
          className="vrm-selector glow-on-hover"
          type="button"
          onClick={() => {
            SelectModel(
              "https://cdn.glitch.global/14365248-98f0-4e5a-a5a3-1a7cd5ad47c8/girl_rainbow.vrm?v=1666725244245"
            );
          }}
        >
          <img
            className="vrm-image"
            src="/images/vrms/lgtbq_girl_blackbackground.jpg"
            alt="virtual model black haired boy with glasses"
          />
        </button>
      </div>

      <div className="link-container">
        <button
          className="link-button"
          role="button"
          id="player-button"
          onClick={() => {
            GoTo("player");
          }}
        >
          Mediaplayer
        </button>
        <button
          className="link-button"
          role="button"
          id="about-button"
          onClick={() => {
            GoTo("about");
          }}
        >
          Among us
        </button>
        <button
          className="link-button"
          role="button"
          onClick={() => {
            GoTo("community");
          }}
        >
          Community
        </button>
      </div>
    </>
  );
}
