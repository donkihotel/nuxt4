export const useFormatSecurityColor = () => {
    const colorMap: Record<number, string> = {
        1: 'grey-lighten-2',
        2: 'grey-lighten-2',
        3: 'grey-lighten-2',
        4: 'black',
        5: 'black',
    };

    const formatSecurityColor = (value: number): string => {
        return colorMap[value] ?? 'grey-lighten-2';
    };

    return {
        formatSecurityColor,
    };
};
