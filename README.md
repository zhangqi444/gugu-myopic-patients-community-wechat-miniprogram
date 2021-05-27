<img src="https://user-images.githubusercontent.com/5424267/119736375-75dd1f00-be32-11eb-8012-ebece6238f7c.png" alt="Gugu logo" width="100" height="100" align="right" />


# 咕咕
> 儿童青少年近视防控患者社区微信小程序——基于uniapp的客户端实现
> 
> ‼️ **请尽量将本仓库作为示例代码参考，而不是将其用于生产环境**

<p align="left">
  <img src="https://img.shields.io/badge/node-%3E%3D6.0.0-brightgreen"/>
  <img src="https://img.shields.io/badge/platforms-ios%20%7C%20android-blue"/>
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="Gugu is released under the MIT license." />
  <img src="https://img.shields.io/badge/maintained%3F-no-red.svg" alt="Gugu is not under maintained anymore." />
  <img src="https://img.shields.io/badge/ask%20me-anything-1abc9c.svg" alt="Ask Me Anything." />
</p>

<a href="https://github.com/zhangqi444/gugu-myopic-patients-community-wechat-miniprogram" target="_blank">文档</a>
|
<a href="https://github.com/zhangqi444/gugu-myopic-patients-community-wechat-miniprogram/blob/master/README-en-US.md" target="_blank">Doc</a>

## 背景

### 什么是儿童青少年近视防控？

儿童青少年是祖国的未来和民族的希望。近年来，由于中小学生课内外负担加重，手机、电脑等带电子屏幕产品（以下简称电子产品）的普及，用眼过度、用眼不卫生、缺乏体育锻炼和户外活动等因素，中国儿童青少年近视率居高不下、不断攀升，近视低龄化、重度化日益严重，已成为一个关系国家和民族未来的大问题。

“儿童青少年近视防控”指在政府、学校、医疗卫生机构、家庭、学生等各方面共同努力下，针对儿童青少年，完善眼健康定期筛查制度、建立视力健康档案，培养健康用眼行为、建设视觉友好环境，并对已经近视者采取科学诊疗与矫治。

相关资料：
- [教育部等八部门关于印发《综合防控儿童青少年近视实施方案》的通知](http://www.moe.gov.cn/srcsite/A17/moe_943/s3285/201808/t20180830_346672.html)
- [国际近视研究院白皮书](https://myopiainstitute.org/wp-content/uploads/2020/11/IMI-Myopia-Control-Reports-Overview-and-Introduction-Chinese.pdf)
- [IMI 近视发生与发展干预报告](https://myopiainstitute.org/wp-content/uploads/2020/09/IMI-Interventions-for-Myopia-Onset-and-Progression-Report_Chinese.pdf)
- [Brien Holden Vision Institute](https://bhvi.org/)
- [International Myopia Institute](https://myopiainstitute.org/) 

### 什么是患者社区?

社区，是个外来的词，最早由费孝通先生翻译自英文中的Community，它同家庭、宗族、国家等共同体一样是我们人类社会组织的一种形式，也是开展健康教育与医疗行为的重要场所。

基于互联网的患者社区在概念上非常容易理解，是患者组织的一种最基本形式在互联网上的呈现。广义上来说，只要是一定数量的患者借助任意的互联网工具或平台聚集在了一起，并形成了一个相互交流影响的集体，那就可以称为互联网患者社区。世界范围内，最具有典型性的患者社区是[PatientsLikeMe](https://www.patientslikeme.com/).

### 什么是“咕咕”？

“咕咕”这个名字取自猫头鹰的叫声，我们希望通过这么一种可爱的、拟物化的方式，传达出对于孩子的关心与爱。咕咕以患者社区为核心，结合科普患教、健康管理工具等功能，致力于在近视防控领域为广大家长提供一站式的服务。

咕咕作为一个业余时间发起的项目，其中的不足之处非常之多。而在过去的调研中我们也没有发现成熟的应用可供参考，项目中很多的产品和技术方案又都具有实验性质。

因为项目的可重用性不强，又与后端服务器相互耦合，我们过去一直选择了封闭开发的模式。但最终选择开源，还是希望能够抛砖引玉，对有志于近视防控或患者社区的朋友们能够有所启发和帮助。

## 功能概览

<div>
<img src="https://user-images.githubusercontent.com/5424267/119761374-84dac600-be60-11eb-8be8-0cfc7c07e18a.gif" width="100" />
<img src="https://user-images.githubusercontent.com/5424267/119761368-83110280-be60-11eb-8263-a1298094e15d.gif" width="100" />
<img src="https://user-images.githubusercontent.com/5424267/119761362-7ee4e500-be60-11eb-81ce-6750d257f026.gif" width="100" />
<img src="https://user-images.githubusercontent.com/5424267/119761346-79879a80-be60-11eb-85d7-82a08e4d7b2d.gif" width="100" />
<img src="https://user-images.githubusercontent.com/5424267/119746271-ee4cdb80-be44-11eb-8c87-dc69fcfc4906.gif" width="100" />
</div>

### 项目状态

<details>
  <summary>查看详情</summary>

> 完成: 🟩  部分实现: 🟧  待实现: 🟨  未实现: 🟥

<table class="tg">
<thead>
  <tr>
    <th class="tg-0pky">主功能</th>
    <th class="tg-0pky">子功能</th>
    <th class="tg-0pky">产品状态</th>
    <th class="tg-0pky">研发状态</th>
    <th class="tg-0pky">原型</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky" rowspan="3">首页</td>
    <td class="tg-0pky">搜索</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky">🟧</td>
    <td class="tg-0pky" rowspan="3">
	<img src="https://user-images.githubusercontent.com/5424267/119745587-4c78bf00-be43-11eb-9ac3-4e2fd4703645.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119745844-dde83100-be43-11eb-9129-485a3306d52e.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119745836-d7f25000-be43-11eb-834d-01a80ae5b55e.png" width="80" />
    </td>
  </tr>
  <tr>
    <td class="tg-0pky">信息流</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky">🟩</td>
  </tr>
  <tr>
    <td class="tg-0pky">轮播图</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky">🟥</td>
  </tr>

  <tr>
    <td class="tg-0pky" rowspan="6">科普患教</td>
    <td class="tg-0pky">富文本文章</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky" rowspan="6">
	<img src="https://user-images.githubusercontent.com/5424267/119746982-94e5ac00-be46-11eb-88b5-515af647a94d.jpg" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119746986-97480600-be46-11eb-90c2-af32a4b2dac4.jpg" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119746994-9a42f680-be46-11eb-8de7-d794978d4969.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119746998-9c0cba00-be46-11eb-99f6-4c0ea56b11d4.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119747000-9ca55080-be46-11eb-9ad5-e45fb902ab22.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119746996-9b742380-be46-11eb-85a4-769dd3a651c2.png" width="80" />
    </td>
  </tr>
  <tr>
    <td class="tg-0pky">视频文章</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky">🟩</td>
  </tr>
  <tr>
    <td class="tg-0pky">相关文章</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky">🟩</td>
  </tr>
  <tr>
    <td class="tg-0pky">文章点赞、收藏、分享</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky">🟩</td>
  </tr>
  <tr>
    <td class="tg-0pky">文章评论，评论回复、点赞</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky">🟩</td>
  </tr>
  <tr>
    <td class="tg-0pky">标签</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky">🟩</td>
  </tr>

  <tr>
    <td class="tg-0pky" rowspan="1">就医服务</td>
    <td class="tg-0pky">医生信息、医院信息、挂号、智能问诊</td>
    <td class="tg-0pky">🟧</td>
    <td class="tg-0pky">🟥</td>
    <td class="tg-0pky" rowspan="1">
	<img src="https://user-images.githubusercontent.com/5424267/119762586-d84e1380-be62-11eb-8849-b101a5c92cfd.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119762590-da17d700-be62-11eb-8d81-eb3dc60c0b45.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119762591-dab06d80-be62-11eb-9cbc-f673b957fd89.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119762592-dab06d80-be62-11eb-84ad-a6a4d91d874c.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119762814-47c40300-be63-11eb-98cd-79daf889dd04.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119762817-498dc680-be63-11eb-81c2-96198b2ddfb1.png" width="80" />
    </td>
  </tr>
  <tr>
    <td class="tg-0pky" rowspan="5">患者社区</td>
    <td class="tg-0pky">发帖，文字、富文本</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky">🟧</td>
    <td class="tg-0pky" rowspan="5">
	<img src="https://user-images.githubusercontent.com/5424267/119758853-17c53180-be5c-11eb-9562-a8fd00e04b04.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119758862-198ef500-be5c-11eb-9189-9dfd0b199488.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119758863-1a278b80-be5c-11eb-84e0-150f084832a2.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119758865-1ac02200-be5c-11eb-82a6-71412e002f6a.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119758868-1bf14f00-be5c-11eb-9abe-01e25ee4fb42.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119758870-1bf14f00-be5c-11eb-9ce8-3c3bccb2b2de.png" width="80" />
    </td>
  </tr>
  <tr>
    <td class="tg-0pky">帖子编辑、删除</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky">🟧</td>
  </tr>
  <tr>
    <td class="tg-0pky">帖子点赞、收藏、分享</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky">🟩</td>
  </tr>
  <tr>
    <td class="tg-0pky">帖子评论，评论回复、点赞</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky">🟧</td>
  </tr>
  <tr>
    <td class="tg-0pky">话题</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky">🟧</td>
  </tr>
  <tr>
    <td class="tg-0pky" rowspan="3">健康工具</td>
    <td class="tg-0pky">评测</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky" rowspan="1">
	<img src="https://user-images.githubusercontent.com/5424267/119760240-7ee3e580-be5e-11eb-9b95-a982339dc39a.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119760243-7f7c7c00-be5e-11eb-9bd2-62684130a752.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119760246-80151280-be5e-11eb-9649-1acb1f973b3b.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119760247-80ada900-be5e-11eb-8bca-4e3276c5b6c2.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119760249-81463f80-be5e-11eb-87ec-f867ba7972fe.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119760251-81ded600-be5e-11eb-980f-493ba05758d9.png" width="80" />
    </td>
  </tr>
  <tr>
    <td class="tg-0pky">病历管理</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky">🟧</td>
    <td class="tg-0pky" rowspan="1">
	<img src="https://user-images.githubusercontent.com/5424267/119759575-59a2a780-be5d-11eb-8c7a-89e610497418.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119759580-5ad3d480-be5d-11eb-996a-87c7dacf9d37.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119759582-5b6c6b00-be5d-11eb-9d84-1921ab526be1.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119759587-5c9d9800-be5d-11eb-8109-68ee4658a5d1.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119759588-5c9d9800-be5d-11eb-8abf-31dfb955b422.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119759585-5c050180-be5d-11eb-8551-b6c2d97173d4.png" height="80" />
    </td>
  </tr>
  <tr>
    <td class="tg-0pky">打卡</td>
    <td class="tg-0pky">🟧</td>
    <td class="tg-0pky">🟥</td>
    <td class="tg-0pky" rowspan="1">
	<img src="https://user-images.githubusercontent.com/5424267/119761043-f5cdae00-be5f-11eb-9d6d-d4e5653e1e07.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119761044-f6664480-be5f-11eb-9b9b-e80d210b53a3.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119761045-f6fedb00-be5f-11eb-96c6-57b0a016e683.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119761046-f6fedb00-be5f-11eb-8170-edd443b6dfe2.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119761048-f7977180-be5f-11eb-8868-a84f29b71e4b.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119761050-f8300800-be5f-11eb-9117-2493566172dc.png" width="80" />
    </td>
  </tr>

  <tr>
    <td class="tg-0pky" rowspan="1">电商</td>
    <td class="tg-0pky">评测</td>
    <td class="tg-0pky">🟧</td>
    <td class="tg-0pky">🟥</td>
    <td class="tg-0pky" rowspan="1">
	<img src="https://user-images.githubusercontent.com/5424267/119761910-8a84db80-be61-11eb-8610-d62d9c60fc36.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119761911-8bb60880-be61-11eb-94b3-8871aa9bf914.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119761914-8ce73580-be61-11eb-92d0-ab881a5bf4f4.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119761915-8ce73580-be61-11eb-862a-8b16dd29b82c.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119761917-8e186280-be61-11eb-85c2-32c57f6ed6e2.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119761918-8eb0f900-be61-11eb-828c-86265285fff9.png" width="80" />
    </td>
  </tr>
	
  <tr>
    <td class="tg-0pky" rowspan="1">直播</td>
    <td class="tg-0pky">评测</td>
    <td class="tg-0pky">🟥</td>
    <td class="tg-0pky">🟥</td>
    <td class="tg-0pky" rowspan="1">
	<img src="https://user-images.githubusercontent.com/5424267/119761967-a7b9aa00-be61-11eb-901c-7e90c3024c0a.png" width="80" />
    </td>
  </tr>
  <tr>
    <td class="tg-0pky" rowspan="5">其他</td>
    <td class="tg-0pky">用户认证</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky">🟥</td>
    <td class="tg-0pky" rowspan="1">
	<img src="https://user-images.githubusercontent.com/5424267/119763134-ccaf1c80-be63-11eb-9b63-573e6dd5b26d.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119763137-cde04980-be63-11eb-9df2-459ac02088e1.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119763138-cde04980-be63-11eb-9062-c563c895cfe5.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119763139-ce78e000-be63-11eb-97d9-719311156915.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119763142-cfaa0d00-be63-11eb-99eb-3b58e0df84e2.png" width="80" />
    </td>
  </tr>

  <tr>
    <td class="tg-0pky">个人中心</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky">🟧</td>
    <td class="tg-0pky" rowspan="1" >
	<img src="https://user-images.githubusercontent.com/5424267/119762992-983b6080-be63-11eb-8a8f-aa707eeb20d8.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119762996-98d3f700-be63-11eb-92c7-51dd24854480.png" width="80" />
	<img src="https://user-images.githubusercontent.com/5424267/119762997-996c8d80-be63-11eb-99c6-7898323306d2.png" width="80" />
    </td>
  </tr>
  <tr>
    <td class="tg-0pky">消息推送</td>
    <td class="tg-0pky">🟥</td>
    <td class="tg-0pky">🟥</td>
    <td class="tg-0pky" rowspan="1" />
  </tr>
  <tr>
    <td class="tg-0pky">微信登录</td>
    <td class="tg-0pky">N/A</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky" rowspan="1" />
  </tr>  
  <tr>
    <td class="tg-0pky">内容审核</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky">🟩</td>
    <td class="tg-0pky" rowspan="1" />
  </tr>
</tbody>
</table>

</details>

## 技术栈

- [uniapp](https://uniapp.dcloud.io/) - Android & iOS
- [微信小程序](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [Vue](https://vuejs.org/)
	- [Vuex](https://vuex.vuejs.org/)
- [eChart](https://echarts.apache.org/)
- [graphql](https://apollographql.com/)
- [surveyjs](https://github.com/surveyjs/survey-library)

### 安装
该仓库是一个标准的uniapp项目，使用模板[uni-template-news](https://github.com/dcloudio/uni-template-news)创建。

```shell
# 请根据uniapp的官方文档搭建开发环境，之后运行
npm install
```

### 编译代码

#### 本地测试环境（连通远程测试服务器）
```shell
# 一般情况下请用此方法进行开发
# 需要在'src/common/configs/development.js'中配置服务器及阿里云仓库。
npm run dev:mp-weixin
```
#### 本地测试环境（连通本地测试服务器）
```shell
# 需要在'src/common/configs/local.js'中配置服务器及阿里云仓库。
# 对于本地测试服务器，一般使用'http://localhost:7001/graphql'。
npm run local:mp-weixin
```
#### 生产环境（连通生产服务器）
```shell
# 需要在'src/common/configs/production.js'中配置服务器及阿里云仓库。
npm run build:mp-weixin
```
### 本地调试
1. 下载微信开发者工具https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
2. 打开微信开发者工具，联系管理员获取微信开发appid，打开项目，指定目录并填入appid
3. 在HBuilder中进行开发，在微信开发者工具中进行调试

## 更多信息


## 讨论

如您有任何问题，欢迎在项目中提交issue，我会在第一时间给与回复。

## 贡献者

[@Pas0412](https://github.com/Pas0412), [@zhangqi444](https://github.com/zhangqi444), [@zyc95 修仙大橙子](https://github.com/zyc95)

## 📄 协议

该项目基于MIT License开源.

