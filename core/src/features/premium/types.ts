import { Timestamp } from "@/shared/lib/types";

// synced table
export interface PremiumSubscription {
	userId: string;
	startDate: string;
	endDate: string;

	createdAt: Timestamp;
	updatedAt: Timestamp;
}
