import React, { useState } from "react";
import { censorStr } from "@/shared/lib/utils";
import Icon from "./icon";

type ReadOnlyFormDisplayProps = {
	data: string | null;
	label: string;
	isCensored?: boolean;
};

const ReadOnlyFormDisplay = ({ data, label, isCensored }: ReadOnlyFormDisplayProps) => {
	const [censor, setCensor] = useState<boolean>(true);

	return (
		<div className="flex flex-col gap-2">
			<h2 className="text-xl font-semibold select-none">{label}</h2>
			{isCensored ? (
				<div className="w-full flex relative justify-between items-center select-none">
					<p className="text-muted">
						{data ? (censor ? censorStr(data) : data ? data : "Not specified") : "Not specified"}
					</p>
					<div onClick={() => setCensor(!censor)} className="transition-all duration-100 ease-in-out">
						{censor ? (
							<Icon.eyeClosed className="fill-muted" />
						) : (
							<Icon.eyeOpen className="fill-muted" />
						)}
					</div>
				</div>
			) : (
				<p className="text-muted select-none">{data ? (data ?? "Not specified") : "Not specified"}</p>
			)}
		</div>
	);
};
export default ReadOnlyFormDisplay;
