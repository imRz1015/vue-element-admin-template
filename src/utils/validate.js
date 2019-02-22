/**
 * Created by TANGIMING 2019-2-22
 * 包含表单验证，常规验证
 */

export function isvalidUsername(str) {
    const valid_map = ['admin', 'editor']
    return valid_map.indexOf(str.trim()) >= 0
}

export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

export const phoneNum = [
    {
        required: true,
        trigger: "blur",
        pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
        message: "请输入正确的手机号",
    }
];
export const password = [
    {
        required: true,
        trigger: "blur",
        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{7,16}$/,
        message: '密码错误'
    }
];
export default {
    // 金额格式化
    formatMoney(str = 0) {
        str = str + "";
        let newStr = "";
        let count = 0;
        if (str.indexOf(".") === -1) {
            for (let i = str.length - 1; i >= 0; i--) {
                if (count % 3 === 0 && count !== 0) {
                    newStr = str.charAt(i) + "," + newStr;
                } else {
                    newStr = str.charAt(i) + newStr;
                }
                count++;
            }
            str = newStr + ".00"; // 自动补小数点后两位
            return str;
        } else {
            for (let i = str.indexOf(".") - 1; i >= 0; i--) {
                if (count % 3 === 0 && count !== 0) {
                    newStr = str.charAt(i) + "," + newStr;
                } else {
                    newStr = str.charAt(i) + newStr; // 逐个字符相接起来
                }
                count++;
            }
            str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
            return str;
        }
    },
    // 日期格式化
    formatDate(date, fmt) {
        if (!date) {
            return null;
        }
        if (typeof date === "string") {
            date = new Date(date.replace(/-/g, "/"));
        }
        if (typeof date === "number") {
            date = new Date(date);
        }
        if (fmt === undefined) {
            return Number(date);
        } else {
            var o = {
                "M+": date.getMonth() + 1,
                "D+": date.getDate(),
                "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
                "H+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3),
                S: date.getMilliseconds()
            };
            var week = {
                "0": "\u65e5",
                "1": "\u4e00",
                "2": "\u4e8c",
                "3": "\u4e09",
                "4": "\u56db",
                "5": "\u4e94",
                "6": "\u516d"
            };
            if (/(Y+)/.test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    (date.getFullYear() + "").substr(4 - RegExp.$1.length)
                );
            }
            if (/(E+)/.test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    (RegExp.$1.length > 1
                        ? RegExp.$1.length > 2
                            ? "\u661f\u671f"
                            : "\u5468"
                        : "") + week[date.getDay() + ""]
                );
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(
                        RegExp.$1,
                        RegExp.$1.length === 1
                            ? o[k]
                            : ("00" + o[k]).substr(("" + o[k]).length)
                    );
                }
            }
            return fmt;
        }
    },
    // 将发送请求中的参数格式化，如果为空则转为null
    formatReq(obj) {
        for (let i in obj) {
            let item = obj[i];
            if (item === null) continue;
            if (
                item === undefined ||
                item === "" ||
                item === "undefined" ||
                item.length <= 0 ||
                JSON.stringify(item) === "{}"
            ) {
                obj[i] = null;
            }
        }
        return obj;
    },
    // 身份证 中间用*显示
    hideCardID(cardid) {
        if (cardid) {
            return cardid.replace(/^(.{6})(?:\d+)(.{4})$/, "$1****$2");
        } else {
            return "";
        }
    },
    // 手机号，中间四位*显示
    hidePhone(phone) {
        return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    },
    // 电话号码格式验证
    checkPhone(phone) {
        let reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        return reg.test(phone);
    },
    // 验证邮箱格式验证
    checkEmail(email) {
        let reg = /^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$/;
        return reg.test(email);
    },
    // 验证码格式验证
    checkVerifyCode(code) {
        let reg = /^\d{6}$/;
        return reg.test(code);
    },
    // 邀请码格式验证
    checkDynamicCode(code) {
        let reg = /^[A-Za-z0-9]{4}$/;
        return reg.test(code);
    },
    // 密码格式验证
    checkPassword(password) {
        let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
        return reg.test(password);
    },
    // 用户名格式验证
    checkName(name) {
        let reg = /^[\u4E00-\u9FA5]{2,10}$/;
        return reg.test(name);
    },
    // 账户名称格式验证
    checkUsername(name) {
        let reg = /^[\u4e00-\u9fa50-9a-zA-Z]{4,16}$/;
        return reg.test(name);
    },
    // 统一验证
    checkCommonField(name) {
        let reg = /^[\u4e00-\u9fa50-9a-zA-Z]{4,30}$/;
        return reg.test(name);
    },
    // 身份证格式验证
    checkIDCard(idCard) {
        if (idCard.length === 18) {
            let reg = /^\d{17}[\d|X|x]$/;
            return reg.test(idCard);
        } else if (idCard.length === 15) {
            let reg = /^\d{15}$/;
            return reg.test(idCard);
        } else {
            return false;
        }
    },
    // 验证值是否为空
    checkValEmpty(str) {
        if (
            str === undefined ||
            str === null ||
            str.length <= 0 ||
            str === "undefined"
        ) {
            return true;
        } else {
            return false;
        }
    },
    // 验证佣金输入金额
    checkCommission(commission) {
        // 小于100且后面可以带4个小数点
        let reg = /^100$|^(\d|[1-9]\d)(\.\d{1,4})*$/;
        // 一亿以内，保留四位小数
        //  /^([1-9]\d{0,7}|0)(\.\d{1,4})?$/
        // 如果通过的话，那么判断小数点的前几位数字
        return reg.test(commission);
    },
    // 验证渠道编号是否符合规则--4-8位以内数字+字母，区分大小写
    checkChannelNo(channelNo) {
        let reg = /^[\w\d]{4,8}$/;
        return reg.test(channelNo);
    },
    // 验证是否包含空格
    checkSpace(val) {
        let reg = /^\s+$/;
        if (reg.test(val)) {
            return true;
        } else {
            return false;
        }
    },
    // 只能输入数字与小数点正则判断
    checkIntegerAndDot(checkVal) {
        let dotReg = /\./g;
        let IntegerReg = /^[1-9]{1}\d{0,5}$/;
        // 如果输入了多个点，直接不符合要求
        if (checkVal.match(dotReg) && checkVal.match(dotReg).length > 1) {
            return false;
            // 输入了一个点
        } else if (checkVal.match(dotReg) && checkVal.match(dotReg).length === 1) {
            // 开头与结尾都不能出现点，点的前面与后面必须是数字
            let strLen = checkVal.length;
            if (checkVal.indexOf(".") === 0 || checkVal.indexOf(".") === strLen - 1) {
                return false;
                // 超过个数的限制的话
            } else {
                return strLen <= 6;
            }
            // 没有小数点的话，那么就是全部数字进行匹配
        } else if (!checkVal.match(dotReg)) {
            return IntegerReg.test(checkVal);
        }
    },
    // 银行卡验证
    checkBankCard(iccid) {
        let initCard = iccid;
        let s1 = 0;
        let s2 = 0;
        iccid = iccid.substring(0, iccid.length - 1);
        let reverse = "";
        for (let i = iccid.length; i > 0; i--) {
            reverse += iccid.charAt(i - 1);
        }
        for (let i = 0; i < reverse.length; i++) {
            let digit = parseInt(reverse.charAt(i), 10);
            if (i % 2 !== 0) {
                // this is for odd digits, they are 1-indexed in the
                // algorithm
                s1 += digit;
            } else {
                // add 2 * digit for 0-4, add 2 * digit - 9 for 5-9
                s2 += 2 * digit;
                if (digit >= 5) {
                    s2 -= 9;
                }
            }
        }
        let sum = 10 - ((s1 + s2) % 10);
        if (sum === 10) {
            sum = 0;
        }
        return iccid + sum === initCard;
    }
};

