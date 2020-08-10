export default {
    classify(type) {
        switch (type) {
            case 1: return '餐饮';
            case 2: return '体验店';
            case 3: return '办事大厅';
            case 4: return '医院银行';
        }
    },
    way(type) {
        switch (type) {
            case 1: return '点单';
            case 2: return '排号';
            case 3: return '点单排号';
        }
    },
    coupon(type) {
        switch (type) {
            case 1: return '美食';
            case 2: return '生活';
            case 3: return '教育';
            case 4: return '其他';
        }
    },

};
