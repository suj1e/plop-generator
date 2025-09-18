module.exports = function (plop) {
    // 直接在plopfile.js中定义Java微服务生成器
    // 这样可以确保生成器能够被正确识别和调用
    require('./java-microservice-generator.js')(plop);
};