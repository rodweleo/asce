import { Principal } from '@dfinity/principal';
import AsceflowBackendActor from "@/utils/AsceflowBackendActor";

const fetchMerchantProducts = async (merchantPrincipal: Principal) => {
    const response = await AsceflowBackendActor.getProductsBySeller(merchantPrincipal);
    return response;
}

export default fetchMerchantProducts;