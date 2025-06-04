// 设置是否启用分流
// 如果不启用分流，则只更改DNS等全局配置信息，不启用策略组（即保持机场原始代理分组）
// true = 启用分流
// false = 不启用分流
const enable = true;

/*
 * 单项分流规则配置，根据单项分流开关决定是否生成对应的策略组
 * 设置的时候可遵循“最小，可用”原则，把自己不需要的规则全禁用掉，提高效率
 * true = 启用
 * false = 禁用
 */
const ruleOptions = {
    scholar: true, // 国外学术，大陆地区不能访问的学术网站
    communication: true, // 即时通讯，包括Telegram、WhatsApp、Line等国外即时通讯服务
    social: true, // 社交媒体，包括Twitter(X)、Facebook、Instagram等国外主流社交媒体
    chatgpt: true, // ChatGPT
    copilot: true, // Copilot
    ai: true, // 国外AI，大陆地区不能访问的AI服务
    github: true, // GitHub，GitHub服务
    speedtest: true, // 测速工具
    youtube: true, // YouTube
    appletvplus: true, // AppleTV+
    apple: true, // 苹果服务
    microsoft: true, // 微软服务
    googlefcm: true, // 谷歌FCM
    google: true, // 谷歌服务
    tiktok: true, // TikTok
    netflix: true, // Netflix
    disney: true, // Disney
    hbo: true, // HBO
    primevideo: true, // PrimeVideo
    emby: true, // Emby
    spotify: true, //Spotify
    bahamut: true, // 巴哈姆特
    bilibili: true, // 哔哩哔哩海外版
    pixiv: true, // Pixiv
    hulu: true, // Hulu
    steam: true, // Steam
    games: true, // 游戏平台
    entertainment: true, // 国外娱乐
    ecommerce: true, // 国外电商
    gfw: true, // GFW
};

// 默认域名服务器，必须是IP形式，用于解析其它域名服务器的域名或作为其它域名服务器不可用时的最后保障
// 实际上国内主流公共DNS和运营商DNS是没有被污染的，如果知道运营商DNS，只需要把默认的DNS设置为运营商DNS即可，而且只需要这一个DNS
// 也就是说default-nameserver、nameserver和proxy-server-nameserver都可以设置为运营商DNS
const defaultNameservers = ["223.5.5.5", "119.29.29.29"];

// 国内域名服务器
const domesticNameservers = [
    "https://dns.alidns.com/dns-query", // 阿里云公共DNS
    "https://doh.pub/dns-query" // 腾讯DNSPod
];

// 国外域名服务器
const foreignNameservers = [
    "https://1.1.1.1/dns-query", // Cloudflare(主)
    "https://208.67.222.222/dns-query" // OpenDNS(主)
];

// Fake IP 过滤配置
const fakeIPFilter = [
    "*.lan",
    "*.localdomain",
    "*.example",
    "*.invalid",
    "*.localhost",
    "*.test",
    "*.local",
    "*.home.arpa",
    "time.*.com",
    "time.*.gov",
    "time.*.edu.cn",
    "time.*.apple.com",
    "time-ios.apple.com",
    "time1.*.com",
    "time2.*.com",
    "time3.*.com",
    "time4.*.com",
    "time5.*.com",
    "time6.*.com",
    "time7.*.com",
    "ntp.*.com",
    "ntp1.*.com",
    "ntp2.*.com",
    "ntp3.*.com",
    "ntp4.*.com",
    "ntp5.*.com",
    "ntp6.*.com",
    "ntp7.*.com",
    "*.time.edu.cn",
    "*.ntp.org.cn",
    "+.pool.ntp.org",
    "time1.cloud.tencent.com",
    "music.163.com",
    "*.music.163.com",
    "*.126.net",
    "musicapi.taihe.com",
    "music.taihe.com",
    "songsearch.kugou.com",
    "trackercdn.kugou.com",
    "*.kuwo.cn",
    "api-jooxtt.sanook.com",
    "api.joox.com",
    "joox.com",
    "y.qq.com",
    "*.y.qq.com",
    "streamoc.music.tc.qq.com",
    "mobileoc.music.tc.qq.com",
    "isure.stream.qqmusic.qq.com",
    "dl.stream.qqmusic.qq.com",
    "aqqmusic.tc.qq.com",
    "amobile.music.tc.qq.com",
    "*.xiami.com",
    "*.music.migu.cn",
    "music.migu.cn",
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    "+.qq.com",
    "+.tencent.com",
    "+.srv.nintendo.net",
    "*.n.n.srv.nintendo.net",
    "+.cdn.nintendo.net",
    "+.stun.playstation.net",
    "xbox.*.*.microsoft.com",
    "*.*.xboxlive.com",
    "xbox.*.microsoft.com",
    "xnotify.xboxlive.com",
    "+.battlenet.com.cn",
    "+.wotgame.cn",
    "+.wggames.cn",
    "+.wowsgame.cn",
    "+.wargaming.net",
    "proxy.golang.org",
    "stun.*.*",
    "stun.*.*.*",
    "+.stun.*.*",
    "+.stun.*.*.*",
    "+.stun.*.*.*.*",
    "+.stun.*.*.*.*.*",
    "heartbeat.belkin.com",
    "*.linksys.com",
    "*.linksyssmartwifi.com",
    "*.router.asus.com",
    "mesu.apple.com",
    "swscan.apple.com",
    "swquery.apple.com",
    "swdownload.apple.com",
    "swcdn.apple.com",
    "swdist.apple.com",
    "lens.l.google.com",
    "stun.l.google.com",
    "na.b.g-tun.com",
    "+.nflxvideo.net",
    "*.square-enix.com",
    "*.finalfantasyxiv.com",
    "*.ffxiv.com",
    "*.ff14.sdo.com",
    "ff.dorado.sdo.com",
    "*.mcdn.bilivideo.cn",
    "+.media.dssott.com",
    "shark007.net",
    "Mijia Cloud",
    "+.cmbchina.com",
    "+.cmbimg.com",
    "local.adguard.org",
    "+.sandai.net",
    "+.n0808.com",
    "+.uu.163.com",
    "ps.res.netease.com",
    "+.services.googleapis.cn",
    "geosite:cn",
    "*.vanxue.cn",
    "*.aliyun.com"
];

// DNS配置
const dnsConfig = {
    enable: true,
    listen: "0.0.0.0:53",
    ipv6: true,
    "prefer-h3": true,
    "use-hosts": true,
    "use-system-hosts": true,
    "respect-rules": false,
    "cache-algorithm": "arc",
    "enhanced-mode": "fake-ip",
    "fake-ip-filter-mode": "blacklist",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter": [...fakeIPFilter],
    "default-nameserver": [...defaultNameservers],
    nameserver: [...domesticNameservers],
    "proxy-server-nameserver": [...domesticNameservers]
};

// 设置流量倍率上限，过滤掉倍率过高的节点
const ratioLimit = 2;

/*
 * 区域配置，用于通过正则表达式提取相应区域的节点
 * regex会有一定概率误判，可根据自己的实际情况调整
 */
const regions = [
    {
        name: "香港",
        regex: /香港|🇭🇰|hk|hongkong|hong kong/i,
        icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Hong_Kong.png",
    },
    {
        name: "台湾省",
        regex: /台湾|🇹🇼|tw|taiwan|tai wan/i,
        icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/China.png"
    },
    {
        name: "新加坡",
        regex: /新加坡|狮城|🇸🇬|sg|singapore/i,
        icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Singapore.png"
    },
    {
        name: "日本",
        regex: /日本|东京|大阪|京都|名古屋|神户|横滨|札幌|仙台|福冈|广岛|🇯🇵|jp|japan/i,
        icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Japan.png"
    },
    {
        name: "韩国",
        regex: /韩国|釜山|大邱|仁川|光州|大田|蔚山|🇰🇷|kr|korea/i,
        icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Korea.png"
    },
    {
        name: "美国",
        regex: /美国|洛杉矶|纽约|华盛顿|阿拉斯加|亚利桑那|科罗拉多|夏威夷|爱达荷|新墨西哥|蒙大拿|新泽西|俄亥俄|明尼苏达|密西西比|北卡罗来纳|南卡罗来纳|怀俄明|威斯康星|弗吉尼亚|西弗吉尼亚|田纳西|宾夕法尼亚|俄勒冈|德克萨斯|佐治亚|密歇根|🇺🇸|us|united state|america/i,
        icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/United_States.png"
    },
    {
        name: "澳大利亚",
        regex: /澳大利亚|悉尼|墨尔本|布里斯班|珀斯|阿德莱德|坎培拉|达尔文|荷伯特|🇦🇺|au|Australia/i,
        icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Australia.png"
    },
    {
        name: "英国",
        regex: /英国|伦敦|伯明翰|利兹|利物浦|格拉斯哥|谢菲尔德|曼彻斯特|爱丁堡|🇬🇧|uk|united kingdom|great britain/i,
        icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/United_Kingdom.png"
    },
    {
        name: "德国",
        regex: /德国|柏林|汉堡|慕尼黑|科隆|法兰克福|杜塞尔多夫|🇩🇪|de|germany/i,
        icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Germany.png"
    },
    {
        name: "马来西亚",
        regex: /马来西亚|吉隆坡|古晋|亚庇|莎亚南|马六甲市|亚罗士打|美里|关丹|🇲🇾|my|malaysia/i,
        icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Malaysia.png"
    },
    {
        name: "土耳其",
        regex: /土耳其|阿达纳|阿菲永|阿马西亚|阿纳穆尔|安卡拉|安塔利亚|艾登|巴勒克埃西尔|🇹🇷|tk|turkey/i,
        icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Turkey.png"
    }
];

// 代理组通用配置
const groupCommonOptions = {
    url: "http://cp.cloudflare.com/generate_204",
    interval: 180,
    timeout: 3000,
    "max-failed-times": 3,
    lazy: false,
    hidden: false
};

// 手动组通用配置，专为手动选择设置，用于覆盖代理组通用配置，因此使用时必须先调用代理组通用配置，再调用手动组通用配置
const selectGroupCommonOptions = {
    hidden: false,
    type: "select"
};

// 自动组通用配置，专为自动选择组设置，用于覆盖代理组通用配置，因此使用时必须先调用代理组通用配置，再调用自动组通用配置
const autoGroupCommonOptions = {
    hidden: true, // 自动组默认隐藏
    type: "url-test", // 自动组默认通过测速自动选择最快节点
    tolerance: 100 // 容忍度设置为100毫秒，该项表示自动切换节点的依据，只有组内最快节点的延迟与当前节点的延迟差距超过该值时，才会自动切换节点
};

// 故障转移组通用配置，用于覆盖代理组通用配置，因此使用时必须先调用代理组通用配置，再调用故障转移组通用配置
const fallbackGroupCommonOptions = {
    hidden: true, // 故转组默认隐藏
    type: "fallback", //故转组的proxies包含同区域的手动组和自动组，主要用于防止跳ip
    lazy: false, // 故转组必须关掉lazy，否则可能导致手动组节点挂掉后长时间不能自动切换
    interval: 180 // 故转组可以设置自己的节点测试间隔覆盖代理组通用的测试时间间隔
};

// 规则源通用配置
const providerCommonOptions = {
    type: "http",
    behavior: "classical",
    interval: 28800
};



function main(config) {
    const proxyCount = config?.proxies?.length ?? 0;
    const proxyProviderCount = typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
    if (proxyCount === 0 && proxyProviderCount === 0) {
        throw new Error("配置文件中未找到任何代理服务器！请检查配置文件，确保至少有一个代理服务器或代理服务器提供商。");
    }

    // 全局设置
    config["allow-lan"] = true; // 允许局域网访问
    config["bind-address"] = "*"; // 绑定地址为所有IP
    config["mode"] = "rule"; // 设置模式为规则模式
    config["external-controller"] = "127.0.0.1:9090"; // 设置外部控制器地址
    config["log-level"] = "info"; // 设置日志级别为info
    config["keep-alive-interval"] = 15; // 设置TCP连接空闲时的保活时间间隔，以秒为单位
    config["keep-alive-idle"] = 600; // 设置TCP连接空闲时的保活时间，以秒为单位
    config["unified-delay"] = true; // 启用统一延迟
    config["tcp-concurrent"] = true; // 启用TCP并发连接
    config["find-process-mode"] = "strict"; // 设置查找进程模式为严格模式
    config["geodata-mode"] = true; // 启用地理数据模式
    config["geodata-loader"] = "standard"; // 设置地理数据加载器为标准模式
    config["geo-auto-update"] = true; // 启用地理数据自动更新
    config["geo-update-interval"] = 24; // 设置地理数据自动更新间隔为24小时
    config["ipv6"] = true; // 启用IPv6支持

    // 设置DNS
    config["dns"] = dnsConfig;

    // 开启流量嗅探
    config["sniffer"] = {
        enable: true,
        "force-dns-mapping": true,
        "parse-pure-ip": true,
        "override-destination": true,
        sniff: {
            TLS: {
                ports: [443, 8443]
            },
            HTTP: {
                ports: [80, "8080-8880"]
            },
            QUIC: {
                ports: [443, 8443]
            }
        },
        "force-domain": ["+.netflix.com", "+.nflxvideo.net", "+.amazonaws.com", "+.media.dssott.com"],
        "skip-domain": ["+.apple.com", "Mijia Cloud", "dlg.io.mi.com", "+.oray.com", "+.sunlogin.net", "+.push.apple.com"]
    };

    // 若不启用分流，则在此直接返回config
    if (!enable) {
        return config;
    }

    // 设置按区域划分的代理组，简称区域组
    let regionGroups = [];

    // 获取所有节点的名称
    let tempProxies = config?.proxies?.map((p) => { return p.name; });

    // 将代理节点名称按区域提取到相应区域组，并将提取到区域组的节点名从tempProxies中移除
    regions.forEach((region) => {
        //对于每个region，根据其regex和倍率上限提取对应的代理节点名，并暂时保存在temp中
        let temp = config?.proxies?.filter((p) => {
            const ratio = /(?<=[xX✕✖⨉倍率])([1-9]+(\.\d+)*|0{1}\.\d+)(?=[xX✕✖⨉倍率])*/i.exec(p.name)?.[1];
            return (p.name.match(region.regex) && parseFloat(ratio || "0") <= ratioLimit);
        }).map((p) => { return p.name; });

        //如果temp不为空，则将其添加到regionGroups中
        if (temp.length > 0) {
            // 添加故转组
            regionGroups.push({
                ...groupCommonOptions,
                ...fallbackGroupCommonOptions,
                name: region.name + "故转",
                icon: region.icon,
                proxies: [region.name + "节点", region.name + "自动"]
            });
            // 添加同区域自动组
            regionGroups.push({
                ...groupCommonOptions,
                ...autoGroupCommonOptions,
                name: region.name + "自动",
                icon: region.icon,
                proxies: temp
            });
            // 添加同区域手动组
            regionGroups.push({
                ...groupCommonOptions, // 使用代理组通用配置
                ...selectGroupCommonOptions, // 使用手动组通用配置（会覆盖代理组通用配置中的重复选项）
                name: region.name + "节点",
                icon: region.icon,
                proxies: temp
            });

            // 从tempProxies中移除已添加到temp的节点
            tempProxies = tempProxies.filter((p) => !temp.includes(p));
        }
    });

    // 如果tempProxies不为空，则创建"其它区域"区域组
    if (tempProxies.length > 0) {
        // 其它区域故转
        regionGroups.push({
            ...groupCommonOptions,
            ...fallbackGroupCommonOptions,
            name: "其它区域故转",
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/World_Map.png",
            proxies: ["其它区域节点", "其它区域自动"]
        });
        // 其它区域自动
        regionGroups.push({
            ...groupCommonOptions,
            ...autoGroupCommonOptions,
            name: "其它区域自动",
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/World_Map.png",
            proxies: tempProxies
        });
        // 其它区域手动
        regionGroups.push({
            ...groupCommonOptions,
            ...selectGroupCommonOptions,
            name: "其它区域节点",
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/World_Map.png",
            proxies: tempProxies
        });
    }

    // 为config.proxies添加直连节点
    config.proxies = config?.proxies || [];
    config.proxies.push({
        name: "直连",
        type: "direct",
        udp: true,
    });

    // 获取区域组的组名，用于构建策略组
    const regionGroupNames = regionGroups.map((g) => { return g.name; });

    // 创建策略组
    let policyGroups = [
        {
            ...groupCommonOptions,
            name: "默认代理",
            type: "select",
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Rocket.png",
            proxies: ["自动选择", "全球直连", ...regionGroupNames, "全部节点"]
        },
        {
            ...groupCommonOptions,
            name: "自动选择",
            type: "url-test",
            tolerance: 100,
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Auto.png",
            proxies: config?.proxies?.map((p) => { return p.name; })
        },
        {
            ...groupCommonOptions,
            name: "全球直连",
            type: "select",
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Direct.png",
            proxies: ["直连"]
        },
        {
            ...groupCommonOptions,
            name: "全部节点",
            type: "select",
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Global.png",
            proxies: config?.proxies?.map((p) => { return p.name; })
        }
    ];

    // 设置规则源
    const ruleProviders = new Map();
    ruleProviders.set("Custom_Direct", {
        ...providerCommonOptions,
        format: "text",
        url: "https://raw.githubusercontent.com/Aethersailor/Custom_OpenClash_Rules/main/rule/Custom_Direct.list",
        path: "./rule_provider/Custom_Direct.list"
    });
    ruleProviders.set("Custom_Proxy", {
        ...providerCommonOptions,
        format: "text",
        url: "https://raw.githubusercontent.com/Aethersailor/Custom_OpenClash_Rules/main/rule/Custom_Proxy.list",
        path: "./rule_provider/Custom_Proxy.list"
    });
    ruleProviders.set("Steam_CDN", {
        ...providerCommonOptions,
        format: "text",
        url: "https://raw.githubusercontent.com/Aethersailor/Custom_OpenClash_Rules/main/rule/Steam_CDN.list",
        path: "./rule_provider/Steam_CDN.list"
    });

    // 设置规则
    let rules = [
        // 本地地址和域名直连
        "GEOSITE,private,全球直连",
        "GEOIP,private,全球直连,no-resolve",
        // Aethersailor/Custom_OpenClash_Rules收录的直连域名规则
        "RULE-SET,Custom_Direct,全球直连",
        // Aethersailor/Custom_OpenClash_Rules收录的直连域名规则
        "RULE-SET,Custom_Proxy,默认代理",
        // 谷歌在国内的可用域名强制直连
        "GEOSITE,google-cn,全球直连",
        // 国内游戏域名强制直连
        "GEOSITE,category-games@cn,全球直连",
        // Steam下载的CDN地址强制直连
        "RULE-SET,Steam_CDN,全球直连",
        // 各大游戏平台的下载域名强制直连
        "GEOSITE,category-game-platforms-download,全球直连",
        // BT Tracker相关域名强制直连
        "GEOSITE,category-public-tracker,全球直连"
    ];

    // 按条件设置代理组及其规则
    if (ruleOptions.scholar) {
        rules.push("GEOSITE,category-scholar-!cn,国外学术");
        policyGroups.push({
            ...groupCommonOptions,
            name: "国外学术",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Scholar.png"
        });
    }
    if (ruleOptions.communication) {
        rules.push("GEOSITE,category-communication,即时通讯");
        policyGroups.push({
            ...groupCommonOptions,
            name: "即时通讯",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Telegram.png"
        });
    }
    if (ruleOptions.social) {
        rules.push("GEOSITE,category-social-media-!cn,社交媒体");
        policyGroups.push({
            ...groupCommonOptions,
            name: "社交媒体",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Twitter.png"
        });
    }
    if (ruleOptions.chatgpt) {
        rules.push("GEOSITE,openai,ChatGPT");
        policyGroups.push({
            ...groupCommonOptions,
            name: "ChatGPT",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/ChatGPT.png"
        });
    }
    if (ruleOptions.copilot) {
        rules.push("GEOSITE,bing,Copilot");
        policyGroups.push({
            ...groupCommonOptions,
            name: "Copilot",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Copilot.png"
        });
    }
    if (ruleOptions.ai) {
        rules.push("GEOSITE,category-ai-!cn,国外AI");
        policyGroups.push({
            ...groupCommonOptions,
            name: "国外AI",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/AI.png"
        });
    }
    if (ruleOptions.github) {
        rules.push("GEOSITE,github,GitHub");
        policyGroups.push({
            ...groupCommonOptions,
            name: "GitHub",
            type: "select",
            proxies: ["默认代理", "自动选择", ...regionGroupNames, "全部节点", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/GitHub.png"
        });
    }
    if (ruleOptions.speedtest) {
        rules.push("GEOSITE,category-speedtest,测速工具");
        policyGroups.push({
            ...groupCommonOptions,
            name: "测速工具",
            type: "select",
            proxies: ["全球直连", "全部节点", "默认代理", "自动选择", ...regionGroupNames],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Speedtest.png"
        });
    }
    if (ruleOptions.youtube) {
        rules.push("GEOSITE,youtube,YouTube");
        policyGroups.push({
            ...groupCommonOptions,
            name: "YouTube",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/YouTube.png"
        });
    }
    if (ruleOptions.appletvplus) {
        rules.push("GEOSITE,apple-tvplus,AppleTV+");
        policyGroups.push({
            ...groupCommonOptions,
            name: "AppleTV+",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Apple_TV_Plus.png"
        });
    }
    if (ruleOptions.apple) {
        rules.push("GEOSITE,apple,苹果服务");
        policyGroups.push({
            ...groupCommonOptions,
            name: "苹果服务",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Apple.png"
        });
    }
    if (ruleOptions.microsoft) {
        rules.push("GEOSITE,microsoft,微软服务");
        policyGroups.push({
            ...groupCommonOptions,
            name: "微软服务",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Microsoft.png"
        });
    }
    if (ruleOptions.googlefcm)
    {
        rules.push("GEOSITE,googlefcm,谷歌FCM");
        policyGroups.push({
            ...groupCommonOptions,
            name: "谷歌FCM",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Google.png"
        });
    }
    if (ruleOptions.google)
    {
        rules.push("GEOSITE,google,谷歌服务");
        policyGroups.push({
            ...groupCommonOptions,
            name: "谷歌服务",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Google_Search.png"
        });
    }
    if (ruleOptions.tiktok) {
        rules.push("GEOSITE,tiktok,TikTok");
        policyGroups.push({
            ...groupCommonOptions,
            name: "TikTok",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/TikTok.png"
        });
    }
    if (ruleOptions.netflix) {
        rules.push("GEOSITE,netflix,NETFLIX");
        policyGroups.push({
            ...groupCommonOptions,
            name: "NETFLIX",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Netflix.png"
        });
    }
    if (ruleOptions.disney) {
        rules.push("GEOSITE,disney,Disney");
        policyGroups.push({
            ...groupCommonOptions,
            name: "Disney",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Disney.png"
        });
    }
    if (ruleOptions.hbo) {
        rules.push("GEOSITE,hbo,HBO");
        policyGroups.push({
            ...groupCommonOptions,
            name: "HBO",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/HBO.png"
        });
    }
    if (ruleOptions.primevideo) {
        rules.push("GEOSITE,primevideo,PrimeVideo");
        policyGroups.push({
            ...groupCommonOptions,
            name: "PrimeVideo",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Prime_Video.png"
        });
    }
    if (ruleOptions.emby) {
        rules.push("GEOSITE,category-emby,Emby");
        policyGroups.push({
            ...groupCommonOptions,
            name: "Emby",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Emby.png"
        });
    }
    if (ruleOptions.spotify) {
        rules.push("GEOSITE,spotify,Spotify");
        policyGroups.push({
            ...groupCommonOptions,
            name: "Spotify",
            type: "select",
            proxies: ["默认代理", "自动选择", ...regionGroupNames, "全部节点", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Spotify.png"
        });
    }
    if (ruleOptions.bahamut) {
        rules.push("GEOSITE,bahamut,巴哈姆特");
        policyGroups.push({
            ...groupCommonOptions,
            name: "巴哈姆特",
            type: "select",
            proxies: ["台湾省故转", "台湾省自动", "台湾省节点", "全球直连", "默认代理", "自动选择", "全部节点"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Bahamut.png"
        });
    }
    if (ruleOptions.bilibili) {
        rules.push("GEOSITE,bilibili,哔哩哔哩海外版");
        rules.push("GEOSITE,bilibili-game,哔哩哔哩海外版");
        rules.push("GEOSITE,bilibili2,哔哩哔哩海外版");
        policyGroups.push({
            ...groupCommonOptions,
            name: "哔哩哔哩海外版",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/bilibili_3.png"
        });
    }
    if (ruleOptions.pixiv) {
        rules.push("GEOSITE,pixiv,Pixiv");
        policyGroups.push({
            ...groupCommonOptions,
            name: "Pixiv",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/ForeignMedia.png"
        });
    }
    if (ruleOptions.hulu) {
        rules.push("GEOSITE,hulu,Hulu");
        policyGroups.push({
            ...groupCommonOptions,
            name: "Hulu",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Hulu.png"
        });
    }
    if (ruleOptions.steam) {
        rules.push("GEOSITE,steam,Steam");
        policyGroups.push({
            ...groupCommonOptions,
            name: "Steam",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Steam.png"
        });
    }
    if (ruleOptions.games) {
        rules.push("GEOSITE,category-games,游戏平台");
        policyGroups.push({
            ...groupCommonOptions,
            name: "游戏平台",
            type: "select",
            proxies: [...regionGroupNames, "全部节点", "默认代理", "自动选择", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Game.png"
        });
    }
    if (ruleOptions.entertainment) {
        rules.push("GEOSITE,category-entertainment,国外娱乐");
        policyGroups.push({
            ...groupCommonOptions,
            name: "国外娱乐",
            type: "select",
            proxies: ["默认代理", "自动选择", ...regionGroupNames, "全部节点", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/ForeignMedia.png"
        });
    }
    if (ruleOptions.ecommerce) {
        rules.push("GEOSITE,category-games,国外电商");
        policyGroups.push({
            ...groupCommonOptions,
            name: "国外电商",
            type: "select",
            proxies: ["默认代理", "自动选择", ...regionGroupNames, "全部节点", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Amazon.png"
        });
    }
    if (ruleOptions.gfw) {
        rules.push("GEOSITE,gfw,GFW");
        policyGroups.push({
            ...groupCommonOptions,
            name: "GFW",
            type: "select",
            proxies: ["默认代理", "自动选择", ...regionGroupNames, "全部节点", "全球直连"],
            icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Proxy.png"
        });
    }
    rules.push("GEOIP,telegram,即时通讯,no-resolve");
    rules.push("GEOIP,twitter,社交媒体,no-resolve");
    rules.push("GEOIP,facebook,社交媒体,no-resolve");
    rules.push("GEOIP,google,谷歌服务,no-resolve");
    rules.push("GEOIP,netflix,NETFLIX,no-resolve");
    // 由于Clash使用的大陆白名单收录不全，此处添加geosite:cn作为国内域名兜底
    rules.push("GEOSITE,cn,全球直连");
    // 类似国内域名兜底，此处添加国内IP兜底
    rules.push("GEOIP,cn,全球直连,no-resolve");
    // 最后兜底
    rules.push("MATCH,漏网之鱼");
    policyGroups.push({
        ...groupCommonOptions,
        name: "漏网之鱼",
        type: "select",
        proxies: ["默认代理", "自动选择", ...regionGroupNames, "全部节点", "全球直连"],
        icon: "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Panda.png"
    });

    // 将策略组和区域组合并为config的代理组（config["proxy-groups"]）
    config["proxy-groups"] = policyGroups.concat(regionGroups);

    // 设置规则源
    config["rule-providers"] = Object.fromEntries(ruleProviders);

    // 设置规则
    config["rules"] = rules;

    return config;
}
