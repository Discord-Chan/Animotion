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
    <p id = "main-headline">Animotion</p>
    <div className = "vrm-container">
      <button className="vrm-selector glow-on-hover" type="button" onClick={() => {SelectModel("https://cdn.glitch.global/14365248-98f0-4e5a-a5a3-1a7cd5ad47c8/uwugirl.vrm?v=1652337472157")}}>
        <img className="vrm-image" src="/images/vrms/test.png" alt="virtual model black haired boy with glasses"/>
      </button>

      <button className="vrm-selector glow-on-hover" type="button" onClick={() => {SelectModel("https://cdn.glitch.me/14365248-98f0-4e5a-a5a3-1a7cd5ad47c8/rich_girl.vrm?v=1663588646001")}}>
        <img className="vrm-image" src="/images/vrms/test.png" alt="virtual model black haired boy with glasses"/>
      </button>
  
      <button className="vrm-selector glow-on-hover" type="button" onClick={() => {SelectModel("Model3")}}>
        <img className="vrm-image" src="/images/vrms/test.png" alt="virtual model black haired boy with glasses"/>
      </button>
    </div>

    <div className="link-container">
      <button className="link-button" role="button" id="player-button" onClick={() => {GoTo("player")}}>
        Mediaplayer
      </button>
      <button className="link-button" role="button" id="about-button" onClick={() => {GoTo("about")}}>
        Among us
      </button>
    </div>
    </>
  )
}