export const colorNameToHex = (colorName: string) => {
    switch (colorName) {
        case 'Blue':
            return '#1569C7';
        case 'Blue Gray':
            return '#6699CC';
        case 'Brown':
            return '#67443b';
        case 'Brown Gray':
            return '#5e481e';
        case 'Brown Black':
            return '#38101C';
        case 'Green':
            return '#6ca580';
        case 'Green Gray':
            return '#4b7248';
        default:
            return '#663399';
    }
};
