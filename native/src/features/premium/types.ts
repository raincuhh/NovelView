import { Timestamp } from "@/shared/database/types";

// synced table
export interface PremiumSubscription {
	userId: string;
	startDate: string;
	endDate: string;

	createdAt: Timestamp;
	updatedAt: Timestamp;
}
