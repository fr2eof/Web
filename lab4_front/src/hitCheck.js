export const checkHit = (x, y, r) => {
    if ((x * x + y * y <= r * r) && (x <= 0 && y >= 0)) {
        return true;
    } else if ((x >= 0 && x <= r) && (y >= 0 && y <= r)) {
        return true;
    } else {
        return (x >= 0 && y <= 0) && (y >= x / 2 - r / 2);
    }
};