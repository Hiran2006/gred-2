"use client"
import { useState, useEffect } from "react"
import type { Database } from '@/database.types'
import supabase from '@/util/supabase/client'
export default function SellPosts() {
    const [sellData, setSellData] = useState<null | Database['public']['Tables']['sell_post']['Row']>(null) 
    useEffect(() => {
        const fetchSellPosts = async () => {
            const { data, error } = await supabase.from('rent_post').select('*')
            if (error) {
                console.log(error)
                return
            }
            console.log(data)
        }
        fetchSellPosts()
    }, [])

    return (<></>)
}
