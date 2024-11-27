import { useQuery } from "react-query"
import { useAuth } from "@/components/ui/use-auth-client";
import fetchMerchantSuppliers from "@/functions/fetch-merchant-suppliers";

const useMerchantSuppliersQuery = () => {

    const { principal } = useAuth()

    const queryOptions = {
        refetchIntervalInBackground: true,
        refetchInterval: 2000
    }
    
    const { data, isFetching, error } = useQuery(["suppliers"], async () => {
        if (principal) {
            return fetchMerchantSuppliers(principal);
        }
    }, queryOptions)

    const suppliers = data ? data : [];

    return {
        suppliers,
        isFetching,
        error
    }
}

export default useMerchantSuppliersQuery