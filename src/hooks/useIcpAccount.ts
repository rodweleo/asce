"use client"

import { getIcpAccountBalance } from "@/functions/get-icp-account-balance"
import { getIcpAccountTransactions } from "@/functions/get-icp-account-transactions"
import { TransactionWithId } from "@dfinity/ledger-icp"
import { useEffect, useMemo, useState } from "react"

export const useIcpAccount = (accountId?: string) => {
    const [balance, setBalance] = useState(0)
    const [transactions, setTransactions] = useState<TransactionWithId[]>([])


    useEffect(() => {
        if (accountId) {
            getIcpAccountBalance(accountId).then((balance) => {
                setBalance((balance / 100000000))
            })

            getIcpAccountTransactions(accountId).then((transactions) => {
                setTransactions(transactions)
            })

        }
    }, [accountId])


    const latestTransaction = useMemo(() => {
        if (transactions.length > 0) {
            const latestTransaction = transactions.reduce((latest, current) => {
                if (!latest || (current.transaction.timestamp && current.transaction.timestamp > latest.transaction.timestamp)) {
                    return current;
                }
                return latest;
            });
            return latestTransaction;
        } else {
            return null
        }
    }, [transactions])


    console.log(transactions)
    return {
        balance, transactions, latestTransaction
    }
}