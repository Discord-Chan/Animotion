export default function Player() {
	return (
		<>
		<p id="main-headline">Mediaplayer</p>
		
		<div id="video-container">
			<div className="dance-container">
				<img className="dance-image" src="/images/dances/dance1.jpg"></img>
				<p className="dance-name">dance1</p>
			</div>
			<div className="dance-container">
				<img className="dance-image" src="/images/dances/dance1.jpg"></img>
				<p className="dance-name">dance2</p>
			</div>
			<div className="dance-container">
				<img className="dance-image" src="/images/dances/dance1.jpg"></img>
				<p className="dance-name">dance3</p>
			</div>
		</div>
		</>
	)
}