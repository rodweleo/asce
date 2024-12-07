import { Principal } from '@dfinity/principal';
import AsceflowBackendActor from "@/utils/AsceflowBackendActor";

const fetchMerchantSales = async (businessPrincipal: Principal) => {
    const response = await AsceflowBackendActor.getSalesByBusiness(businessPrincipal);
    return response;
}

export default fetchMerchantSales;