import { useNavigate } from "@tanstack/react-router";
import React from "react";

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<div className="h-screen">
			<div className="flex min-h-full flex-col justify-center">
				<div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
					<div className="flex flex-col items-center mx-auto justify-center px-4 w-sm md:w-md">
						<div className="flex items-center mb-6">
							<div className="text-3xl font-bold pr-4 mr-4 border-r">404</div>
							<p>This page could not be found.</p>
						</div>
						<div className="flex gap-4">
							<button onClick={() => navigate({ to: "/" })} className="cursor-pointer">
								go home.
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
