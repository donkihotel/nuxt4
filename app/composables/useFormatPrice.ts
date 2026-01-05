export const useFormatPrice = () => {
    const formatPrice = (value?: number | null): string => {
        if (value === undefined || value === null) return '-'
        return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원`
    }

    return {
        formatPrice,
    }
}