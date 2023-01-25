import { GoTo, SelectModel } from '../libs/pages_scripts';

export default function Home() {
  return (
    <>
      <p id="logo" className="glitch" data-text="Animotion">
        Animotion
      </p>
      <p id="select-model-text">Click On Any Model To Control To</p>
      <div className="vrm-container">
        <button
          className="vrm-selector glow-on-hover"
          type="button"
          onClick={() => {
            SelectModel(
              "https://cdn.glitch.global/14365248-98f0-4e5a-a5a3-1a7cd5ad47c8/cyberlady.vrm?v=1671406275496"
            );
          }}
        >
          <img
            className="vrm-image"
            src="https://cdn.glitch.global/14365248-98f0-4e5a-a5a3-1a7cd5ad47c8/cyberlady2_blackbackground.png?v=1673356895538"
            alt="Cyberlady"
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
            src="https://cdn.glitch.global/14365248-98f0-4e5a-a5a3-1a7cd5ad47c8/vampire_blackbackground.jpg?v=1672419201319"
            alt="vampireboy"
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
            src="https://cdn.glitch.global/14365248-98f0-4e5a-a5a3-1a7cd5ad47c8/lgtbq_girl_blackbackground.jpg?v=1672419182513"
            alt="rainbowgirl"
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
          About us
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
