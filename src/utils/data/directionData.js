let directionOptions=[
    {
        value: '医药、卫生',
        label: '医药、卫生',
        children: [
            {value: '临床医学', label: '临床医学',
            children:[

                {value:'护理学', label:'护理学'},
                {value:'诊断学',label:'诊断学'},
                {value:'治疗学',label:'治疗学'},
                {value:'康复医学',label:'康复医学'},
            ]
            },
            {value: '中国医学', label: '中国医学',
            children: [

                {value:'中药学',label: '中药学'},
                {value:'中医临床学',label:'中医临床学'},
                {value:'中医内科学',label:'中医内科学'},
                {value:'中国医学理论',label:'中国医学理论'},

            ]
            },
            {value: '内科学', label: '内科学',
            children: [

                {value:'心脏、血管疾病', label:'心脏、血管疾病'},
                {value:'内分泌腺疾病及代谢病',label: '内分泌腺疾病及代谢病'},
                {value:'消化系及腹部疾病', label:'消化系及腹部疾病'},
                {value:'传染病',label: '传染病'},
                {value:'呼吸系及胸部疾病',label:'呼吸系及胸部疾病'},
            ]},
            {value: '外科学', label: '外科学',
            children: [

                {value:'骨科学',label:'骨科学'},
                {value:'外科学各论',label:'外科学各论'},
                {value:'泌尿科学',label:'泌尿科学'},
                {value:'外科手术学',label:'外科手术学'},
                {value:'创伤外科学',label: '创伤外科学'},
                {value:'外科感染',label: '外科感染'},
            ]},
            {value: '肿瘤学', label: '肿瘤学',
            children: [
                {value:'消化系肿瘤',label: '消化系肿瘤'},
                {value:'一般性问题',label:'一般性问题'},
                {value:'泌尿生殖器肿瘤',label:'泌尿生殖器肿瘤'},
                {value:'呼吸系肿瘤',label:'呼吸系肿瘤'},
                {value:'造血器及淋巴系肿瘤',label:'造血器及淋巴系肿瘤'},
            ]},

        ],
    }, {
        value: '工业技术',
        label: '工业技术',
        children: [
            {value: '自动化技术', label: '自动化技术',
            children: [
                {value:'计算技术、计算机技术',label:'计算技术、计算机技术'},
                {value:'自动化技术及设备',label:'自动化技术及设备'},
                {value:'自动化基础理论',label:'自动化基础理论'},
                {value:'遥感技术',label: '遥感技术'},
            ]},
            {value: '电子技术', label: '电子技术',
            children: [
                {value:'通信',label: '通信'},
                {value:'无线通信',label: '无线通信'},
                {value:'电视',label: '电视'},
                {value:'雷达',label:'雷达'},
            ]},
            {value: '电工技术', label: '电工技术',
            children: [
                {value:'输配电工程',label:'输配电工程'},
                {value:'发电、发电厂',label:'发电、发电厂'},
                {value:'电机',label:'电机'},
                {value:'电气测量技术及仪器',label: '电气测量技术及仪器'},
            ]},
            {value: '建筑科学', label: '建筑科学',
            children: [
                {value:'区域规划',label:'区域规划'},
                {value:'市政工程',label:'市政工程'},
                {value:'建筑施工',label:'建筑施工'},
                {value:'地下建筑',label: '地下建筑'},
            ]},
            {value: '机械、仪表工业', label: '机械、仪表工业',
            children: [
                {value:'机械制造工艺',label: '机械制造工艺'},
                {value:'仪器、仪表',label: '仪器、仪表'},
                {value:'机械设计',label:'机械设计'},
                {value:'机械零件及传',label:'机械零件及传'},
            ]},

        ],
    },
    {
        value: '政治、法律',
        label: '政治、法律',
        children: [
            {value: '中国政治', label: '中国政治',
            children: [
                {value:'国家行政管理',label: '国家行政管理'},
                {value:'社会生活',label:'社会生活'},
                {value:'政治制度与国家机构',label:'政治制度与国家机构'},
                {value:'中国革命',label: '中国革命'},
            ]},
            {value: '世界政治', label: '世界政治',
            children: [
                {value:'世界政治制度与国家行政管理',label: '世界政治制度与国家行政管理'},
                {value:'社会生活',label:'社会生活'},
                {value:'国际政治矛盾与斗争',label: '国际政治矛盾与斗争'},
                {value:'世界政治概况',label:'世界政治概况'},

            ]},
            {value: '欧洲政治', label: '欧洲政治',
            children: [

            ]},
            {value: '亚洲政治', label: '亚洲政治',
            children: [

            ]},
            {value: '法律', label: '法律',
            children: [
                '中国法律','中国法律',
                '法学各部门','法学各部门',
                '国际法', '国际法',
                '法律理论', '法律理论',
            ]},
        ],
    },
    {
        value:'基础科学',
        label: '基础科学',
        children: [
            {value:'数学', label:'数学',
            children: [
                {value:'代数、组合理论',label: '代数、组合理论'},
                {value:'概率论与数理统计',label: '概率论与数理统计'},
                {value:'数学分析',label:'数学分析'},
                {value:'控制论',label:'控制论'},
            ]},
            {value:'物理学', label:'物理学',
            children: [
                {value:'光学',label:'光学'},
                {value:'原子核物理学',label:'原子核物理学'},
                {value:'理论物理学', label:'理论物理学'},
                {value:'分子物理学',label:'分子物理学'},
            ]},
            {value:'化学', label:'化学',
            children: [
                {value:'一般性问题',label:'一般性问题'},
                {value:'硅酸盐工业',label: '硅酸盐工业'},
                {value:'制药化学工业',label:'制药化学工业'},

            ]},
            {value:'天文学、地球科学', label:'天文学、地球科学',
            children: [
                {value:'测绘学',label:'测绘学'},
                {value:'地质学',label:'地质学'},
                {value:'大气科学',label:'大气科学'},
                {value:'地球物理学',label: '地球物理学'},
                {value:'海洋学',label:'海洋学'},
            ]},
            {value:'生物科学', label:'生物科学',
            children: [
                {value:'分子生物学',label: '分子生物学'},
                {value:'植物学', label:'植物学'},
                {value:'生物化学',label: '生物化学'},
                {value:'微生物学',label:'微生物学'},
                {value:'生物工程学',label:  '生物工程学'},
            ]},
        ],
    },
    {
        value: '经济',
        label: '经济',
        children: [
            {value: '经济管理', label: '经济管理',
            children: [
                {value:'企业经济',label:'企业经济'},
                {value:'城市与市政经济',label:'城市与市政经济'},
                {value:'物流经济',label:'物流经济'},
                {value:'国民经济管理',label:'国民经济管理'},
            ]},
            {value: '工业经济', label: '工业经济',
            children: [
                {value:'中国工业经济',label:'中国工业经济'},
                {value:'工业经济理论',label:  '工业经济理论'},
                {value:'世界工业经济',label: '世界工业经济'},
            ]},
            {value: '财政、金融', label: '财政、金融',
            children: [
                {value:'金融、银行',label:'金融、银行'},
                {value:'财政、国家财政',label: '财政、国家财政'},
                {value:'保险',label:'保险'},
            ]},
        ],
    },

]
export {directionOptions}