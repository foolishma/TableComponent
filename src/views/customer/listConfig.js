/**
 * 客户管理列表配置文件
 */
export default {
  // API 配置
  api: {
    url: '/api/customer/list',
    method: 'get'
  },

  // 表格配置
  tableConfig: {
    stripe: true,
    border: true,
    height: 'auto',
    maxHeight: 600,
    rowKey: 'id',
    autoHeight: true,
    showPagination: true,
    showIndex: true,
    showAction: true,

    // 行选择配置
    selection: {
      enabled: true,
      type: 'multiple',
      rowClickSelect: true,
      reserveSelection: true
    },

    // 顶部按钮配置
    topButtons: [
      {
        label: '新增客户',
        type: 'primary',
        id: 'customerList:add',
        funcName: 'handleAdd',
        icon: 'Plus'
      },
      {
        label: '导出',
        type: 'success',
        id: 'customerList:export',
        funcName: 'handleExport',
        icon: 'Download'
      },
      {
        label: '批量删除',
        type: 'danger',
        id: 'customerList:batchDel',
        funcName: 'handleBatchDelete',
        icon: 'Delete'
      }
    ]
  },

  // 表格列配置
  columns: [
    {
      prop: 'customerName',
      label: '客户名称',
      minWidth: 150,
      showOverflowTooltip: true
    },
    {
      prop: 'customerCode',
      label: '客户编码',
      width: 120
    },
    {
      prop: 'customerShortName',
      label: '客户简称',
      width: 120
    },
    {
      prop: 'customerType',
      label: '客户类型',
      width: 100,
      formatter: (row) => {
        // 根据字典值格式化显示
        return row.customerTypeName || row.customerType
      }
    },
    {
      prop: 'city',
      label: '所在城市',
      width: 120
    },
    {
      prop: 'status',
      label: '客户状态',
      width: 100,
      formatter: (row) => {
        return row.statusName || row.status
      }
    },
    {
      prop: 'siteCount',
      label: '驻点数',
      width: 80,
      align: 'center'
    },
    {
      prop: 'createTime',
      label: '创建时间',
      width: 180,
      sortable: true
    },
    {
      prop: 'actions',
      label: '操作',
      type: 'action',
      fixed: 'right',
      width: 250,
      buttons: [
        {
          label: '查看',
          type: 'info',
          id: 'customerList:view',
          funcName: 'handleView',
          icon: 'View',
          size: 'small'
        },
        {
          label: '编辑',
          type: 'primary',
          id: 'customerList:edit',
          funcName: 'handleEdit',
          icon: 'Edit',
          size: 'small'
        },
        {
          label: '客户评价',
          type: 'warning',
          id: 'customerList:evaluate',
          funcName: 'handleEvaluate',
          icon: 'Star',
          size: 'small'
        },
        {
          label: '删除',
          type: 'danger',
          id: 'customerList:del',
          funcName: 'handleDelete',
          icon: 'Delete',
          size: 'small',
          confirm: {
            title: '确认删除',
            message: '删除后不可恢复，是否继续？',
            type: 'warning'
          }
        }
      ]
    }
  ],

  // 查询条件配置
  queryConditions: [
    {
      prop: 'customerName',
      label: '客户名称',
      placeholder: '请输入客户名称',
      type: 'input'
    },
    {
      prop: 'customerCode',
      label: '客户编码',
      placeholder: '请输入客户编码',
      type: 'input'
    },
    {
      prop: 'customerType',
      label: '客户类型',
      placeholder: '请选择客户类型',
      type: 'select',
      dict: 'customerType',
      clearable: true
    },
    {
      prop: 'status',
      label: '客户状态',
      placeholder: '请选择客户状态',
      type: 'select',
      dict: 'customerStatus',
      clearable: true
    },
    {
      prop: 'city',
      label: '所在城市',
      placeholder: '请选择城市',
      type: 'select',
      dict: 'city',
      clearable: true
    },
    {
      prop: 'createTime',
      label: '创建时间',
      type: 'daterange',
      span: 12,
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      format: 'YYYY-MM-DD',
      valueFormat: 'YYYY-MM-DD'
    }
  ]
}
