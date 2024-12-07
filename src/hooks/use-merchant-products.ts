import { useQuery } from "react-query"
import fetchMerchantProducts from "@/functions/fetch-merchant-products";
import { useAuth } from "@/components/ui/use-auth-client";

const useMerchantProductsQuery = () => {
    const { principal } = useAuth()

    const queryOptions = {
        refetchIntervalInBackground: true,
        refetchInterval: 5000
    }
    const { data, isFetching, error } = useQuery(["products"], async () => {
        if (principal) {
            return fetchMerchantProducts(principal);
        }
    }, queryOptions)

    const products = data ? data : []
    return {
        products,
        isFetching,
        error
    }
}

export default useMerchantProductsQuery