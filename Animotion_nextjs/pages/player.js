export default function Player() {
	return (
		<>
		<p id="main-headline">Mediaplayer</p>
		
		<div id="video-container">
			<div className="dance-container">
				<img className="dance-image" src="/images/dances/natalie_dance.jpg"></img>
				<p className="dance-name">dance 1</p>
			</div>
			<div className="dance-container">
				<img className="dance-image" src="/images/dances/purple_dress_dance.png"></img>
				<p className="dance-name">dance 2</p>
			</div>
			<div className="dance-container">
				<img className="dance-image" src="/images/dances/orange_girl_dance.png"></img>
				<p className="dance-name">dance 3</p>
			</div>
		</div>
		</>
	)
}