// ==UserScript==
// @name         Douban Movie Duration Converter - Enhanced
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Convert movie duration from minutes to hours and minutes on Douban movie pages with enhanced styling
// @match        *://movie.douban.com/subject/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 查找电影时长元素
    const infoElement = document.querySelector('#info');
    if (infoElement) {
        // 查找包含"分钟"的文本节点
        const durationElement = Array.from(infoElement.querySelectorAll('span')).find(span => span.innerText.includes("分钟"));

        if (durationElement) {
            // 提取分钟数
            const minutes = parseInt(durationElement.innerText.match(/\d+/)[0]);

            // 计算小时和分钟
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;

            // 创建小时显示元素
            const hoursTextElement = document.createElement('span');
            hoursTextElement.style.color = "#007aff"; // 设置为蓝色，更加突出
            hoursTextElement.style.fontWeight = "bold";
            hoursTextElement.style.marginLeft = "5px";
            hoursTextElement.style.transition = "opacity 0.5s ease"; // 设置淡入效果
            hoursTextElement.style.opacity = "0"; // 初始隐藏
            hoursTextElement.innerText = `(${hours}小时${remainingMinutes}分钟)`;

            // 将新元素插入到时长信息旁边
            durationElement.appendChild(hoursTextElement);

            // 触发淡入效果
            setTimeout(() => {
                hoursTextElement.style.opacity = "1";
            }, 100);
        }
    }
})();
