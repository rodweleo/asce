import { Principal } from '@dfinity/principal';
import AsceflowBackendActor from "@/utils/AsceflowBackendActor";

const fetchMerchantSales = async (merchantPrincipal: Principal) => {
    const response = await AsceflowBackendActor.getSalesByMerchant(merchantPrincipal);
    return response;
}

export default fetchMerchantSales;