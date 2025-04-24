const getGridTemplate = (count: number, aspectRatio: number) => {
	if (count <= 1) {
		return { columns: "1fr", rows: "1fr" };
	} else if (count === 2) {
		return aspectRatio < 1 ? { columns: "1fr", rows: "1fr 1fr" } : { columns: "1fr 1fr", rows: "1fr" };
	} else if (count === 3 || count === 4) {
		return { columns: "1fr 1fr", rows: "1fr 1fr" };
	} else {
		return { columns: "1fr 1fr 1fr", rows: "1fr 1fr 1fr" };
	}
};

export default getGridTemplate;
