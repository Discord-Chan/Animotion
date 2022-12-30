export default function Player() {
	return (
		<>
		<h1 id="main-headline" className="glitch" data-text="Mediaplayer">Mediaplayer</h1>
		
		<div className="video-container">
			<div className="dance-container">
				<iframe className="youtube-video-iframe" src="https://www.youtube.com/embed/O36YAImtk4E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				<p className="dance-name">The Feels - Animotion</p>
			</div>
			<div className="dance-container">
			<iframe className="youtube-video-iframe" src="https://www.youtube.com/embed/muWjGi8tvX4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

				<p className="dance-name">Feel Special - Animotion</p>
			</div>
			<div className="dance-container">
			<iframe className="youtube-video-iframe" src="https://www.youtube.com/embed/7W-4_qw41Ek" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				
				<p className="dance-name">Devil - Animotion</p>
			</div>
		</div>
		<div className="video-container">
			{/*
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
	*/}
		</div>
		</>
	)
}