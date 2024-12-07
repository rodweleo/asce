import { useQuery } from "react-query"
import { useAuth } from "@/components/ui/use-auth-client";
import fetchMerchantSales from "@/functions/fetch-merchant-sales";

const useMerchantSalesQuery = () => {
    const { principal } = useAuth()

    const queryOptions = {
        refetchIntervalInBackground: true,
        refetchInterval: 5000
    }
    const { data, isFetching, error } = useQuery(["sales"], async () => {
        if (principal) {
            return fetchMerchantSales(principal);
        }
    }, queryOptions)

    const sales = data ? data : [];

    return {
        sales,
        isFetching,
        error
    }
}

export default useMerchantSalesQuery