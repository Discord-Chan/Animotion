export default function Player() {
	return (
		<>
		<p id="main-headline">Mediaplayer</p>
		
		<div className="video-container">
			<div className="dance-container">
				<iframe className="youtube-video-iframe" src="https://www.youtube.com/embed/U5cK0gVOz_Q?modestbranding=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				<p className="dance-name">dance 1</p>
			</div>
			<div className="dance-container">
			<iframe className="youtube-video-iframe" src="https://www.youtube-nocookie.com/embed/U5cK0gVOz_Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

				<p className="dance-name">dance 2</p>
			</div>
			<div className="dance-container">
			<iframe className="youtube-video-iframe" src="https://www.youtube-nocookie.com/embed/U5cK0gVOz_Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				
				<p className="dance-name">dance 3</p>
			</div>
		</div>
		<div className="video-container">
			<div className="dance-container">
			<iframe className="youtube-video-iframe" src="https://www.youtube-nocookie.com/embed/U5cK0gVOz_Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				
				<p className="dance-name">dance 4</p>
			</div>
			<div className="dance-container">
			<iframe className="youtube-video-iframe" src="https://www.youtube-nocookie.com/embed/U5cK0gVOz_Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				
				<p className="dance-name">dance 5</p>
			</div>
			<div className="dance-container">
			<iframe className="youtube-video-iframe" src="https://www.youtube-nocookie.com/embed/U5cK0gVOz_Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				
				<p className="dance-name">dance 6</p>
			</div>
		</div>
		</>
	)
}