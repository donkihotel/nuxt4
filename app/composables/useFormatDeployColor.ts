export const useFormatDeployColor = () => {
    const colorMap: Record<string, string> = {
        수동: 'grey-lighten-2',
        자동: 'black'
    };

    const formatDeployColor = (value: string): string => {
        return colorMap[value] ?? 'grey-lighten-2';
    };

    return {
        formatDeployColor,
    };
};
