import { ConfirmPaymentType, defaultValuesConfirmPayment } from "@/types/PaymentType"
import { API_URL } from "."
import { appApi } from "../routes"

export const getConfirmationInfo = async (versionId?: string): Promise<ConfirmPaymentType | undefined> => {
	if (!versionId || !Number.isInteger(Number(versionId))) return undefined
	const url = API_URL + appApi.partnerDetails.replace("{listingId}", versionId)
	return defaultValuesConfirmPayment
}
