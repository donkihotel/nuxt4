export const useFormatMailIcon = () => {
    const iconMap: Record<string, string> = {
        google: 'google.png',
        naver: 'naver.png',
        microsoft: 'microsoft.png',
        godaddy: 'godaddy.png',
        mailplug: 'mailplug.png',
        mailnara: 'mailnara.png',
        hiworks: 'hiworks.png',
        cafe24: 'cafe24.png',
        daum: 'daum.png',
    };

    const formatMailIcon = (value: string): string => {
        return iconMap[value] ?? 'not-found';
    };

    return {
        formatMailIcon,
    };
};
