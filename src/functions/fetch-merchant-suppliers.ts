import { Principal } from '@dfinity/principal';
import AsceflowBackendActor from "@/utils/AsceflowBackendActor";

const fetchMerchantSuppliers = async (merchantPrincipal: Principal) => {
    const response = await AsceflowBackendActor.getSuppliersByMerchant(merchantPrincipal);
    return response;
}

export default fetchMerchantSuppliers;