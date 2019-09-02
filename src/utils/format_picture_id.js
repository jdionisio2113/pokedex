/**
 * This fn prepends "00" in front of a number if a number is less than 10.
 * If num is a double digit number, "0" is prepended. If num is a
 * triple digit number, return num without any modifications.
 * @param Number num
 * @return String num
 *
 */
var format_picture_id = function(num) {
    if (num <= 9) {
        return `00${num}`;
    } else if (num >= 10 && num <= 99) {
        return `0${num}`;
    } else {
        return num;
    }
};

export default format_picture_id;
