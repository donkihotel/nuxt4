export const useFormatScaleColor = () => {
    const colorMap: Record<string, string> = {
        스케일업: 'grey-lighten-2',
        스케일아웃: 'black'
    };

    const formatScaleColor = (value: string): string => {
        return colorMap[value] ?? 'grey-lighten-2';
    };

    return {
        formatScaleColor,
    };
};
