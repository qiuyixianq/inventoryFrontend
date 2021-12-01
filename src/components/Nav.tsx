
type Props = {
    screens: Array<string>,
    view: string,
    setView: (screen:string) => void,
}

export const Nav = (props:Props) => {
    const { screens, view, setView } = props;


	return (
		<div className="flex text-white text-xl p-3 content-center">
			<button
				className={`btn mx-8 ${view === screens[0] ? 'btn-primary btn-wide' : ''}`}
				onClick={() => setView(screens[0])}
			>
				Item
			</button>

			<button
				className={`btn mx-8 ${view === screens[1] ? 'btn-primary btn-wide' : ''}`}
				onClick={() => setView(screens[1])}
			>
				Transaction
			</button>
		</div>
	);
};
