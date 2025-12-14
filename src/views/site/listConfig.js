/**
 * 驻点管理列表配置文件
 */
export default {
  // API 配置
  api: {
    url: '/api/site/list',
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
        label: '新增驻点',
        type: 'primary',
        id: 'siteList:add',
        funcName: 'handleAdd',
        icon: 'Plus'
      },
      {
        label: '导出',
        type: 'success',
        id: 'siteList:export',
        funcName: 'handleExport',
        icon: 'Download'
      },
      {
        label: '批量删除',
        type: 'danger',
        id: 'siteList:batchDel',
        funcName: 'handleBatchDelete',
        icon: 'Delete'
      }
    ]
  },

  // 表格列配置
  columns: [
    {
      prop: 'siteName',
      label: '驻点名称',
      minWidth: 150,
      showOverflowTooltip: true
    },
    {
      prop: 'siteCode',
      label: '驻点编码',
      width: 120
    },
    {
      prop: 'customerName',
      label: '所属客户',
      width: 150,
      showOverflowTooltip: true
    },
    {
      prop: 'address',
      label: '驻点地址',
      minWidth: 200,
      showOverflowTooltip: true
    },
    {
      prop: 'status',
      label: '驻点状态',
      width: 100,
      formatter: (row) => {
        return row.statusName || (row.status === 'normal' ? '正常' : '停用')
      }
    },
    {
      prop: 'guardCount',
      label: '保安人数',
      width: 100,
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
      width: 200,
      buttons: [
        {
          label: '查看',
          type: 'info',
          id: 'siteList:view',
          funcName: 'handleView',
          icon: 'View',
          size: 'small'
        },
        {
          label: '编辑',
          type: 'primary',
          id: 'siteList:edit',
          funcName: 'handleEdit',
          icon: 'Edit',
          size: 'small'
        },
        {
          label: '删除',
          type: 'danger',
          id: 'siteList:del',
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
      prop: 'siteName',
      label: '驻点名称',
      placeholder: '请输入驻点名称',
      type: 'input'
    },
    {
      prop: 'siteCode',
      label: '驻点编码',
      placeholder: '请输入驻点编码',
      type: 'input'
    },
    {
      prop: 'customerId',
      label: '所属客户',
      placeholder: '请选择客户',
      type: 'select',
      // 这里需要动态获取客户列表，可以通过 getOptions 传递
      // 或者这里预留 dict，虽然客户不是字典
      options: [],
      // 实际开发中通常是通过 API 获取，TableComponent 支持 getOptions 函数
      clearable: true
    },
    {
      prop: 'status',
      label: '驻点状态',
      placeholder: '请选择状态',
      type: 'select',
      dict: 'siteStatus',
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
