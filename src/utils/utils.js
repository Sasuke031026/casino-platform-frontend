import { ethers } from "ethers";

import { NotificationManager } from "react-notifications";
/**
 * set delay for delayTimes
 * @param {Number} delayTimes - timePeriod for delay
 */
function delay(delayTimes) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(2);
        }, delayTimes);
    });
}

/**
 * change data type from Number to BigNum
 * @param {Number} value - data that need to be change
 * @param {Number} d - decimals
 */
function toBigNum(value, d) {
    return ethers.utils.parseUnits(Number(value).toFixed(d), d);
}

/**
 * change data type from BigNum to Number
 * @param {Number} value - data that need to be change
 * @param {Number} d - decimals
 */
function fromBigNum(value, d) {
    return parseFloat(ethers.utils.formatUnits(value, d));
}

/**
 * @dev show  alert
 * @param {data}  error data
 */
function handleAlert(data) {
    const { title, msg } = data;
    NotificationManager.success(title, msg, 3000);
}

export { delay, handleAlert, toBigNum, fromBigNum };
