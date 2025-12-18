export const useRowNavigation = () => {
    const router = useRouter()

    const handleClickRow = (basePath: string) => {
        return (_item: any, row: any) => {
            router.push(`/${basePath}/${row.item.id}`)
        }
    }

    return { handleClickRow }
}
