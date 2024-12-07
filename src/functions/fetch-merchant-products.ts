import { Principal } from '@dfinity/principal';
import AsceflowBackendActor from "@/utils/AsceflowBackendActor";

const fetchMerchantProducts = async (businessPrincipal: Principal) => {
    const response = await AsceflowBackendActor.getBusinessProducts(businessPrincipal);
    return response;
}

export default fetchMerchantProducts;