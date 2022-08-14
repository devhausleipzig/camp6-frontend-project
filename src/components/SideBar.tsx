import { NavLink } from "react-router-dom";
import { FeedSVG } from "../assets/FeedSVG";
import { HomeSVG } from "../assets/HomeSVG";
import { ResourcesSVG } from "../assets/ResourcesSVG";
import { TracksSVG } from "../assets/TracksSVG";
import { UserData } from "../database/TypesNConsts";
import { TasksProvider } from "./Contexts/TasksContext";
import { TopicsProvider } from "./Contexts/TopicsContext";
import { TracksProvider } from "./Contexts/TracksContext";
import { useUser } from "./Contexts/UserContext";
import { Timer } from "./Timer";

export default function SideBar() {
	const user = useUser() as UserData;

	const tracksList = user.tracks.map((track, idx) => (
		<li key={idx}>
			<NavLink to={`/tracks/${track.id}`}>{track.title}</NavLink>
		</li>
	));

	return (
		<>
			<div className="flex h-full w-fit  flex-col justify-between ">
				<nav className="flex flex-col items-start  h-fit w-full shadow-md rounded-xl bg-whiteTransparent gap-6 p-6">
					<NavLink
						className="navlink h-5 flex flex-row gap-6 text-customTextColorDark"
						to="/"
					>
						{" "}
						<HomeSVG /> Home
					</NavLink>
					<NavLink
						className="navlink h-5 flex flex-row gap-6 text-customTextColorDark"
						to="/feed"
					>
						<FeedSVG /> Feed
					</NavLink>
					<NavLink
						className="navlink h-5 flex flex-row gap-6 text-customTextColorDark"
						to="/resources"
					>
						<ResourcesSVG /> Resources
					</NavLink>
				</nav>
				<div className="flex flex-col items-start h-fit w-full shadow-md rounded-xl bg-whiteTransparent gap-2 p-6">
					<NavLink
						className="navlink h-5 flex flex-row gap-6 text-customTextColorDark "
						to="/tracks"
					>
						<TracksSVG /> Tracks
					</NavLink>
					<ul className="relative left-12 leading-7 text-customTextColorDark ">
						{tracksList}
					</ul>
				</div>
				<div className="w-fit h-fit">
					<TracksProvider>
						<TopicsProvider trackId={user.activeTrackId}>
							<TasksProvider
								trackId={user.activeTrackId}
								topicId={user.activeTopicId}
							>
								<Timer />
							</TasksProvider>
						</TopicsProvider>
					</TracksProvider>
				</div>
			</div>
		</>
	);
}
