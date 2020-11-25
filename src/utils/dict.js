
/* --------------------------GB------------------ */
/* 经济类型 */
const DICT_ECONOMIC_TYPE = 'GB/T 12402'
/* 经济类型 */
const DICT_ADMINISTRATIVE_DIVISION = 'GB/T 2260'
/* 卫生监督机构隶属关系 */
const DICT_SUPERVISORY_SUBORDINATION = 'GB/T 12404'
/* 国籍 */
const DICT_NATIONALITY = 'GB/T 2659'
/* 民族 */
const DICT_NATION = 'GB/T 3304'
/* 性别 */
const DICT_GENDER = 'GB/T 2261.1'
/* 学历 */
const DICT_EDUCATION = 'GB/T 4658'
/* 学位 */
const DICT_DEGREE = 'GB/T 6864'
/* 专业 */
const DICT_SUBJECT = 'GB/T 16835'
/* 专业技术职务 */
const DICT_TECHNICAL_QUALIFICATIONS = 'GB/T 8561'
/* 行政/业务管理职务 */
const DICT_MANAGEMENT = 'GB/T 12403'

/* ----------------------------WS ST ------------------ */
/* 机构类别 */
const DICT_ORG_CATEGORY = 'WS218-2002'

/* ----------------------------WS CV ------------------ */
/* 卫生监督机构性质 */
const DICT_SUPERVISORY_PROPERTY = 'CV08.10.001'
/* 卫生监督机构行政级别 */
const DICT_ADMINISTRATIVE_LEVEL = 'CV08.10.002'
/* 监督机构科室 */
const DICT_SUPERVISORY_DEPT = 'CV08.10.003'
/* 血吸虫病诊断(治疗)机构级别 */
const DICT_BILHARZIASIS_ORG_LEVEL = 'CV08.10.006'
/* 专业技术职务类别 */
const DICT_TECHNICAL_POSITION = 'CV08.30.005'
/* 监督人员编制类别 */
const DICT_SUPERVISORY_AUTHORIZED = 'CV08.30.001'
/* 监督人员职工类别 */
const DICT_SUPERVISORY_EMPLOYEE = 'CV08.30.002'
/* 监督员执业范围 */
const DICT_SUPERVISORY_PRACTICE = 'CV08.30.003'

/* ----------------------------MDM ------------------ */
/* 全国医疗卫生机构业务科室分类与代码 */
const DICT_HEALTHCARE_SUBJECT = 'MDM0006'
/* 婚姻状况 */
const DICT_MARITAL = ''
/* 政治面貌 */
const DICT_POLITICS = ''

/* 职称 */
const DICT_TITLE = ''
/* 人员类别 */
const DICT_PRACTITIONER_CATEGORY = ''

/* -----------------------LOCAL--------------- */
/* 定义常量对人员权限按钮权限管理 */
const PRACTITIONERISSHOW = true
/* 医院级别 */
const DICT_ORG_LEVEL = [
  {
    label: '三级',
    value: '三级'
  },
  {
    label: '二级',
    value: '二级'
  },
  {
    label: '一级',
    value: '一级'
  },
  {
    label: '未定级',
    value: '未定级'
  }
]
/* 医院等次 */
const DICT_ORG_GRADE = [
  {
    label: '特等',
    value: '特等'
  },
  {
    label: '甲等',
    value: '甲等'
  },
  {
    label: '乙等',
    value: '乙等'
  },
  {
    label: '丙等',
    value: '丙等'
  }
]
/* 医院分类管理 */
const DICT_ORG_MANAGE_CLASS = [
  {
    value: '1',
    label: '营利性机构'
  },
  {
    value: '2',
    label: '非营利性机构'
  },
  {
    value: '3',
    label: '其他'
  }
]
/* 布尔字典 */
const DICT_BOOLEAN = [
  {
    value: false,
    label: '否'
  },
  {
    value: true,
    label: '是'
  }
]

const DICT_SEX = [
  {
    value: '1',
    label: '男'
  },
  {
    value: '2',
    label: '女'
  }
]
const DICT_DS_TYPE = [
  { label: 'Oracle', value: 'Oracle' },
  { label: 'SQLServer', value: 'SQLServer' },
  { label: 'Mysql', value: 'Mysql' }
]
const DICT_DS_URL = {
  Oracle: 'jdbc:oracle:thin:@localhost:1521:SID',
  SQLServer: 'jdbc:sqlserver://localhost:1433;DatabaseName=DB',
  Mysql: 'jdbc:mysql://localhost:3306/DB'
}
const mdmDicDefaultProps = {
  label: 'NAME',
  value: 'CODE'
}

const cvDicProps = {
  label: 'value',
  value: 'code'
}

const sysDicProps = {
  label: 'dictValue',
  value: 'dictCode'
}

/* 科室类别 */
const DEPT_CATEGORY = [
  {
    label: '1',
    value: '临床'
  },
  {
    label: '2',
    value: '职能'
  },
  {
    label: '3',
    value: '医技'
  }
]

/* 业务隶属 */
const BUSINESS_SUBJECTION = [
  {
    label: '0',
    value: '不区分'
  },
  {
    label: '1',
    value: '门急诊'
  },
  {
    label: '2',
    value: '住院'
  },
  {
    label: '9',
    value: '其他'
  }
]

/* 属性取值类型 */
const DICT_EXTTYPE = [
  {
    value: '1',
    label: 'URL'
  },
  {
    value: '2',
    label: '自定义JSON数组'
  }
]

/* 用户扩展属性配置界面填写方式 */
const DICT_FILLINTYPE = [
  {
    value: '1',
    label: '下拉选择'
  },
  {
    value: '2',
    label: '表单填写'
  }
]

module.exports = {
  mdmDicDefaultProps,
  cvDicProps,
  sysDicProps,
  DICT_ECONOMIC_TYPE,
  DICT_ADMINISTRATIVE_DIVISION,
  DICT_SUPERVISORY_SUBORDINATION,
  DICT_ORG_CATEGORY,
  DICT_SUPERVISORY_PROPERTY,
  DICT_ADMINISTRATIVE_LEVEL,
  DICT_SUPERVISORY_DEPT,
  DICT_BILHARZIASIS_ORG_LEVEL,
  DICT_HEALTHCARE_SUBJECT,
  DICT_ORG_LEVEL,
  DICT_ORG_GRADE,
  DICT_ORG_MANAGE_CLASS,
  DEPT_CATEGORY,
  BUSINESS_SUBJECTION,
  DICT_BOOLEAN,
  DICT_SEX,
  DICT_DS_TYPE,
  DICT_DS_URL,
  DICT_NATIONALITY,
  DICT_NATION,
  DICT_GENDER,
  DICT_MARITAL,
  DICT_POLITICS,
  DICT_EDUCATION,
  DICT_DEGREE,
  DICT_SUBJECT,
  DICT_TECHNICAL_QUALIFICATIONS,
  DICT_TECHNICAL_POSITION,
  DICT_MANAGEMENT,
  DICT_TITLE,
  DICT_PRACTITIONER_CATEGORY,
  DICT_SUPERVISORY_AUTHORIZED,
  DICT_SUPERVISORY_EMPLOYEE,
  DICT_SUPERVISORY_PRACTICE,
  DICT_EXTTYPE,
  PRACTITIONERISSHOW,
  DICT_FILLINTYPE

}
