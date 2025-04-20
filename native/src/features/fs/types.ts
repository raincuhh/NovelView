export enum LogSeverity {
	normal,
	warning,
	error,
	info,
	debug,
	success,
	critical,
}

export type LogType = keyof typeof LogSeverity;
