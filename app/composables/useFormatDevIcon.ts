export const useFormatDevIcon = () => {
    const iconMap: Record<string, string> = {
        React: 'react.png',
        Next: 'nextjs.png',
        Vue: 'vue.png',
        Nuxt: 'nuxt.png',
        Flutter: 'flutter.png',
        FastAPI: 'fastapi.png',
        Streamlit: 'streamlit.png',
        Python: 'python.png',
        Node: 'node.png',
        Express: 'express.png',
        Nest: 'nestjs.png',
        Spring: 'spring.png',
        SpringBoot: 'springboot.png',
        Django: 'django.png',
        Flask: 'flask.png',
        PHP: 'php.png',
        Unity: 'unity.png',
        MySQL: 'mysql.png',
        MongoDB: 'mongodb.png',
        MariaDB: 'mariadb.png',
        DynamoDB: 'dynamodb.png',
    };

    const formatDevIcon = (value: string): string => {
        return iconMap[value] ?? 'default.png'; // 존재하지 않을 경우 기본 이미지
    };

    return {
        formatDevIcon,
    };
};
