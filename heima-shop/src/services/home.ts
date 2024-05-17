import type { HotItem, CategoryItem, BannerItem } from "@/types/home"
import { http } from "@/utils/http"
export const getHomeHotAPI = () => {
    return http<HotItem[]>({
        method: 'GET',
        url: '/home/hot/multi'
    })
}
export const getHomeCategoryAPI = () => {
    return http<CategoryItem[]>({
        method: 'GET',
        url: '/home/category/mutli'
    })
}

export const getHomeBannerAPI = (distributionSite = 1) => {
    return http<BannerItem[]>({
        method: 'GET',
        url: '/home/banner',
        data: {
            distributionSite
        }
    })
}