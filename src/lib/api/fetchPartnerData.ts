import { PartnerDataType } from "@/types/PartnerSchema"
import { appApi } from "../routes"
import { API_URL } from "."

export const getPartnerData = async (partnerId?: string): Promise<PartnerDataType | undefined> => {
	if (!partnerId || !Number.isInteger(Number(partnerId))) return undefined
	const url = API_URL + appApi.partnerDetails.replace("{partnerId}", partnerId)
	const response = await fetch(url)
	return response.json()
}
