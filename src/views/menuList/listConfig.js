/**
 * 菜单列表表格配置文件
 */
export default {
  // API 配置（必填）
  // 组件会自动请求数据，无需在父组件中手动加载数据
  // 支持 GET、POST、PUT、DELETE 等方法
  // 响应数据格式支持：
  // 1. { data: [], total: 0 }
  // 2. { list: [], total: 0 }
  // 3. { records: [], total: 0 }
  // 4. 直接是数组 []
  api: {
    url: '/api/menu/list',
    method: 'get' // 'get' | 'post' | 'put' | 'delete'，默认为 'get'
  },
  // 表格配置
  tableConfig: {
    stripe: true,
    border: true,
    height: 'auto',
    maxHeight: 600,
    // 行数据的唯一标识，用于区别行的唯一性（可选，默认为 'id'）
    // 支持字符串（如 'id'）或函数（如 (row) => row.id）
    rowKey: 'id',
    // 是否自适应高度
    // true: 表格高度按内容展开，最高占满剩余空间，内容超出则内容区滚动（默认）
    // false: 占满屏幕高度剩余空间
    autoHeight: true,

    // 是否显示分页器（默认 true）
    showPagination: true,

    // 是否显示序号列（默认 true）
    showIndex: true,

    // 是否显示操作列（默认 true）
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
        label: '新增',
        type: 'primary',
        id: 'menuList:add',
        funcName: 'handleAdd',
        icon: 'Plus'
      },
      {
        label: '导出',
        type: 'success',
        id: 'menuList:export',
        funcName: 'handleExport',
        icon: 'Download'
      },
      {
        label: '批量删除',
        type: 'danger',
        id: 'menuList:batchDel',
        funcName: 'handleBatchDelete',
        icon: 'Delete'
      }
    ]
  },
  // 表格列配置
  columns: [
    {
      prop: 'name',
      label: '菜单名称',
      minWidth: 150,
      showOverflowTooltip: true
    },
    {
      prop: 'path',
      label: '路由路径',
      width: 200,
      showOverflowTooltip: true
    },
    {
      prop: 'icon',
      label: '图标',
      width: 100,
      slot: 'icon'
    },
    {
      label: '状态信息',
      children: [
        {
          prop: 'status',
          label: '状态',
          width: 100,
          formatter: (row) => {
            return row.status === '1' ? '启用' : '禁用'
          }
        },
        {
          prop: 'sort',
          label: '排序',
          width: 100
        }
      ]
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
          label: '编辑',
          type: 'primary',
          id: 'menuList:edit',
          funcName: 'handleEdit',
          icon: 'Edit',
          size: 'small'
        },
        {
          label: '删除',
          type: 'danger',
          id: 'menuList:del',
          funcName: 'handleDelete',
          icon: 'Delete',
          size: 'small'
        },
        {
          label: '查看',
          type: 'info',
          id: 'menuList:view',
          funcName: 'handleView',
          icon: 'View',
          size: 'small'
        },
        {
          label: '复制',
          type: 'warning',
          id: 'menuList:copy',
          funcName: 'handleCopy',
          icon: 'CopyDocument',
          size: 'small'
        }
      ]
    }
  ],
  // 查询条件配置
  queryConditions: [
    {
      prop: 'name1',
      label: '菜单名称',
      placeholder: '请输入菜单名称',
      type: 'input'
    },
    {
      prop: 'name2',
      label: '菜单名称',
      placeholder: '请输入菜单名称',
      type: 'input'
    },
    {
      prop: 'name3',
      label: '菜单名称',
      placeholder: '请输入菜单名称',
      type: 'input'
    },
    {
      prop: 'name4',
      label: '菜单名称',
      placeholder: '请输入菜单名称',
      type: 'input'
    },
    {
      prop: 'name5',
      label: '菜单名称',
      placeholder: '请输入菜单名称',
      type: 'input'
    },
    {
      prop: 'status',
      label: '状态',
      placeholder: '请选择状态',
      type: 'select',
      options: [
        { label: '启用', value: '1' },
        { label: '禁用', value: '0' }
      ],
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
      // 自定义查询字段名（可选，不设置则使用 prop + 'Start' / prop + 'End'）
      // startField: 'createTimeStart', // 默认: 'createTimeStart'
      // endField: 'createTimeEnd' // 默认: 'createTimeEnd'
    },
    {
      prop: 'price',
      label: '价格范围',
      type: 'numberrange',
      span: 6,
      startPlaceholder: '最低价格',
      endPlaceholder: '最高价格',
      min: 0,
      max: 999999
      // 自定义查询字段名（可选，不设置则使用 prop + 'Start' / prop + 'End'）
      // startField: 'minPrice', // 默认: 'priceStart'
      // endField: 'maxPrice' // 默认: 'priceEnd'
    }
  ]
}
