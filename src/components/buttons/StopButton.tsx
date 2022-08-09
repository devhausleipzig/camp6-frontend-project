import { StopSVG } from "../../assets/StopSVG";
import { CustomButtonProps } from "../../database/TypesNConsts";

export function StopButton({ clickHandler }: CustomButtonProps) {
	return (
		<button
			onClick={clickHandler}
			className="  bg-primarylight rounded-full p-1 w-5 h-5"
		>
			<StopSVG />
		</button>
	);
}