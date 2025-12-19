export const useFormatMailIcon = () => {
    const iconMap: Record<string, string> = {
        google: 'google.png',
        naver: 'naver.png',
        microsoft: 'microsoft.png'
    };

    const formatMailIcon = (value: string): string => {
        return iconMap[value] ?? 'not-found';
    };

    return {
        formatMailIcon,
    };
};
